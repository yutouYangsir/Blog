# 13 RAG 构建

## 学习目标
1. 掌握从零构建完整 RAG 应用的整体流程
2. 学会将文档加载、分割、向量化、存储、检索、生成串联成系统
3. 理解 RAG 系统的评估方法和常见优化策略
4. 能够将 RAG 代码模块化封装，便于复用
5. 完成一个可运行的多文档问答系统

## 1. RAG 应用整体架构

一个可落地的 RAG 应用通常包含以下模块：

```
数据准备阶段：
  原始文档 -> 文档加载器 -> 文本分割器 -> 文本块

索引阶段：
  文本块 -> Embedding 模型 -> 向量 -> 向量数据库

查询阶段：
  用户问题 -> Embedding 模型 -> 向量检索 -> 相关文本块
  相关文本块 + 用户问题 -> Prompt -> LLM -> 最终回答
```

本节课将以「公司产品手册问答系统」为例，完整演示上述流程。

## 2. 准备知识库文档

先创建两份示例文档，模拟真实的产品手册。

```python
import os

# 创建产品手册目录
os.makedirs('product_docs', exist_ok=True)

# 文档 1：智能手表使用手册
watch_manual = """
智能手表使用手册

1. 开机与配对
长按右侧电源键 3 秒开机。首次使用需在手机上下载 HealthApp，打开蓝牙后搜索设备并完成配对。

2. 心率监测
手表背面配备 PPG 心率传感器。在表盘界面下滑进入功能菜单，点击「心率」即可开始测量。测量时请保持手腕静止。

3. 睡眠监测
佩戴手表入睡后，系统会自动记录睡眠数据。次日可在 HealthApp 中查看深睡、浅睡和 REM 睡眠时长。

4. 防水说明
本手表支持 5ATM 防水，可佩戴游泳，但不适用于潜水、热水淋浴或桑拿。
"""

# 文档 2：无线耳机使用手册
earphone_manual = """
无线耳机使用手册

1. 开机与配对
打开充电盒，耳机自动开机并进入配对模式。在手机蓝牙设置中选择 SoundPod 即可完成配对。

2. 触控操作
单击左耳或右耳可播放/暂停音乐。双击右耳切换下一首，双击左耳切换上一首。长按 2 秒唤醒语音助手。

3. 充电说明
耳机单次续航 6 小时，充电盒可提供额外 24 小时续航。使用 Type-C 线缆为充电盒充电，约 1.5 小时充满。

4. 降噪功能
耳机支持主动降噪和环境音模式。在连接状态下，长按右耳 3 秒可在两种模式间切换。
"""

with open('product_docs/watch_manual.txt', 'w', encoding='utf-8') as f:
    f.write(watch_manual.strip())

with open('product_docs/earphone_manual.txt', 'w', encoding='utf-8') as f:
    f.write(earphone_manual.strip())

print('产品手册已创建：')
for f in os.listdir('product_docs'):
    print(f' - {f}')
```

## 3. 完整 RAG 构建流程

下面按照「加载 -> 分割 -> 向量化 -> 存储 -> 检索 -> 生成」的顺序，一步步构建系统。

```python
import warnings
from dotenv import load_dotenv

load_dotenv()

warnings.filterwarnings('ignore', category=DeprecationWarning)

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

# 1. 加载目录下所有 txt 文件
loader = DirectoryLoader(
    'product_docs',
    glob='*.txt',
    loader_cls=TextLoader,
    loader_kwargs={'encoding': 'utf-8'}
)
documents = loader.load()
print(f'加载文档数：{len(documents)}')

# 2. 分割文档
splitter = RecursiveCharacterTextSplitter(
    chunk_size=150,
    chunk_overlap=30,
    separators=['\n\n', '\n', '。', ' ']
)
chunks = splitter.split_documents(documents)
print(f'分割后文本块数：{len(chunks)}')

# 3. 创建 embedding 模型
embeddings = OpenAIEmbeddings(
    model='qwen3-embedding',
    openai_api_base=os.environ.get('OPENAI_BASE_URL'),
    openai_api_key=os.environ.get('OPENAI_API_KEY')
)

# 4. 存入 ChromaDB
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory='./product_knowledge_db'
)

print('向量数据库创建成功！')
```

