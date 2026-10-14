# 04 LangChain 概述

## 学习目标
1. 理解 LangChain 产生的背景和解决的问题
2. 掌握 LangChain 的核心架构与组件组成
3. 能够运行第一个 LangChain 程序，体验链式调用的便利性
4. 了解 LangChain 生态中的相关工具（LangServe、LangSmith 等）

## 1. 为什么需要 LangChain

前两节课中，我们直接通过 openai 或 anthropic SDK 调用大模型 API。这种方式简单直接，但当应用变得复杂时，会遇到以下问题：

- **Prompt 管理混乱**：硬编码在代码中，难以维护和复用
- **代码重复**：每次调用都要写重复的 API 初始化、参数配置
- **模型切换困难**：换一个模型提供商需要重写大量代码
- **缺乏标准流程**：没有统一的输入处理、输出解析规范

**LangChain** 就是为了解决这些问题而生的框架。它将大模型应用的开发流程抽象为标准化组件，让开发者可以像搭积木一样构建复杂的 AI 应用。

## 2. LangChain 是什么

LangChain 是一个用于构建基于大语言模型（LLM）应用的 Python/JS 框架，由 Harrison Chase 于 2022 年创建。

### 核心设计思想

- **组件化**：将大模型应用拆解为可复用的标准组件
- **链式组合**：通过管道（|）将多个组件串联成处理流程
- **模型无关**：同一套代码可以切换不同厂商的模型
- **生态丰富**：提供大量预集成工具（向量库、搜索引擎、数据库等）

## 3. LangChain 核心架构

LangChain 将大模型应用抽象为四大核心模块：

### 四大核心模块

| 模块 | 作用 | 本课程对应章节 |
| --- | --- | --- |
| **Model I/O** | 模型输入输出管理（Prompt、Model、Output Parser） | 05-07 节 |
| **Retrieval** | 检索增强生成（RAG）：文档加载、向量化、检索 | 11-13 节 |
| **Chains** | 链式组合，将多个组件串联成工作流 | 05、08 节 |
| **Agents** | 智能体：让模型自主决策、调用工具完成任务 | 09-10 节 |

### 组件关系图

用户输入 -> Prompt模板 -> LLM模型 -> 输出解析 -> 最终结果

例如：

chain = prompt | llm | parser
result = chain.invoke({'input': '用户问题'})

## 4. 第一个 LangChain 程序

我们先看一个对比示例：直接调用 API vs 使用 LangChain。

### 方式一：直接调用 API（传统方式）

```python
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()


client = OpenAI(
    base_url=os.getenv('OPENAI_BASE_URL'),
    api_key=os.getenv('OPENAI_API_KEY')
)

response = client.chat.completions.create(
    model='qwen3.6-35b-A3b',
    messages=[
        {'role': 'system', 'content': '你是一个翻译助手，将中文翻译成英文。'},
        {'role': 'user', 'content': '你好，世界'}
    ]
)
print(response.choices[0].message.content)
```

### 方式二：使用 LangChain（推荐方式）

LangChain 将 Prompt、模型调用、输出解析封装成标准组件，代码更简洁、更易维护。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

_=load_dotenv()

# 1. 创建模型（自动读取环境变量 OPENAI_BASE_URL 和 OPENAI_API_KEY）
llm = ChatOpenAI(
    model='qwen3.6-35b-A3b',
    temperature=0.7
)

# 2. 创建 Prompt 模板
prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个翻译助手，将中文翻译成英文。'),
    ('user', '{input}')
])

# 3. 构建链：Prompt -> LLM
chain = prompt | llm

# 4. 运行链
result = chain.invoke({'input': '你好，世界'})
print(result.content)
```

### 对比总结

| 特性 | 直接 API | LangChain |
| --- | --- | --- |
| Prompt 管理 | 硬编码在 messages 中 | 模板化，支持变量复用 |
| 代码可读性 | 每次都要写完整 API 调用 | 语义清晰：prompt \| llm |
| 模型切换 | 重写 SDK 初始化代码 | 换一行 model= 即可 |
| 输出处理 | 手动解析 choices[0] | 自动解析，支持结构化输出 |
| 扩展性 | 难以添加后续处理步骤 | 可继续追加 \| parser 等组件 |

## 5. LangChain 核心组件速览

本课程后续章节会逐一深入讲解，这里先建立整体印象。

### 5.1 Model（模型）

LangChain 封装了各大厂商的模型，统一接口：

```python
from langchain_openai import ChatOpenAI      # OpenAI 兼容格式
from langchain_anthropic import ChatAnthropic # Anthropic Claude
from langchain_community.llms import Tongyi    # 阿里通义千问

llm = ChatOpenAI(model='qwen3.6-35b-A3b')
```

所有模型都支持 .invoke()、.stream()、.batch() 等统一方法。

### 5.2 Prompt（提示模板）

将 Prompt 模板化，支持变量插入和复用：

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个{role}。'),
    ('user', '请{task}：{content}')
])

prompt.format(role='翻译助手', task='翻译', content='Hello')
```

### 5.3 Output Parser（输出解析器）

将模型输出的文本解析为结构化数据（JSON、列表、Pydantic 对象等）：

```python
from langchain_core.output_parsers import JsonOutputParser

parser = JsonOutputParser()
chain = prompt | llm | parser  # 模型输出自动解析为 JSON
```

### 5.4 Chain（链）

链是 LangChain 的核心概念，表示数据的处理流程。使用 | 运算符组合：

```python
chain = prompt | llm | parser
result = chain.invoke({'input': '用户输入'})
```

数据流：用户输入 -> Prompt模板 -> LLM -> 输出解析 -> 最终结果

## 6. LangChain 生态工具

| 工具 | 作用 |
| --- | --- |
| **LangGraph** | 构建复杂状态图和多智能体工作流（本课程核心内容） |
| **LangServe** | 将 LangChain 链部署为 REST API 服务 |
| **LangSmith** | 调试、监控和评估 LangChain 应用的可观测性平台 |
| **LangChain Hub** | 社区共享的 Prompt 模板市场 |

本课程重点讲解 LangChain 核心组件 + LangGraph 智能体，LangSmith 会在最后的部署评估环节介绍。

## 7. 本节课练习

1. 对比直接调用 API 和 LangChain 的代码，体会 LangChain 的便利性
2. 修改上面的 LangChain 示例，将 system 提示改为「你是一个诗人」，将输入改为「写一句关于月亮的诗」
3. 尝试在 ChatOpenAI 中切换 temperature（0.0、1.0、2.0），观察输出变化
4. 尝试将 prompt | llm 链保存为一个变量，多次调用 invoke() 传入不同输入
