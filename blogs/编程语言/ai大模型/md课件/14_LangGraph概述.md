# 14 LangGraph 概述

## 学习目标
1. 理解为什么需要 LangGraph：复杂智能体流程的控制需求
2. 掌握 LangGraph 的核心概念：StateGraph、State、Node、Edge
3. 理解 LangGraph 与 LangChain 的关系和分工
4. 能够编写一个最简单的 LangGraph 状态图
5. 了解 LangGraph 的典型应用场景

## 1. 为什么需要 LangGraph

前面我们用 LangChain 构建了链式应用和简单的工具调用智能体。但当智能体流程变得复杂时，会遇到一些问题：

- **流程不可控**：标准 Agent 的黑盒决策难以调试和约束
- **循环和分支困难**：难以实现多轮循环、条件分支、人机协作
- **状态管理复杂**：多步骤之间的状态传递不清晰
- **缺乏持久化**：无法暂停、恢复或检查执行历史

**LangGraph** 就是为了解决这些问题而设计的。它把智能体流程建模为一个**状态图（StateGraph）**，让开发者精确控制每个步骤。

## 2. LangGraph 是什么

LangGraph 是 LangChain 生态中的一个库，用于构建基于**状态图**的智能体应用。它的核心思想是：

- 把应用看作一个图（Graph）
- 图中的每个节点（Node）是一个函数或操作
- 边（Edge）控制流程走向
- 状态（State）在节点之间传递

LangGraph 基于 LangChain 的 Runnable 接口构建，因此可以无缝使用 LangChain 的模型、工具、Prompt 等组件。

## 3. LangGraph 与 LangChain 的关系

| 对比项 | LangChain | LangGraph |
| --- | --- | --- |
| 核心抽象 | Chain / Agent | StateGraph |
| 流程控制 | 线性或简单循环 | 任意图结构、条件分支、循环 |
| 状态管理 | 隐式传递 | 显式 State 对象 |
| 适用场景 | 简单流水线、单次调用 | 复杂多智能体、多轮交互 |
| 关系 | 基础组件库 | 基于 LangChain 构建的流程编排层 |

可以把 LangChain 理解为「零件库」，LangGraph 理解为「装配线控制系统」。

## 4. 核心概念

### 4.1 State（状态）
状态是整个图共享的数据结构。每个节点读取状态、修改状态，然后把状态传递给下一个节点。

### 4.2 StateGraph（状态图）
状态图是 LangGraph 最核心的类。它负责定义节点、边和状态类型。

### 4.3 Node（节点）
节点是图中的执行单元，通常是一个 Python 函数。节点接收当前状态，返回对状态的更新。

### 4.4 Edge（边）
边定义节点之间的连接关系。LangGraph 支持：
- 普通边：固定从一个节点到另一个节点
- 条件边：根据状态决定下一个节点
- START / END：图的起点和终点

## 5. 第一个 LangGraph 程序

下面构建一个最简单的图：两个节点 `node_a` 和 `node_b`，`node_a` 给状态加 1，`node_b` 再给状态乘 2。

```python
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

# 1. 定义状态类型
class MyState(TypedDict):
    """图中的共享状态。"""
    value: int

# 2. 定义节点函数
def node_a(state: MyState):
    """把 value 加 1。"""
    print(f'Node A 接收：{state["value"]}')
    return {'value': state['value'] + 1}

def node_b(state: MyState):
    """把 value 乘 2。"""
    print(f'Node B 接收：{state["value"]}')
    return {'value': state['value'] * 2}

# 3. 构建状态图
builder = StateGraph(MyState)
builder.add_node('node_a', node_a)
builder.add_node('node_b', node_b)

# 4. 添加边
builder.add_edge(START, 'node_a')
builder.add_edge('node_a', 'node_b')
builder.add_edge('node_b', END)

# 5. 编译图
graph = builder.compile()

# 6. 运行图
result = graph.invoke({'value': 3})
print(f'\n最终结果：{result}')
```

### 代码解释

- `TypedDict` 定义状态结构，告诉 LangGraph 图中有哪些字段
- `StateGraph(MyState)` 创建状态图实例
- `add_node(name, func)` 添加节点
- `add_edge(START, 'node_a')` 设置从图起点到 node_a 的边
- `compile()` 编译图，生成可执行的 Runnable
- `invoke({'value': 3})` 运行图，传入初始状态

这个例子的执行流程是：`START -> node_a(value=3 -> 4) -> node_b(value=4 -> 8) -> END`，最终结果是 8。

## 6. LangGraph 执行流程可视化

LangGraph 提供了 `get_graph()` 方法，可以查看图的结构。

在线查看Mermaid 图：https://mermaid.live/edit

```python
# 打印图的节点和边
print(graph.get_graph().nodes)
print(graph.get_graph().edges)

# 使用 mermaid 格式可视化（在支持 mermaid 的 Markdown 查看器中可显示）
print('\nMermaid 图：')
print(graph.get_graph().draw_mermaid())
```

## 7. 在 LangGraph 中使用 LangChain 组件

LangGraph 的节点可以使用任何 LangChain 组件。下面是一个使用 LLM 和 Prompt 的节点示例。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langgraph.graph.message import add_messages
from dotenv import load_dotenv

load_dotenv()


# 定义带消息历史的状态
class ChatState(TypedDict):
    messages: list  # 对话历史

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

def chat_node(state: ChatState):
    """调用 LLM 回复用户。"""
    prompt = ChatPromptTemplate.from_messages([
        ('system', '你是友好的 AI 助手。'),
        *state['messages']
    ])
    response = (prompt | llm).invoke({})
    return {'messages': [response]}

builder = StateGraph(ChatState)
builder.add_node('chat', chat_node)
builder.add_edge(START, 'chat')
builder.add_edge('chat', END)

chat_graph = builder.compile()

result = chat_graph.invoke({
    'messages': [('user', '请用一句话介绍 LangGraph')]
})
print(result['messages'][-1].content)
```

### 代码解释

- `messages` 是列表类型，每个元素是 `(role, content)` 元组
- `ChatPromptTemplate.from_messages([...])` 中的 `*state['messages']` 把历史消息展开
- 节点返回 `{'messages': [response]}`，LangGraph 会自动合并到状态中
- 这里只是一个单节点图，后续课程会扩展到多轮对话和循环

## 8. LangGraph 的典型应用场景

LangGraph 特别适合以下场景：

| 场景 | 说明 |
| --- | --- |
| **多轮工具调用** | 在循环中反复调用工具，直到获得足够信息 |
| **人机协作（Human-in-the-loop）** | 在关键节点暂停，等待人类确认 |
| **多智能体系统** | 多个 Agent 通过图结构协作完成任务 |
| **复杂审批流程** | 根据条件分支决定流程走向 |
| **长期记忆** | 通过持久化状态实现跨会话记忆 |

这些场景在后面几节课会逐一展开。

## 9. 本节课练习

1. 修改第一个 LangGraph 示例，增加第三个节点 `node_c`，实现 value = value - 2
2. 改变三个节点的连接顺序，观察最终结果如何变化
3. 在 ChatState 中增加一个 `topic` 字段，让 system prompt 根据 topic 动态变化
4. 尝试画出本节课第一个示例的状态图（START -> node_a -> node_b -> END）
5. 思考：LangGraph 与你之前学过的 LangChain Chain 相比，最大的优势是什么？
