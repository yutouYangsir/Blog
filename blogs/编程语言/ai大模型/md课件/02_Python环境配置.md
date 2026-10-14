# 02 Python 环境配置

## 学习目标
1. 理解 Python 虚拟环境的作用，掌握 venv 的进阶用法
2. 学会使用 `requirements.txt` 管理项目依赖
3. 掌握 Jupyter Notebook / JupyterLab 在 VS Code 中的配置
4. 学会为 Jupyter 注册虚拟环境内核并排查常见环境问题

## 1. 为什么需要虚拟环境

在 Python 开发中，不同项目可能依赖不同版本的库。如果不加隔离，全局安装的库会相互冲突。

### 虚拟环境的好处
- **依赖隔离**：每个项目有独立的包集合
- **版本可控**：避免全局包版本混乱
- **便于迁移**：通过 `requirements.txt` 快速复现环境
- **与生产一致**：开发、测试、生产环境使用相同依赖

## 2. venv 进阶用法

Python 3.12 内置 `venv` 模块，无需额外安装。除了创建环境，你还可以指定 Python 解释器、选择是否包含系统站点包等。

### 常用命令

```powershell
# 创建虚拟环境（默认当前目录下 .venv 文件夹）
python -m venv .venv

# 指定 Python 版本创建环境（需该版本在 PATH 中）
python3.12 -m venv .venv

# 创建时继承系统已安装的包（谨慎使用）
python -m venv .venv --system-site-packages

# 删除虚拟环境（直接删除文件夹即可）
Remove-Item -Recurse -Force .venv
```

### 虚拟环境目录结构

```text
.venv/
├── Scripts/          # Windows 可执行文件（python.exe、pip.exe、activate）
├── Lib/              # 安装的第三方库
├── include/          # C 扩展头文件
└── pyvenv.cfg        # 环境配置信息
```

```python
# 查看当前解释器所在环境信息
import sys
import os

print(f"当前 Python：{sys.executable}")
print(f"是否处于虚拟环境：{hasattr(sys, 'real_prefix') or sys.base_prefix != sys.prefix}")
print(f"虚拟环境路径：{sys.prefix}")
```

## 3. 使用 requirements.txt 管理依赖

`requirements.txt` 是 Python 项目的依赖清单，便于团队共享和部署复现。

### 导出当前环境依赖

在已激活的虚拟环境中执行：

```powershell
pip freeze > requirements.txt
```

### 从 requirements.txt 安装依赖

```powershell
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 一份适合本课程的 requirements.txt 示例

你可以将以下内容保存为项目根目录下的 `requirements.txt`：

```text
# 核心框架
langchain>=0.3.0
langgraph>=0.2.0
langchain-openai>=0.2.0

# 向量数据库与 Embedding
langchain-chroma>=0.1.0
sentence-transformers>=3.0.0

# Jupyter 与工具
jupyter>=1.0.0
ipykernel>=6.29.0
python-dotenv>=1.0.0

# 可选：搜索/网络请求工具
requests>=2.32.0
```

```python
# 示例：查看当前环境已安装的核心包
import subprocess
result = subprocess.run(['pip', 'list'], capture_output=True, text=True)
print(result.stdout[:2000])  # 只打印前 2000 字符
```

## 4. Jupyter Notebook 配置

Jupyter Notebook 是交互式运行 Python 代码的理想工具，本课程所有课件都以 `.ipynb` 格式提供。

### 安装 Jupyter

在虚拟环境中执行：

```powershell
pip install jupyter ipykernel -i https://pypi.tuna.tsinghua.edu.cn/simple
```

在Docker中安装

```bash
cd /opt
mkdir jupyter
cd jupyter
docker run -p 8888:8888 \
    -v "$PWD":/home/jovyan/work \
    --name my-jupyter \
    jupyter/scipy-notebook:latest
```

在Docker中为jupyter安装汉化包

```bash
docker exec -it my-jupyter pip install jupyterlab-language-pack-zh-CN -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### 为 Jupyter 注册当前虚拟环境内核

这样 VS Code 的 Jupyter 面板就能识别并使用 `.venv` 中的解释器：

```powershell
python -m ipykernel install --user --name=langchain-env --display-name="LangChain课程环境"
```

参数说明：
- `--user`：安装到用户目录，无需管理员权限
- `--name`：内核内部名称
- `--display-name`：在 VS Code 中显示的名称

### 在 VS Code 中切换 Jupyter 内核

1. 打开任意 `.ipynb` 文件
2. 点击右上角内核选择器（默认显示为 Python 版本号）
3. 选择 `LangChain课程环境` 或 `.venv` 对应的解释器
4. 重新运行单元格即可

```python
# 测试 Jupyter 运行是否正常
print("Hello, LangChain + LangGraph!")
```

## 5. pip 常用命令速查

| 命令 | 作用 |
| --- | --- |
| `pip install 包名` | 安装指定包 |
| `pip install 包名==1.0.0` | 安装指定版本 |
| `pip install -U 包名` | 升级指定包 |
| `pip uninstall 包名` | 卸载指定包 |
| `pip list` | 列出已安装包 |
| `pip show 包名` | 查看包详细信息 |
| `pip freeze > requirements.txt` | 导出依赖清单 |
| `pip install -r requirements.txt` | 按清单安装依赖 |

## 6. 常见环境问题排查

### 问题 1：终端显示未激活虚拟环境
- 检查终端是否从 VS Code 正确启动
- 手动执行 `.venv\Scripts\Activate.ps1`

### 问题 2：pip 安装速度慢或超时
- 使用清华镜像源：`-i https://pypi.tuna.tsinghua.edu.cn/simple`
- 升级 pip：`python -m pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple`

### 问题 3：Jupyter 内核无法导入虚拟环境中的包
- 确认内核选择的是 `.venv` 对应的解释器
- 重新注册内核：`python -m ipykernel install --user --name=langchain-env --force`

### 问题 4：安装包时报依赖冲突
- 优先在干净虚拟环境中安装
- 使用 `pip install 包名 --no-deps` 跳过依赖检查（谨慎）
- 使用 `pip install -r requirements.txt` 统一安装

## 7. 本节课练习

1. 在当前项目目录下创建一个名为 `.venv` 的虚拟环境（如果尚未创建）
2. 激活虚拟环境后，使用清华镜像源安装 `jupyter`、`ipykernel`、`langchain`、`langgraph`
3. 注册当前环境为 Jupyter 内核，名称为 `langchain-env`
4. 在 VS Code 中切换到这个内核，并成功运行本 notebook 中的所有代码单元格
5. 使用 `pip freeze > requirements.txt` 导出依赖清单，查看文件内容
