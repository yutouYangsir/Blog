# 05 LLM 链

## 学习目标
1. 理解 LLMChain 的本质：Prompt 模板 + 模型 + 输出解析的组合
2. 掌握使用 LCEL（LangChain Expression Language）管道符构建链
3. 理解数据在链中的流动过程：输入 -> Prompt -> LLM -> 输出
4. 学会使用链进行单条调用、批量调用和流式输出

## 1. 什么是 LLMChain

LLMChain 是 LangChain 中最基础、最常用的链类型。它表示一个简单的处理流程：

```
用户输入 -> Prompt模板 -> 大模型 -> 输出结果
```

在 LangChain 的新版（LCEL）中，我们不再使用专门的 `LLMChain` 类，而是直接用 `|` 管道符将组件串联起来：

```python
chain = prompt | llm
```

这种方式更直观、更灵活，也是本课程推荐的标准写法。

## 2. 构建第一个 LLMChain

我们需要三个基本组件：
1. **Prompt 模板**：定义输入格式和系统提示
2. **LLM 模型**：实际调用的大模型
3. **链**：将两者用 `|` 连接

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()


# 1. 创建模型
llm = ChatOpenAI(
    model='qwen3.6-35b-A3b',
    temperature=0.7
)

# 2. 创建 Prompt 模板
prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个专业的翻译助手，只输出翻译结果，不做解释。'),
    ('user', '请将以下文本翻译成英文：{text}')
])

# 3. 构建链
chain = prompt | llm

# 4. 运行链
result = chain.invoke({'text': '人工智能正在改变世界'})
print(result.content)
```

### 代码解析

| 步骤 | 代码 | 作用 |
| --- | --- | --- |
| 1 | `ChatOpenAI(...)` | 创建模型实例，指定模型名称和温度 |
| 2 | `ChatPromptTemplate.from_messages(...)` | 创建提示模板，包含 system 和 user 消息 |
| 3 | `prompt \| llm` | 用管道符连接，形成处理链 |
| 4 | `chain.invoke({'text': '...'})` | 传入变量，执行链并获取结果 |

`invoke()` 返回的是 `AIMessage` 对象，用 `.content` 获取文本内容。

## 3. 数据流详解

当调用 `chain.invoke({'text': '人工智能正在改变世界'})` 时，数据在链中是这样流动的：

```text
输入: {'text': '人工智能正在改变世界'}
  |
  v
prompt: 将变量填入模板
  system: 你是一个专业的翻译助手，只输出翻译结果，不做解释。
  user: 请将以下文本翻译成英文：人工智能正在改变世界
  |
  v
llm: 调用大模型 API
  |
  v
输出: AIMessage(content='AI is changing the world.')
```

链的每个环节都是 **Runnable**（可运行对象），它们都实现了统一的接口：
- `.invoke(input)` — 单条调用
- `.batch(inputs)` — 批量调用
- `.stream(input)` — 流式输出
- `.ainvoke(input)` — 异步调用

## 4. 多变量输入

Prompt 模板中可以定义多个变量，invoke 时传入字典即可：

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

# 多变量 Prompt 模板
prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一位{style}作家。'),
    ('user', '请用{style}的风格写一段关于{topic}的{format}，约{length}字。')
])

chain = prompt | llm

result = chain.invoke({
    'style': '浪漫主义',
    'topic': '星空',
    'format': '散文',
    'length': '100'
})
print(result.content)
```

## 5. 批量调用（Batch）

当需要处理多条输入时，使用 `.batch()` 可以一次性发送多个请求，效率更高：

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个简洁的助手，只输出结果。'),
    ('user', '将以下中文翻译成英文：{text}')
])

chain = prompt | llm

# 批量输入
inputs = [
    {'text': '你好'},
    {'text': '谢谢'},
    {'text': '再见'},
    {'text': '人工智能'}
]

results = chain.batch(inputs)
for i, result in enumerate(results):
    print(f'{i+1}. {result.content}')
