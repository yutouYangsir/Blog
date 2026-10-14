# 03 大模型 API 调用

## 学习目标
1. 理解大模型 API 的基本概念（OpenAI、Anthropic 等）
2. 学会使用 Python 代码调用大模型 API 进行对话
3. 掌握 API 密钥的安全管理和环境变量配置
4. 能够区分 OpenAI 格式与 Anthropic 格式的 API 调用方式

## 1. 大模型 API 概述

大模型（Large Language Model, LLM）通常通过 **HTTP API** 提供服务。你发送一段文本（Prompt），模型返回生成的回复。

### 主流 API 提供商

| 提供商 | 代表模型 | 特点 |
| --- | --- | --- |
| **OpenAI** | GPT-4o、GPT-4o-mini | 生态最成熟，很多第三方平台兼容其格式 |
| **Anthropic** | Claude 3.5 Sonnet、Claude 3 Opus | 长文本处理能力强，安全性设计突出 |
| **国内厂商** | 文心一言、通义千问、智谱 GLM | 中文优化好，无需翻墙 |

> 💡 **注意**：很多国内平台（如硅基流动、智谱 AI、DashScope）提供兼容 OpenAI 格式的 API，可以直接使用 OpenAI SDK 调用。

## 2. API 调用核心概念

调用大模型 API 时，你需要了解以下几个核心要素：

- **Base URL**：API 服务的基础地址，例如 `https://api.openai.com/v1` 或 `https://api.anthropic.com`
- **API Key**：身份验证密钥，类似于密码，**绝对不能泄露**
- **Model**：模型名称，本课程统一使用 `qwen3.6-35b-A3b`
- **Message / Prompt**：发送给模型的输入内容
- **Temperature**：控制输出随机性（0~2，越低越确定，越高越有创意）
- **Max Tokens**：限制模型输出的最大长度

## 3. API 密钥安全管理

**切勿将 API Key 直接写入代码并上传到 GitHub！** 推荐做法是将密钥存放在环境变量中。

### 方法一：使用 .env 文件（推荐）

1. 在项目根目录创建 `.env` 文件（注意文件名以点开头）
2. 添加以下内容（填入老师提供的实际值）：

```env
# 请使用老师提供的 base_url 和 api_key
OPENAI_BASE_URL=https://your-openai-compatible-base-url.com/v1
OPENAI_API_KEY=sk-your-openai-api-key

ANTHROPIC_BASE_URL=https://api.anthropic.com
ANTHROPIC_API_KEY=sk-ant-your-anthropic-api-key
```

> ⚠️ **重要**：`.env` 文件已加入 `.gitignore`，不会上传到 Git，切勿手动删除该忽略配置。

### 方法二：手动设置系统环境变量（Windows）

```powershell
# 当前终端会话有效
$env:OPENAI_API_KEY="sk-your-api-key"
$env:OPENAI_BASE_URL="https://your-base-url.com/v1"
```

```python
# 加载 .env 文件中的环境变量
from dotenv import load_dotenv
import os

load_dotenv()  # 默认加载当前目录下的 .env 文件

# 验证环境变量是否加载成功
openai_base_url = os.getenv("OPENAI_BASE_URL")
openai_api_key = os.getenv("OPENAI_API_KEY")
anthropic_base_url = os.getenv("ANTHROPIC_BASE_URL")
anthropic_api_key = os.getenv("ANTHROPIC_API_KEY")

print("✅ OPENAI_BASE_URL 已设置" if openai_base_url else "❌ OPENAI_BASE_URL 未设置")
print("✅ OPENAI_API_KEY 已设置" if openai_api_key else "❌ OPENAI_API_KEY 未设置")
print("✅ ANTHROPIC_BASE_URL 已设置" if anthropic_base_url else "❌ ANTHROPIC_BASE_URL 未设置")
print("✅ ANTHROPIC_API_KEY 已设置" if anthropic_api_key else "❌ ANTHROPIC_API_KEY 未设置")
```

## 4. 方式一：OpenAI 格式调用（兼容 OpenAI SDK）

OpenAI 格式的 API 是目前最通用的标准。很多国内厂商（如硅基流动、智谱、DeepSeek）也提供兼容此格式的接口。

### 安装依赖

```powershell
pip install openai python-dotenv -i https://pypi.tuna.tsinghua.edu.cn/simple
```

```python
from openai import OpenAI
import os

# 初始化客户端（使用环境变量中的配置）
client = OpenAI(
    base_url=os.getenv("OPENAI_BASE_URL"),
    api_key=os.getenv("OPENAI_API_KEY")
)

# 发送对话请求
response = client.chat.completions.create(
    model="qwen3.6-35b-A3b",  # 请根据老师提供的实际模型名称修改
    messages=[
        {"role": "system", "content": "你是一个 helpful 的 AI 助手。"},
        {"role": "user", "content": "请用一句话解释什么是大语言模型。"}
    ],
    temperature=0.7,
    max_tokens=200
)

# 输出模型回复
print("🤖 AI 回复：")
print(response.choices[0].message.content)
```

