# 06 Prompt 模板

## 学习目标
1. 理解 Prompt 模板的作用：将 Prompt 从硬编码变为可复用、可配置的组件
2. 掌握两种最常用的模板类型：PromptTemplate 和 ChatPromptTemplate
3. 学会使用变量占位符 {name} 动态填充内容
4. 理解 Few-Shot Prompt 少样本提示的构建方法
5. 了解常见的 Prompt Engineering 技巧及其对模型输出的影响

## 1. 为什么需要 Prompt 模板

直接拼接字符串来构造 Prompt 会带来几个问题：

- **可读性差**：Python 字符串拼接难以看清最终给模型的提示长什么样
- **容易出错**：变量多的时候容易遗漏、顺序错乱
- **难以复用**：同样的提示结构无法直接复用到不同输入
- **难以管理**：无法集中管理和版本化 Prompt

**Prompt 模板** 就是解决这些问题的方案。它允许你：

- 把 Prompt 写成一个带占位符的模板
- 运行时传入变量自动填充
- 复用同一个结构处理不同输入
- 把提示逻辑与业务逻辑分离

## 2. PromptTemplate：基础字符串模板

`PromptTemplate` 是最基础的模板类，适用于构造单条文本提示。它只有一个 `template` 字符串和若干 {变量}。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()


# 创建模型
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

# 使用元组列表定义消息模板
prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一位{role}，擅长用{style}风格回答问题。'),
    ('user', '{question}')
])

# 查看组装后的 Prompt
input_vars = {
    'role': '计算机科学家',
    'style': '通俗易懂',
    'question': '什么是递归？'
}
print('===== 组装后的 Prompt =====')
for msg in prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

# 构建链并调用
chain = prompt | llm
print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result.content)
```

### 2.1 使用 from_template 快速创建

如果你习惯简单写法，可以使用 `from_template` 类方法，自动识别模板中的变量。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.prompts import SystemMessagePromptTemplate, HumanMessagePromptTemplate

# 创建模型
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    SystemMessagePromptTemplate.from_template('你是一位耐心的老师。'),
    HumanMessagePromptTemplate.from_template('请解释{concept}，要求{requirement}。')
])

# 查看组装后的 Prompt
input_vars = {
    'concept': '神经网络',
    'requirement': '用小学生能听懂的语言'
}
print('===== 组装后的 Prompt =====')
for msg in prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

# 构建链并调用
chain = prompt | llm
print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result.content)
```

## 3. ChatPromptTemplate：聊天消息模板

现代大模型通常采用对话格式，每条消息都有角色（role）。`ChatPromptTemplate` 就是为这种场景设计的。

常见的消息类型：

| 消息类型 | 作用 |
| --- | --- |
| system | 设定模型的身份、能力和行为规则 |
| user / human | 用户的输入问题 |
| assistant / ai | 模型的回复，可用于 Few-Shot 示例 |

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 创建模型
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一位{role}。'),
    ('user', '请{action}：{content}')
])

# 先固定 role 变量，得到一个新的模板
translator_prompt = prompt.partial(role='专业翻译')

# 查看组装后的 Prompt
input_vars = {
    'action': '把以下中文翻译成英文',
    'content': '今天天气很好'
}
print('===== 组装后的 Prompt =====')
for msg in translator_prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

# 构建链并调用
chain = translator_prompt | llm
print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result.content)
```

### 3.1 使用消息模板对象构建模板

除了元组，也可以使用 LangChain 提供的**消息模板类**来构建模板。这种方式语义更清晰，而且同样支持变量替换。

**注意区分两类对象**：
- `SystemMessage` / `HumanMessage`：普通消息对象，内容固定，不会解析 `{变量}`
- `SystemMessagePromptTemplate` / `HumanMessagePromptTemplate`：消息模板对象，内容中的 `{变量}` 会被替换

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

# 创建模型
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个情绪分析助手，只输出正面或负面。'),
    ('human', '这个产品太差了'),
    ('ai', '负面'),
    ('human', '这次的体验非常愉快'),
    ('ai', '正面'),
    ('human', '{text}')
])

# 查看组装后的 Prompt
input_vars = {'text': '物流速度还可以，但包装破损了'}
print('===== 组装后的 Prompt =====')
for msg in prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

# 构建链并调用
chain = prompt | llm
print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result.content)
```

## 4. 模板变量的高级用法

### 4.1 默认值与 partial

你可以先填充部分变量，得到一个新的模板，后续再填充剩余变量。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate

# 创建模型
llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.1)

# 准备示例数据
examples = [
    {'input': '苹果', 'output': 'apple'},
    {'input': '香蕉', 'output': 'banana'},
    {'input': '人工智能', 'output': 'artificial intelligence'},
]

# 定义每个示例的格式
example_prompt = ChatPromptTemplate.from_messages([
    ('human', '{input}'),
    ('ai', '{output}')
])

# 构建 Few-Shot 提示模板
few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples
)

# 组合成完整提示
final_prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个中英文翻译助手，请参考示例回答问题。'),
    few_shot_prompt,
    ('human', '{input}')
])

# 查看组装后的 Prompt
input_vars = {'input': '机器学习'}
print('===== 组装后的 Prompt =====')
for msg in final_prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

# 构建链并调用
chain = final_prompt | llm
print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result.content)
```

### 4.2 多轮对话模板

模板中可以预设多轮对话历史，常用于构建 Few-Shot 示例或保持上下文：

```python
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个情绪分析助手，只输出正面或负面。'),
    ('human', '这个产品太差了'),
    ('ai', '负面'),
    ('human', '这次的体验非常愉快'),
    ('ai', '正面'),
    ('human', '{text}')
])