### 代码解释

- `DirectoryLoader`：批量加载目录下所有匹配文件
- `glob='*.txt'`：只加载 txt 文件
- `loader_cls=TextLoader`：指定使用 TextLoader 加载每个文件
- `RecursiveCharacterTextSplitter`：按语义边界切分文档
- `Chroma.from_documents`：一次性完成向量化和存储

## 4. 构建问答链

使用 LCEL 把检索器和 LLM 组合起来。

```python
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.1)

prompt = ChatPromptTemplate.from_messages([
    ('system', '''你是公司产品客服助手。请严格根据提供的产品手册内容回答用户问题。
如果手册中没有相关信息，请明确告知「根据现有手册，我无法回答这个问题」，不要编造。'''),
    ('user', '''相关手册内容：\n{context}\n\n用户问题：{question}''')
])

def format_docs(docs):
    return '\n\n'.join([f'[来自 {doc.metadata["source"]}] {doc.page_content}' for doc in docs])

retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

qa_chain = (
    {'context': retriever | format_docs, 'question': RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

# 测试
questions = [
    '智能手表怎么测心率？',
    '耳机的降噪功能怎么用？',
    '这款手表支持潜水吗？',
    '手机怎么连接打印机？'  # 不在手册中
]

for q in questions:
    print(f'Q: {q}')
    print(f'A: {qa_chain.invoke(q)}\n')
```

## 5. 模块化封装

把 RAG 系统封装成一个类，便于在项目中复用。

```python
class ProductQASystem:
    """基于 ChromaDB 的产品手册问答系统。"""

    def __init__(self, persist_dir, llm_model='qwen3.6-35b-A3b', embedding_model='qwen3-embedding'):
        self.embeddings = OpenAIEmbeddings(
            model=embedding_model,
            openai_api_base=os.environ.get('OPENAI_BASE_URL'),
            openai_api_key=os.environ.get('OPENAI_API_KEY')
        )
        self.vectorstore = Chroma(
            persist_directory=persist_dir,
            embedding_function=self.embeddings
        )
        self.llm = ChatOpenAI(model=llm_model, temperature=0.1)
        self.chain = self._build_chain()

    def _format_docs(self, docs):
        return '\n\n'.join([doc.page_content for doc in docs])

    def _build_chain(self):
        prompt = ChatPromptTemplate.from_messages([
            ('system', '你是产品客服助手，请根据手册内容回答问题。'),
            ('user', '''手册内容：\n{context}\n\n问题：{question}''')
        ])
        retriever = self.vectorstore.as_retriever(search_kwargs={'k': 3})
        return (
            {'context': retriever | self._format_docs, 'question': RunnablePassthrough()}
            | prompt
            | self.llm
            | StrOutputParser()
        )

    def ask(self, question):
        """回答用户问题。"""
        return self.chain.invoke(question)

    def add_documents(self, file_paths):
        """增量添加新文档。"""
        loaders = [TextLoader(path, encoding='utf-8') for path in file_paths]
        docs = []
        for loader in loaders:
            docs.extend(loader.load())
        splitter = RecursiveCharacterTextSplitter(chunk_size=150, chunk_overlap=30)
        chunks = splitter.split_documents(docs)
        self.vectorstore.add_documents(chunks)
        return f'已添加 {len(chunks)} 个文本块'

# 使用封装类
qa_system = ProductQASystem('./product_knowledge_db')
print(qa_system.ask('耳机续航多久？'))
```

## 6. 评估检索效果

RAG 系统的效果取决于两个环节：检索是否找到相关文档、生成是否基于文档准确回答。下面通过打印检索结果来评估检索环节。