```

## 6. 流式输出（Stream）

链也支持流式输出，模型会逐字返回结果：

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个诗人。'),
    ('user', '写一首关于{topic}的短诗。')
])

chain = prompt | llm

print('生成中：', end='')
for chunk in chain.stream({'topic': '秋天'}):
    print(chunk.content, end='')
print()
```

## 7. 链的重用与组合

定义好的链可以像函数一样多次复用，也可以作为更大链的一部分继续组合。本节演示三个核心概念：

### 核心概念

1. **StrOutputParser()**：输出解析器，自动把模型的 AIMessage 对象转换成纯字符串
2. **链的复用**：同一个 chain 变量可以多次调用 invoke()，传入不同输入
3. **链的组合**：把多个链用 `|` 连接起来，前一个链的输出作为后一个链的输入

### 组合链的数据流

```
输入: {'text': '大语言模型正在改变软件开发的方式'}
  |
  v
translate_chain: 中文 -> 英文
  输出: 'Large language models are changing the way software is developed.'
  |
  v
lambda x: {'text': x}: 把字符串包装成 summarize_chain 需要的字典格式
  输出: {'text': 'Large language models are changing...'}
  |
  v
summarize_chain: 总结成一句话
  输出: '大型语言模型正在改变软件开发的方式。'
```

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 创建共享的 LLM 实例
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

# ========== 1. 定义可复用的翻译链 ==========
# 先创建翻译用的 Prompt 模板
translate_prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个翻译助手，将中文翻译成英文。'),
    ('user', '{text}')  # {text} 是输入变量
])

# 构建翻译链：Prompt -> LLM -> 字符串输出解析器
# StrOutputParser() 的作用：把模型返回的 AIMessage 对象直接转成 str
translate_chain = translate_prompt | llm | StrOutputParser()

# ========== 2. 链的复用 ==========
# 同一个 translate_chain 可以像函数一样多次调用
# 每次 invoke() 传入不同的 {'text': '...'}，得到对应的英文翻译
print(translate_chain.invoke({'text': '苹果'}))
print(translate_chain.invoke({'text': '香蕉'}))
print(translate_chain.invoke({'text': '桃子'}))

# ========== 3. 链的组合 ==========
# 再定义一个总结链，同样接收 {text} 变量
summarize_prompt = ChatPromptTemplate.from_messages([
    ('system', '请用一句话总结以下内容。'),
    ('user', '{text}')
])
summarize_chain = summarize_prompt | llm | StrOutputParser()

# 组合链：翻译后的英文传给总结链
# translate_chain 的输出是字符串，但 summarize_chain 需要字典 {'text': ...}
# 所以中间加一个 lambda 函数做格式转换
full_chain = translate_chain | (lambda x: {'text': x}) | summarize_chain

# 运行组合链：输入中文 -> 翻译成英文 -> 总结成中文
result = full_chain.invoke({'text': '大语言模型写代码的能力越来越强。使用ai开发代码让传统的软件开发方式被改变。'})
print(f'\n翻译+总结：{result}')
```

## 8. 链的调试与查看中间结果

使用 `StrOutputParser()` 可以自动将模型输出转换为字符串，省去手动 `.content` 的步骤。

如果想查看链运行过程中的中间状态（比如格式化后的 Prompt 是什么样的），可以使用回调或调试工具：

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个助手。'),
    ('user', '你好，我叫{name}')
])

# 查看格式化后的 Prompt
formatted = prompt.format_messages(name='小明')
print('格式化后的 Prompt：')
for msg in formatted:
    print(f'  {msg.type}: {msg.content}')

chain = prompt | llm
result = chain.invoke({'name': '小明'})
print(f'\n模型回复：{result.content}')
```

## 9. 本节课练习

1. 创建一个 LLMChain，将用户的输入翻译成法文（修改 system 提示和 user 模板）
2. 使用多变量输入，创建一个可以根据「风格」和「主题」生成不同文章的链
3. 使用 `.batch()` 一次性翻译 5 个不同的中文句子
4. 使用 `.stream()` 让模型逐字生成一段关于「未来科技」的短文
5. 尝试在链末尾加上 `| StrOutputParser()`，观察返回结果类型的变化