### OpenAI 格式调用要点

| 参数 | 说明 |
| --- | --- |
| `model` | 模型名称，本课程默认使用 `qwen3.6-35b-A3b` |
| `messages` | 消息列表，每条消息包含 `role`（system/user/assistant）和 `content` |
| `temperature` | 随机性（0~2），0 最确定，2 最有创意 |
| `max_tokens` | 最大输出 token 数 |
| `response.choices[0].message.content` | 获取模型回复的文本内容 |

## 5. 扩展阅读：Anthropic 格式调用（Claude API）

Anthropic 的 Claude 系列模型使用独立的 API 格式，与 OpenAI 格式不同。需要安装 `anthropic` Python SDK。

> 课程主线统一使用 OpenAI 兼容格式调用 `qwen3.6-35b-A3b`。以下 Anthropic/Claude 内容仅用于了解不同 API 格式，不作为默认运行示例。

### 安装依赖

```powershell
pip install anthropic python-dotenv -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Anthropic/Claude 调用格式示意（扩展阅读）

课程默认不执行 Claude 调用，主线统一使用 OpenAI 兼容格式调用 `qwen3.6-35b-A3b`。如需了解 Anthropic SDK 的写法，可参考下面的非执行示例：

```python
from anthropic import Anthropic
import os

client = Anthropic(
    base_url=os.getenv("ANTHROPIC_BASE_URL"),
    api_key=os.getenv("ANTHROPIC_API_KEY"),
)

response = client.messages.create(
    model="<your-claude-model>",
    max_tokens=200,
    temperature=0.7,
    system="你是一个 helpful 的 AI 助手。",
    messages=[
        {"role": "user", "content": "请用一句话解释什么是大语言模型。"}
    ],
)

print(response.content[0].text)
```

### Anthropic 格式与 OpenAI 格式的区别

| 特性 | OpenAI 格式 | Anthropic 格式 |
| --- | --- | --- |
| 系统提示 | 放入 `messages` 列表，role="system" | 独立的 `system` 参数 |
| 回复获取 | `response.choices[0].message.content` | `response.content[0].text` |
| SDK 包名 | `openai` | `anthropic` |
| 客户端类 | `OpenAI()` | `Anthropic()` |
| 方法名 | `chat.completions.create()` | `messages.create()` |

## 6. 多轮对话示例

多轮对话需要保留历史消息，让模型理解上下文。以下以 OpenAI 格式为例：

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url=os.getenv("OPENAI_BASE_URL"),
    api_key=os.getenv("OPENAI_API_KEY")
)

# 维护对话历史
messages = [
    {"role": "system", "content": "你是一个 helpful 的 AI 助手。"}
]

# 第一轮对话
messages.append({"role": "user", "content": "你好，我叫小明。"})
response = client.chat.completions.create(
    model="qwen3.6-35b-A3b",
    messages=messages,
    temperature=0.7
)
reply = response.choices[0].message.content
print(f"🤖: {reply}")

# 将模型回复加入历史
messages.append({"role": "assistant", "content": reply})

# 第二轮对话（模型应该记得我叫小明）
messages.append({"role": "user", "content": "你还记得我的名字吗？"})
response = client.chat.completions.create(
    model="qwen3.6-35b-A3b",
    messages=messages,
    temperature=0.7
)
reply = response.choices[0].message.content
print(f"🤖: {reply}")
```

## 7. 流式输出（Streaming）

流式输出让模型内容逐字返回，提升用户体验：

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url=os.getenv("OPENAI_BASE_URL"),
    api_key=os.getenv("OPENAI_API_KEY")
)

stream = client.chat.completions.create(
    model="qwen3.6-35b-A3b",
    messages=[{"role": "user", "content": "写一首关于春天的短诗。"}],
    stream=True  # 开启流式输出
)

print("🤖: ", end="")
for chunk in stream:
    # 某些 chunk 的 choices 为空，需要先判断
    if chunk.choices and chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
print()
```

## 8. 本节课练习

1. 根据老师提供的 `base_url` 和 `api_key`，在 `.env` 文件中正确配置 OpenAI 和 Anthropic 两种环境变量
2. 运行 OpenAI 格式的示例代码，成功获取模型回复
3. 阅读 Anthropic 格式的扩展说明，对比两种 API 的差异
4. 尝试修改 `temperature` 和 `max_tokens` 参数，观察输出变化
5. 使用流式输出模式，让模型生成一段关于人工智能的短文