```python
# 评估检索效果
test_queries = [
    '智能手表怎么测心率？',
    '耳机怎么切换下一首歌？',
    '手表防水吗？',
    '耳机充电要多久？'
]

for q in test_queries:
    print(f'\n问题：{q}')
    docs = vectorstore.as_retriever(search_kwargs={'k': 2}).invoke(q)
    for i, doc in enumerate(docs):
        print(f'  {i+1}. [{doc.metadata["source"]}] {doc.page_content[:60]}...')
```

## 7. 常见问题与优化策略

### 7.1 检索不到相关内容
- 检查 embedding 模型是否正常工作
- 调整 `chunk_size` 和 `chunk_overlap`
- 尝试增加 `k` 值，返回更多候选

### 7.2 回答包含错误信息
- 加强 Prompt 中的约束，如「不知道就说不知道」
- 检查检索片段是否包含答案
- 使用更大的语言模型

### 7.3 回答过长或偏离问题
- 在 Prompt 中明确要求简洁回答
- 限制 `max_tokens`

### 7.4 多文档冲突
- 在 `format_docs` 中标注每个片段的来源
- 使用元数据过滤区分不同产品或版本

## 8. 完整项目：多文档知识库问答系统

下面把前面的代码整合成一个可复用的完整项目结构。

```python
# 完整流程整合
import warnings
warnings.filterwarnings('ignore', category=DeprecationWarning)

from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

def build_knowledge_base(docs_dir, db_dir):
    """构建知识库：加载、分割、向量化、持久化。"""
    loader = DirectoryLoader(docs_dir, glob='*.txt', loader_cls=TextLoader, loader_kwargs={'encoding': 'utf-8'})
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=150, chunk_overlap=30)
    chunks = splitter.split_documents(documents)
    embeddings = OpenAIEmbeddings(
        model='qwen3-embedding',
        openai_api_base=os.environ.get('OPENAI_BASE_URL'),
        openai_api_key=os.environ.get('OPENAI_API_KEY')
    )
    vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory=db_dir)
    return vectorstore

def build_qa_chain(vectorstore, k=3):
    """构建 RAG 问答链。"""
    llm = ChatOpenAI(model='qwen3.6-35b-A3b', temperature=0.1)
    prompt = ChatPromptTemplate.from_messages([
        ('system', '你是产品客服助手，请根据手册内容准确回答，不知道就说不知道。'),
        ('user', '''参考内容：\n{context}\n\n问题：{question}''')
    ])
    retriever = vectorstore.as_retriever(search_kwargs={'k': k})
    def format_docs(docs):
        return '\n\n'.join([doc.page_content for doc in docs])
    return (
        {'context': retriever | format_docs, 'question': RunnablePassthrough()}
        | prompt
        | llm
        | StrOutputParser()
    )

# 构建或加载知识库
if not os.path.exists('product_knowledge_db'):
    vectorstore = build_knowledge_base('product_docs', 'product_knowledge_db')
else:
    embeddings = OpenAIEmbeddings(
        model='qwen3-embedding',
        openai_api_base=os.environ.get('OPENAI_BASE_URL'),
        openai_api_key=os.environ.get('OPENAI_API_KEY')
    )
    vectorstore = Chroma(persist_directory='product_knowledge_db', embedding_function=embeddings)

# 构建问答链并提问
chain = build_qa_chain(vectorstore)
print(chain.invoke('无线耳机怎么配对？'))
```

## 9. 本节课练习

1. 在 `product_docs` 目录下添加第三份产品手册（如「智能音箱使用手册」），重新构建知识库
2. 修改 `format_docs` 函数，在 Prompt 中显示每个片段来自哪个文件
3. 分别测试 `k=1`、`k=3`、`k=5` 时的回答质量差异
4. 设计 5 个产品手册中的问题和 2 个手册外的问题，评估系统表现
5. 把 `ProductQASystem` 类封装保存到单独的 `qa_system.py` 文件中，实现命令行问答