messages = prompt.format_messages(text='物流速度还可以，但包装破损了')
for msg in messages:
    print(f'{msg.type}: {msg.content}')
```

## 5. Few-Shot Prompt：少样本提示

Few-Shot Prompt 是 Prompt Engineering 中最有效的技巧之一。它通过在输入前给出若干「示例-答案」对，让模型学习期望的输出格式和风格。

LangChain 提供了 `FewShotPromptTemplate` 和 `FewShotChatMessagePromptTemplate` 两种主要方式。

```python
from langchain_core.prompts import ChatPromptTemplate, FewShotChatMessagePromptTemplate

# 准备示例数据
examples = [
    {'input': '苹果', 'output': 'apple'},
    {'input': '香蕉', 'output': 'banana'},
    {'input': '人工智能', 'output': 'artificial intelligence'},
]

# 定义每个示例的格式
example_prompt = ChatPromptTemplate.from_messages([
    ('human', '{input}'),
    ('ai', '{output}')
])

# 构建 Few-Shot 提示模板
few_shot_prompt = FewShotChatMessagePromptTemplate(
    example_prompt=example_prompt,
    examples=examples
)

# 组合成完整提示
final_prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一个中英文翻译助手，请参考示例回答问题。'),
    few_shot_prompt,
    ('human', '{input}')
])

messages = final_prompt.format_messages(input='机器学习')
for msg in messages:
    print(f'{msg.type}: {msg.content}')
```

## 6. Prompt Engineering 技巧

Prompt Engineering 是指通过设计和优化提示词，让模型输出更准确、更符合预期。下面介绍几个最常用、最有效的技巧。

### 6.1 角色扮演（Role Prompting）

给模型设定一个清晰的角色，可以显著提升回答质量。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

# 无角色设定
prompt1 = ChatPromptTemplate.from_messages([
    ('user', '解释什么是区块链')
])

# 有角色设定
prompt2 = ChatPromptTemplate.from_messages([
    ('system', '你是一位资深技术讲师，擅长用比喻和例子解释复杂概念。'),
    ('user', '解释什么是区块链')
])

chain1 = prompt1 | llm
chain2 = prompt2 | llm

print('=== 无角色 ===')
print(chain1.invoke({}).content[:250])
print('\n=== 有角色 ===')
print(chain2.invoke({}).content[:250])
```

### 6.2 明确输出格式（Output Formatting）

如果你希望模型按特定格式输出，要在 Prompt 中明确说明。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

# 把 JSON 格式示例放在 system 消息中
# 注意：{ 和 } 是 LangChain 的变量占位符，如果要显示字面量大括号，必须写成 {{ 和 }}
system_template = '''你是一个信息提取助手。请只输出 JSON 格式，不要包含任何解释。

输出格式如下：
{{
  "names": [...],
  "locations": [...],
  "time": ""
}}'''

prompt = ChatPromptTemplate.from_messages([
    ('system', system_template),
    ('user', '文本：{text}')
])

chain = prompt | llm | JsonOutputParser()

input_vars = {
    'text': '2024年5月1日，李明和王芳一起去了北京故宫参观。'
}

print('===== 组装后的 Prompt =====')
for msg in prompt.format_messages(**input_vars):
    print(f'{msg.type}: {msg.content}')

print('\n===== 大模型输出 =====')
result = chain.invoke(input_vars)
print(result)
```

### 6.3 分步骤思考（Chain-of-Thought）

对于推理类问题，让模型「一步步思考」往往能显著提升准确率。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.1)

# 直接提问
prompt1 = ChatPromptTemplate.from_messages([
    ('user', '问题：一个农场有鸡和兔共35只，脚共94只。鸡和兔各几只？请直接给出答案。')
])

# 分步思考
prompt2 = ChatPromptTemplate.from_messages([
    ('user', '问题：一个农场有鸡和兔共35只，脚共94只。鸡和兔各几只？请一步步思考并给出答案。')
])

print('=== 直接提问 ===')
print((prompt1 | llm).invoke({}).content)
print('\n=== 分步思考 ===')
print((prompt2 | llm).invoke({}).content)
```

## 7. 完整示例：Prompt 模板与链结合

下面是一个综合示例：使用模板构建一个「学习助手」，根据学生年级和知识点生成适合难度的解释。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.7)

prompt = ChatPromptTemplate.from_messages([
    ('system', '你是一位{grade}水平的优秀教师。'),
    ('user', '请用适合{grade}学生理解的方式解释 {topic}，并举一个生活中的例子。')
])

chain = prompt | llm | StrOutputParser()

result = chain.invoke({
    'grade': '小学三年级',
    'topic': '浮力'
})
print(result)
```

## 8. 本节课练习

1. 使用 `PromptTemplate` 创建一个邮件生成模板，变量包含收件人姓名、主题、正文要点，调用 `format` 输出完整邮件
2. 使用 `ChatPromptTemplate` 创建一个「代码审查助手」模板，system 设定角色，user 传入代码片段
3. 使用 `.partial()` 固定 system 角色为「技术文档写手」，只传入 user 变量运行
4. 使用 `FewShotChatMessagePromptTemplate` 创建一个三示例的情绪分类器，然后输入新句子测试
5. 对比实验：分别用「直接提问」和「分步骤思考」两种方式向模型提问同一道数学题，观察输出差异
