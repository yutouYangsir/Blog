## vibecoding（氛围编程）

### 概念解释

一种利用人工智能工具生成代码的编程方式。该概念由[OpenAI](https://baike.baidu.com/item/OpenAI/19758408?fromModule=lemma_inlink)创始工程师[安德烈·卡帕西](https://baike.baidu.com/item/%E5%AE%89%E5%BE%B7%E7%83%88%C2%B7%E5%8D%A1%E5%B8%95%E8%A5%BF/64971300?fromModule=lemma_inlink)于2025年2月首次提出。

通过AI模型理解开发者意图并生成代码，主要应用于快速原型开发、个人项目等场景。这种方式降低了编程门槛，

但也引发了关于代码质量、安全及对开源生态影响的讨论。

目前业内公认的使用方式是，可以利用vibecoding的方式生成自己的个人项目，如毕业项目，但是在企业级项目当中只能生成片段性的代码，不能完全依赖他。

### 常见的vibecoding工具

claude code、codex、Cursor、Trae等，在我们的课程当中，我们会使用目前最好用的claudecode。

## 环境搭建

### notepad--

**软件介绍：**

notepad--是高级记事本，Windows也有自带的记事本，但是自带的记事本没有行号，也没有关键词的高亮显示，阅读代码比较难受，所以更换高级记事本。

notepad--脱胎于notepad++，但是notepad++有政治原则性问题，所以我们是坚决抵制的，而notepad--是一款纯国产软件，用起来非常爽。

**下载地址：**

[https://gitee.com/cxasm/notepad--/releases/tag/v3.7.2](https://gitee.com/cxasm/notepad--/releases/tag/v3.7.2)

在今天的资料文件夹中也有提供，直接使用即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDFmYmQ2ODc4YTE2NzM1NDE1ZmQ5MzA4MDQyMDRlYWNfdVVUa0hZb2Jra0NLTVlqODN6ZE5iaGVwTE5UTmlYRW9fVG9rZW46UHdqTGJaclRob280NnF4UUN1dWNGU2ptbm9nXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**软件安装：**

傻瓜式安装直接点击下一步即可，develop中新建notepad文件夹，软件安装此文件夹中。

### python

**软件介绍：**

运行python语言的解释器，安装之后在自己电脑上可以运行python代码

**下载地址：**

https://www.python.org/downloads 安装包在资料中已提供

**软件安装：**

1. 找到资料中的安装包，**选择 "以管理员身份运行"**

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YWVmNjVlNmYxNGNlOWYzMjVhMWE5OTFlM2RiNTg4NWNfM0hpdUhDNDRGYlF2N0duTVp1cEx1c3RCc2RGd0RuYmpfVG9rZW46R0NJWWJkM2pPbzFTOWF4cjFYeWNMU1lwbmtmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

2. 进入安装界面，**勾选最后一项："Add python.exe to PATH"**

      再点击自定义安装 "Customize installation"。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NTEyNjM4ZDgzYzU2YzE0YjUzZDE0ZDdkZDNhMmY2M2NfVUUwNThsYmlJYmJxcDNWZXVQT2NWVnBYc1BjSDk4MG1fVG9rZW46RDY4R2IzbTRyb0FSQmx4ZlpVVmNSZnJKbnhoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

3. 然后进入特性选择页面，什么都不用操作，直接点击 Next 下一步。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2NlNzdjYTMwZWFmYjM0MjEwNTkxNmY3OGNjZDc3YmZfdGREbFlzOU5tNVhJQm1IaWtYV1J6UTF0dGZ1WDdMTzlfVG9rZW46R3FxTmIzQ0tvb1g1RnJ4eUhzbmN1aEJhbkdoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

4. 进入安装页面，在这个页面中要选择Python的安装路径（开发类的软件尽量安装在一个没有中文，不带空格的目录下），这里呢，我将软件安装在了 D盘下的 develop 这个目录下，在这个目录下创建一个文件夹Python，用来存放python的安装文件。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQ2ZDAwNmU2NTMyMGQ3ZDNkNTFjZThkNWQ3MDRjOTNfMWVGa2JRbmM3VUgyTnQ0UFRPdm5OWndCUndiUVBRcnVfVG9rZW46Qjc3d2IxSE9Gb2duWUZ4V1dwZ2NEWWkxblhiXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

5. 选择好了安装路径之后，直接点击 `Install`，就可以执行安装了。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2QyMGY3MzYxMTYxNDI5MzhjNThjOGNhY2I1NzlmYTJfS3ptNm5ibzlUMXBqN3EwdFRUdW5XM2NPQ0lZUmwxcUxfVG9rZW46UERCQ2JhVUp0b3hFeEF4emdXMmNrNmZmbjBlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmE1OGYwYmEwNjI1Y2U5Nzg0MzFkN2UyNWYwNWRkMmZfQ2xjUkx5YzdNczlzbFNxS1VlYk90ZWZsRGJxWTJCQlBfVG9rZW46UzVxeGI5UHN5b3hvWWZ4VE9QYmNITUExbkxlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

安装完毕直接点击 close。

6. 验证是否安装成功

同时按下键盘的 Win + R 两个键。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NTZkZjI1MDFmOTg4MWE2MjRiMjIyZDI0NzUyMTc4MDBfN2o5Ulg5SU9FQjVyZnRESjZuckVwRkNpaDFNb2xVSzJfVG9rZW46Sno2MmJrZWpMb2RWeEF4WUlQMGNENHFVbkpoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

弹出运行的窗口之后，在输入框中输入 cmd，然后回车就可以打开windows上的cmd命令行。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmNlN2ZjYzA1YzI1NzVmZTY5MjdiODI3ZTE3Mzg3NGZfVkxXb1RNc0NaWXZ4eERtQThvS3EzRFY1eEYweGVnODVfVG9rZW46R1NjQ2JIRjFKb3ZMMDF4aXpSYmNOcm91bklnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

然后直接在命令行中，输入`python --version`，回车之后如果能够看到python的版本为 3.14.4，就说明Python已经安装成功了。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NDExODBiOTJlNTdhOGE3OTUxMjBmMDg5NTgzMjMwMWVfc1NrNHkycHhHTW5BaDJjWGdKQnFydnc2UWVuOGlRS2NfVG9rZW46RHFGNWJKSlBab3BpRnB4ZDJGbGN2MHJVbjlmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**常见问题：**

如果输入：python --version，显示`python不是内部或外部命令`，那么需要手动配置环境变量

我们可以在 `我的电脑` 右键 --> `属性` --> `高级系统属性` --> `环境变量`，就可以查看系统的环境变量了。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YTk2NjhlZjU4OTUwOGRmYTExZWNjNGU1OWFmOTQzNjVfRVhQZHQ4OUV0OEZTWm5vdUl5bDF1MVVIUHJBY2RuUzRfVG9rZW46UTRGUWJEMFVXb1VUdVV4dVI5S2NVV1oybnFoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NTEzZThhZTkzMDY2ZjFjNDZkNmFkNWU2MDhjYjNlYWVfclRFeEVGZ2R0UE14VTdZemV5NW1XYXNEaEFGS0NTNWVfVG9rZW46RGtYUGJZZ1o0b2RuOVV4azFxMWNKQ0N3bnBnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzdjZjllMGQwYzZhOTNhZjdlMDQ1MDBmMWY1NzYxMjBfZEZLRzZLM29yWk1oWTJBVUs5TElNNGpOVDBSYTNWdlNfVG9rZW46RTRFa2J6YlhRb3h6bmF4MFRNbGN5Skh0blZmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ0OTA0ZmQyYTc2MGY1MzU2OWJkNDgzYmNiNTliOWVfcmxIckN1VFdpbGpoMmR2V2FpU0lhZG1CbkJnTEVrT0FfVG9rZW46TmpLa2I1bHhQb0pZMU94c0h2bGNIQUdUbnBoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

打开我们电脑上的环境变量之后，我们可以看到环境变量分为两类：用户变量 与 系统变量。

- **用户变量：**仅对当前登录的该用户有效。使用其他的用户账号登录这台计算机时，无法使用这些变量。
- **系统变量：**对所有的用户有效，无论哪个用户登录，都可以访问到这些变量。

可以在系统变量找到环境变量 - Path

**Path环境变量：**操作系统运行一个程序或命令必须先找到对应的程序，然后才可以执行。 而在查找程序的时候，默认会在当前路径寻找，如果当前路径未找到，则会去Path环境变量指定的路径中查找。【如果我们想在任何的路径中，都可以执行某一个程序，就可以将其配置在Path环境变量中】

我们可以来看一下，在我们装好了Python之后，正常情况下，其实已经自动帮我们配置好了环境变量了，因此呢，现在在任意的目录下，我们都是可以执行python命令的。

如果显示python不是内部或外部命令，证明安装时自动配置出问题了，我们只要把下面两个命令配置到Path当中即可

E:\devlop\python

E:\devlop\python\scripts

> 注：这是我的路径，按照自己实际安装的路径来

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjllOTM5M2ZjOWY2YjM1ZTVmNmYwYzkwZjNjYWNlYjlfSEdRU0dDUGRyaWxlM3RmZDZsdmw5YnNpaGhwaElaR1dfVG9rZW46V1hVa2JHRTJUb2ZUTjR4c29MR2NXRGw2bk5oXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

因此，如果大家Python解释器安装好了，输入 python --version 查看不到版本号，就需要检查一下Path环境变量，如果没有自动完成配置，大家就需要手动配置一下上面的两个目录，一个是python的安装目录，一个是安装目录下的 Scripts 目录。

### uv

**软件介绍：**

uv是一个极速的python项目的管理工具，可以下载和管理python中用到的各种工具

中文官方网址：[https://uv.doczh.com](https://uv.doczh.com)

**下载地址：**

[https://github.com/astral-sh/uv/releases](https://github.com/astral-sh/uv/releases)

**软件安装：**

直接解压即可，develop中新建uv文件夹，解压到此文件夹中。

**环境配置：**

将uv文件夹的完整路径配置到path中即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YzZhOWVhNmFhZmRhZDIwNDlkMmFhMzcwNDU4M2QwYjRfZGZMRnFHajV4SjU3VEZ6SWxub2M3WFdJWUpVdjRZSW1fVG9rZW46SXJHR2Ixc2Vxb214OFB4MVJUVGNBVkEybkhmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

验证是否安装成功，打开cmd输入以下指令：

```bash
uv --version
```

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzJiOTUzYmEwYWMxMzU0MjY0M2NmMzFjYjA2OWY5NzZfQUlpWW03ZHlsTHdKTE5wSXJuaDZuRVZQYmtFbk5nYkhfVG9rZW46UFg4YmJ5TVR6b2xVQVR4eUhDNWN6TFdhbmFlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

默认情况下，uv下载依赖是到国外站点：`https://test.pypi.org/simple`，速度很慢。推荐大家将下载的镜像源改为国内站点。

uv支持项目级配置和系统级配置两种方案，项目级优先级高，但是需要每个项目都配置，比较麻烦。推荐采用系统级配置。

系统配置方式如下：

- Windows系统，在CMD运行如下命令：（清华大学节点）

    ```bash
    setx UV_DEFAULT_INDEX "https://pypi.tuna.tsinghua.edu.cn/simple"
    ```

- MacOS或Linux系统：

    ```bash
    echo 'export UV_DEFAULT_INDEX=https://pypi.tuna.tsinghua.edu.cn/simple' >> ~/.zshrc && source ~/.zshrc
    ```

- 常见的国内镜像站点有：
    - 阿里云：https://mirrors.aliyun.com/pypi/simple/
    - 腾讯云：https://mirrors.cloud.tencent.com/pypi/simple/
    - 火山引擎：https://mirrors.volces.com/pypi/simple/
    - 华为云：https://mirrors.huaweicloud.com/repository/pypi/simple/
    - 清华大学：https://pypi.tuna.tsinghua.edu.cn/simple/
    - 中国科学技术大学：https://pypi.mirrors.ustc.edu.cn/simple/

**注册以下账号：**

1. 大模型：获取智谱大模型APIKey（上课讲解）
2. 大模型：获取MiMo大模型APIKey（上课讲解）
3. 大模型：获取DeepSeek大模型的APIKey（自己练习）
4. 大模型：获取商汤日日新APIKey（自己练习）

**安装以下软件：**

1. 高级记事本：notepad--
2. AI工具：claudecode
3. AI工具依赖的两个环境：git、Node.js
4. python管理工具：python、uv

**软件安装的统一建议：**

- 显示文件扩展名
- 安装路径不要有中文，空格或特殊字符
- 建议在非C盘，新建一个文件夹develop，统一管理所有开发相关的软件

如下图所示，我可以在E盘新建一个develop文件夹统一管理，并在里面新建安装各个软件的文件夹

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MmU5ZTA1ZTFjODNhNzU5MzU1ZmI5NDlhYzc4MTM1ZDVfRnd3WFNJTDI5UGlkZTBSaXY1TnlqT2ZqbG9heTJISGhfVG9rZW46VWZpUWJTWDlpb2lwcHB4dUZORWMzeW8ybktiXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 各类大模型账号准备

#### 试学班大模型选择建议

**免费模型：**

1. 商汤日日新（限时免费）

> 国产自研，限时免费

2. 智谱GLM-4.7-Flash（免费大模型，速度慢）

> 免费，代码能力一般，响应速度较慢，勉强能用。

**收费便宜模型：**

1. DeepSeek-V4-pro（便宜，官方没有套餐，试学班大约**3~5元**左右即可）

> 世界顶级推理能力，官方无套餐tokenplan，直接按token收费的，价格便宜，性价比高。

**可充值套餐模型：**

1. 智谱GLM-5.2（39 ~ 375元/月多个套餐可选，巨好用，基本抢不到）

> 软件开发最好用的国内模型，没有之一，套餐不好抢，下午高峰时间3倍扣费，其他时间2倍扣费。

2. 小米MiMo-V2.5（39元/月，便宜好用，性价比高）

> 有多种套餐，国内模型中综合性价比最高，39块/月基本够用。目前有推荐好友注册赠送优惠券活动。

**建议：**使用DeepSeek充值5元，经济划算又牛逼~

#### 智谱大模型

**大模型介绍：**

智谱大模型：清华系，提供了多种大模型，其中GLM-5.1是目前国内最好用的用于代码编写的大模型。

> 注1：智谱GLM-4.7-Flash（勉强能用，免费大模型，速度慢）
>
> 注2：智谱GLM-5.2（巨好用，收费大模型，套餐不好抢，速度快）
>
> 注3：后面工作的时候可以买连续包季的Pro套餐，134.1元/月，够用了。
>
> 注4：千万不要去淘宝买API中转，说多了都是泪，巨坑！

**获取智谱大模型的APIKey：**

1. 官方网址：https://bigmodel.cn/ 或百度搜：智谱ai开放平台
2. 点击右上角注册并成功登录

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YjVhM2ZjZGVlZjNjZTZmNTg5YTViYTMzMTE0YjRmYmZfQWVrdks3Tm9ialdDbGtKbEVKNTNsVFVhcEJ1TnBIMTlfVG9rZW46QnY3dGJHeU1Pb1g0dll4bFdNRmN0ZUpCbmhoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

3. 点击头像，选择账号设置

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzQ2YmExNjM2NmZlNjlkOWUyYWYyZWM0MGRlMDY1MDVfaEtZSmVVcEQxZngwd3hhZTFyS09CcGE4SGlQd0hNYU1fVG9rZW46SnFoTGI3WkNIbzd5eFV4NFQ3aGNXbWZ0bmZkXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

4. 完成实名认证

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MTk2Y2I0YzFiNzdkMDJiMTAwMTEzM2MwZTMyMzA2ZWFfVThPRHFWdkFUYkZJY1RDNlN2NVR1ZWVmUXVwN0FmQ0tfVG9rZW46V3VpWGJuMHc2b3FzdGN4SlV0eWNzSHl5bk1iXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

5. 返回个人操作页面

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MjE4ZjJlYTYyNzJkOGI3MjUyMmY0MDBjYWZiMzY1MzJfQk5CQmdJNHNWVmFmMmpNUmpsdDVZbTRhcmYxaVlQUEdfVG9rZW46TDFXcmJMeWRab3RDREp4WFRaMWN0VG1JblBmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

6. 选择APIKey

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=OTA3OGE0ZDBjYTNmMzNlZDU4ODg4MmE2NmJkYzQzODZfZmdrMXNvUWlLTDcwTElVOWpMME1KRnlaYWowWktlRUdfVG9rZW46VnltRmJ4eTBqb0o0MWV4ZzJYbGNjdm50bmhyXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

7. 新建APIKey，并保存到空白记事本中，不要泄露。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzJmMjM0NTYxODVkOTY3MzM0N2RmODFlM2NhZTlmYjFfN2d1NXlaTXlkS2tWUHdlSXpFTVFGSWZCRUNlZ3pGY3lfVG9rZW46WEUyZmJTZVNib0d4MWt4Qm5JVmNMckhRbjJmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

8. 如果用免费的4.7-flash，不需要氪金，准备好APIKey即可。
9. 如果用收费的5.2，需要氪金，但几乎抢不到，工作之后。可以氪连续包季或者包年的Pro套餐，够用了。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjg2NmY3NTBhMjQ0OWNjMDFmNWQ5ZTU5NDkwMmQyYzVfMGdvQUhaWDBYdlpobjRZeHlrU3l2RlpNQW0xaTZBZVZfVG9rZW46VTI1Y2JLZTlNb3g0dXZ4YjBqVWNCd3F1bkxlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

#### MiMo大模型

**大模型介绍：**

MiMo大模型：小米自研的大模型，属于模型中的后期之秀，据小道消息，MiMo蒸馏了的GPT的很多数据，所以排名迅速上升，编码能力强，性价比高，有实力的同学可以选择。

**获取MiMo大模型的APIKey：**

1. 登录小米平台
    1. 打开官方网址：https://mimo.mi.com/ 或百度搜：mimo开发者平台
    2. 鼠标悬浮<使用MiMo>，点击<控制台>，并登录

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=OTcxMGY5M2M2YTg0MjY1M2RkOTlhMzg1ZjdlYWEyNmVfRWFDdmpyNFF4VmxJRVF5QmVWUUl4ZlBEeEdpNFROMlJfVG9rZW46Ukp3TGJ5Q0VHbzhucU94b3lqU2NiTGxmbnRjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

2. 实名认证
    1. 点击<个人中心>
    2. 点击<去认证>，按照要求进行个人实名认证

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=N2Q5NDg3ZmVkMGJjNTM3NWJhMWZhZjc3ODAyYmIxZDVfUW9vcmlETnJUMzdDTzI3SlpCeHFiclVOR1dGZm1mTkxfVG9rZW46QkhldWJNbjJybzNodFp4dUV1M2NDSXV2bkJiXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

3. 白嫖优惠券
    1. 邀请好友，双方都可以获取10元优惠券，上限30人
    2. 我的邀请码：BNAFRB
    3. 之前有账号，但是未登录mimo开放平台的，右下角也可以绑定邀请码获取优惠券

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YzU1MTQwMmYwODBiMGUwNjBiMTBhZTlhMGVjNDQyNzFfYmRaTktEeENIajBaVU5HSUhjQ0N3RTI3ZmNyeUY3M2ZfVG9rZW46WGNETGJMRGx3bzVTcGR4S2NmVWNSVVN6bkRmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

4. 充值
    1. 点击Token Plan，选择连续包月，充值氪金

> 注：如果有提示需要实名认证，按需要进行认证即可。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=M2Y2YzFhYTAzNGFlZTI4OTcyMzU3OTNhZTBkYWVkOTBfVEQ4ZHFtc0htdFVYNnF5YXRwdTJXb2hpaHRLczdKRDlfVG9rZW46V1ZSSGJsSjd4b3lrSHB4QVgxd2NHZURQbktlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

5. 获取APIKey
    1. 点击左侧token plan
    2. 点击创建APIKey

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MGIyNWNmODYxNmIxZTA0ZWFiY2QwNTNjNzI3MDYzNGFfT3VveGRHSDk1U3RWUzRGVGx4TmtzV3R5VjNNNDk4UFVfVG9rZW46UmRobGJ3bzNQb2NBY3V4OEdPRWM4b2hCbmZmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

6. 保存APIKey
    1. 点击复制并保存到空白记事本中，不要泄露。

> 注1：小米的mimo模型按量收费，APIKey格式：sk-xxx
>
> 注2：小米的mimo模型tokenplan收费，APIKey格式：tp-xxx
>
> 注3：如果用小米的，要先氪金，再创建APIKey，直接点击APIKey获取的是按量收费的，较贵。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmExMmUwNzRiYjZhNmEwNGIyNjY1NzRmNWMxMTcyYzhfZldMemdPYm1WbXpsZ1JGbkFSWEJaY2l5TlNSbk1zOUhfVG9rZW46SXh0SmJERzE5bzhYZWx4dkFzZ2M5QVdvblRjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**课堂练习1：**

自己独立注册DeepSeek的账号，并获取DeepSeek的APIKey，保存到空白记事本待用。

1. DeepSeek官方网址：https://www.deepseek.com
2. 点击API开放平台
3. 点击左侧的APIKey
4. 新建APIKey，并保存到空白记事本待用
5. 点击左侧充值，氪三到五块，可以用很久

**课堂练习2：**

自己独立注册商汤日日新的账号，并获取APIKey，保存到空白记事本待用。

1. 商汤日日新官方网址：https://www.sensenova.cn
2. 点击上方token plan
3. 点击公测，立即开始
4. 点击左侧的APIKey
5. 新建APIKey，并保存到空白记事本待用

### git

**软件介绍：**

git是用来进行代码管理的，claudecode也依赖git的代码管理功能。如果git没有安装，claudecode无法正常运行。

**下载地址：**

[https://git-scm.com](https://git-scm.com)

在今天的资料文件夹中也有提供，直接使用即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MTgzMzM4MjVmYjMxZjIwMmYxNmRiOTExZDQyNzAzMGNfeUhRR2NZMDV0elpTMWF2SmQzOHpLYVB6TzNaczZqUUxfVG9rZW46VWsxb2I2b0NDb0kxUnV4M2pqMWNKNzh3bjNmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MzRkYzYwM2VmODQ4NTMwMWY5OTJiMTMyMDA5MTZmZjVfS0Y2MVdyeGxkbmowdWpPSHlWS0toTWxxZHhOYk9ibXpfVG9rZW46RURWT2JLcTNIb3NlSGJ4ZzBkZ2M1ZDFFbkpnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**软件安装：**

傻瓜式安装直接点击下一步即可，develop中新建git文件夹，软件安装此文件夹中。

### Nodejs

**软件介绍：**

Nodejs是claudecode的依赖环境。

可以这么理解：

我们平时想要玩游戏一样，玩游戏之前，要确认Windows操作系统是否正常，如果操作系统不行，游戏根本安装不了，而claudecode是依赖nodejs才能运行的，所以想要在电脑里面运行claudecode，必须要先安装Node.js环境。

**下载地址：**

[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)

在今天的资料文件夹中也有提供，直接使用即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=Njk5MzUwZjY0ZTRjMzcwOWViNDEzZTJlY2VjMTA4M2FfNmdoVWk3czRnY1d5QjVxQ0tNQUJvTlNoVE4weHBFcFVfVG9rZW46Uk9aYmJwWVVGbzlOVEZ4Rkdtc2NlWVpjblRnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

选择不同的版本

x64：一般是Windows64位的操作系统

x86：一般是Windows32位的操作系统（从win11开始已无32位的操作系统，32位安装包已不支持下载）

arm64：一般是macOS的操作系统/平板，手机操作系统

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YTVlYmUyZTFlMTczNTkyYTMxNTQ5MTkyNjE4ZmVkMjNfWXZ6VmgxVDU2OGJERGJwYVlFZDJjeGVJcmRSdlNKSjdfVG9rZW46UTBkYmJPaHRVb0ZCVWN4dEpoc2NRTEhZbm9iXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**软件安装：**

傻瓜式安装直接点击下一步，develop中新建node文件夹，软件安装此文件夹中

> 注：如果npm命令无法执行，检查npm的环境变量

**环境配置：**

1. **新建文件夹待用**

> 注：如果安装的时候，没有修改路径，默认安装到C盘，本步骤跳过

在..\develop\node\文件夹里面新建两个文件夹node_global和node_cache，解释：

- node_global：利用nodejs下载的所有工具
- node_cache：下载时候的缓存内容
2. **查看nodejs的配置信息**

> 注：如果安装的时候，没有修改路径，默认安装到C盘，此处只要修改registry镜像地址，无需修改prefix和cache

管理员身份打开cmd输入命令：

```bash
npm config get prefix  // 查看npm工具地址，默认在C盘
npm config get cache   // 查看npm缓存文件地址，默认在C盘
npm config get registry  // 查看默认镜像下载地址，默认是国外的地址
```

3. **修改nodejs的配置信息**

> 注：如果安装的时候，没有修改路径，默认安装到C盘，此处只要修改registry镜像地址，无需修改prefix和cache

- 把npm后续下载的工具，移动到node_global文件夹中，不占用C盘空间

```bash
npm config set prefix "node_global路径" // 注：这里的路径是node_global文件夹的完整路径
举例：
npm config set prefix "E:\devlop\node\node_global"
```

- 把npm下载时的缓存文件，移动到node_cache文件夹中，不占用C盘空间

```bash
npm config set cache "node_cache路径"  // 注：这里的路径是node_cache文件夹的完整路径
举例：
npm config set cache "E:\devlop\node\node_cache"
```

- 修改nodejs默认镜像下载地址，变成国内的

```bash
npm config set registry https://registry.npmmirror.com
```

4. **修改环境变量**

> 注：如果安装的时候，没有修改路径，默认安装到C盘，本步骤跳过

打开用户变量，注意是用户变量，不是系统变量

把用户变量里面path中最后一个修改为第一步新建`node_global`文件夹的路径

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWUxMWY5OGU3MTc3Yjg4MDA1YTIwNjQ1YTIxZTllYmRfU3FZanR4OFdLZFJWd1RQNmI0TUxXZ3kzOGV4Q1o4a2hfVG9rZW46UzlvRGJBQ1RTb1h3ZVR4NDZFY2NvTWlIblRiXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

5. **确认node安装成功**

打开cmd输入命令：

```bash
node --version  // 显示版本号：v24.15.0
npm --version // 显示版本号：11.12.1
```

> 备注：成功显示版本号代表安装成功，nodejs的版本号必须**大于等于v18.0.0**，npm版本号必须**大于等于8.19.4**

6. **node卸载**
- 控制面板卸载
- 手动删除以下文件：
    - `C:\Program Files\nodejs`
    - `C:\Users\你的用户名\AppData\Roaming\npm`
    - `C:\Users\你的用户名\AppData\Roaming\npm-cache`

> 注：如果找不到，可以就用everything找

- 清理环境变量，包含node，npm

### claudecode

**软件介绍：**

利用AI大模型生成代码的工具

> 注：要注意的是工信部发布：2.1.91 ~ 2.1.196 不能使用，可以升级为最新版

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzBlZDFjMzI5YjU1MWZlNTA4ZDQ1YzAzYjYxMzc2ODRfcjNLN3lvbGdydXpabUZkMXhPdXNwSUVCVVRueE5yd3FfVG9rZW46SFlsUWJIWnBLb1dydWV4Q3l5N2NVcEVqbjRrXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**三种安装方式：**

方式一：一条命令安装（需要科技上网Cli版）见补充内容

方式二：利用安装器，去安装msix文件（需要科技上网）（GUI版）见补充内容

方式三：npm（不需要翻墙Cli版）

- 利用node安装即可
- **管理员身份打开cmd输入命令：**

> 注：如果网络较慢，建议用热点下载，否则容易下载失败
>
> 如果报错：claudecode和Windows不兼容，利用手机热点，重新下载安装即可

```bash
npm install -g @anthropic-ai/claude-code // 下载并安装claudecode
```

- 确认安装成功

```bash
claude --version // 查看版本号 2.1.206 (Claude Code) 版本号成功显示，代表安装成功
claude --update  // 如果版本低于196，升级即可
```

**注意点：**版本为196以上，没有安全隐患的版本即可

**启动claudecode：**

如果出现下列报错，请检查git是否安装成功

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=N2JmOWJmMzZmN2UxOWU4NTRhNTE5ZTMwNDM5M2ZhNTNfYTZMbmdtY0hmeFpscVR2b0JaeGcwbktaV1ZFQlV1R0dfVG9rZW46TUFoeWJaOXNlbzZRamx4UEdzTGMwcEdKbjZjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**再次启动claudecode：**

1. 看到启动图标，但是还有红色报错：

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=M2JiYWZhOTFmMzRiZmI5YjgyNTk1ZjFiODRkYWVmZWVfajR2andOZXZQelVna012ZXJ2bVZLMWxZZTVQc1h0c2VfVG9rZW46U1dhOGI0YW42b1g4Z3l4UERpRmNuejdQbkhlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

```text
Unable to connect to Anthropic services
Failed to connect to api.anthropic.com: ERR_BAD_REQUEST
翻译：无法连接官方的服务
```

因为claudecode屏蔽了国内的IP，在新手引导时期会检测IP，需要跳过新手引导，后续使用不受影响

2. 打开Windows操作系统的用户目录，找到`.claude.json`这个文件

**举例：**C:\Users\awei\.claude.json，其中awei是我的电脑名。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYzNjg2OWUxMzJiYjgzYjMzMzZkMDdiMzU1M2ZhNjRfWWRiZkVRV1l5cHhBalBrN2lDS1FxWXM3V0RLbUVLcThfVG9rZW46UjR4ZmJtZjJhb2RGQXd4VEN1OGNYSllXbmJlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

3. notepad打开`.claude.json`文件

> 注：如果没有该文件，自己新建一个

添加一个新设置选项："hasCompletedOnboarding": true

```json
{
  "firstStartTime": "2026-04-22T09:44:27.751Z",
  "opusProMigrationComplete": true,
  "sonnet1m45MigrationComplete": true,
  "migrationVersion": 11,
  "userID": "677827071c36d4c65d921a4ba4054c21110a0fca1adb21275aeb76a96423294e",
  "changelogLastFetched": 1776932630556, // 这里加一个英文的逗号，跟下面的配置进行区分
  "hasCompletedOnboarding":true  // 末尾新增选项，表示跳过新用户引导流程
}
```

4. 找到用户目录下的.claude文件夹，打开这个文件夹

**举例：**C:\Users\awei\.claude\，其中awei是我的电脑名

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NWVhYzU0M2I4MzNkMTNlOGRmODk0MTlmZTRmZjZiZmVfOGVtSUpMVUhQMEpYVEh0c2pBOHNDall6SmhwMm0wTjJfVG9rZW46TXlnQWJhZEVEb3ZNcFB4VnUxb2NVZkYzbkNmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

5. 打开里面的`settings.json`文件，如果没有该文件，自己新建一个

把下面内容粘贴到文件当中：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://api.minimaxi.com/anthropic",// 大模型访问地址
    "ANTHROPIC_AUTH_TOKEN": "大模型的APIKey",// 在注册大模型的时候保存的，还找到吗？
    "API_TIMEOUT_MS": "3000000",    // 单位毫秒，超时时间
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",// 是否禁用非必要的网络流量，1为禁用
                                                    // Claude Code 在运行时可能会发送一些非必要的请求、
                                                    //（例如检查更新、遥测数据、匿名使用统计等）
                                                    //设为 1 后，这些流量都会被禁止
    "ANTHROPIC_MODEL": "MiniMax-M2.7", // 默认选择的模型
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "MiniMax-M2.7", // 推理任务选择的模型（较为复杂的任务，需要深度思考，比如编码，分析）
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "MiniMax-M2.7", // 高端复杂任务选择的模型（高端复杂任务，比如架构设计）
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "MiniMax-M2.7", // 轻量级任务选择的模型（延迟低，比如自动补全，简单编辑）
    "CLAUDE_CODE_EFFORT_LEVEL": "max"// 不惜一切代价（资源和时间）追求最高质量的输出
  }
}
```

> 注1：mimo的BASE_URL：https://token-plan-cn.xiaomimimo.com/anthropic
>
> 注2：智谱的BASE_URL：https://open.bigmodel.cn/api/anthropic
>
> 注3：DeepSeek的BASE_URL：https://api.deepseek.com/anthropic
>
> 注4：商汤日日新的BASE_URL：https://token.sensenova.cn

**代码质量保证的设置：**

**"CLAUDE_CODE_EFFORT_LEVEL": "max"**

**优势：**

让claudecode不惜一切代价（资源和时间）追求最高质量的输出，而不是追求快速响应或节省 Token。

体现在以下几个维度：

1. 深度推理与规划：Claude 会在执行代码修改前，花费大量“思考”时间进行多轮自我推理和规划。对于复杂问题，它会生成多个方案并自我评估，而不是直接给出第一个想到的答案。
2. 彻底的上下文检索：它会更激进地搜索和阅读你的代码库。为了找到问题的根源，它不仅会看当前打开的文件，还会主动 grep 搜索相关定义、调用关系和历史版本，确保不遗漏任何边缘情况。
3. 多轮迭代验证：在生成代码后，它会更主动地运行编译、测试或 Lint 工具。如果检测到问题，它会反复进行“修改-验证-再修改”的循环，直到测试通过或确认无误为止，而不是浅尝辄止。
4. 详尽的输出：回复会更详细，包含更完整的代码重构说明、安全考量和后续优化建议。

**弊端：**费钱

**建议：**

1. 老师上课，学生课堂练习不开，晚自习可以开
2. 按量收费不开，tokenplan可以开

**再次启动claudecode：**

1. 选择yes，信赖这个文件夹

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTk4NWNiODFjYzQ5MDE5ZDNjYmJiZjE0MzY1YWE4YjFfMk1RQzVLN3hzUEhLM2dTRzQ5Y2ZDRjZDYWptNTJVWDVfVG9rZW46VDZBS2JndU1kb1dtWXh4SVduU2M3MFJiblBnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

2. 你会看到claudecode已经跟大模型对接完毕

      下方红色框中，就是我们claudecode底层依赖的大模型

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzUwZTdjZmE4OTgyNDAzZDcwNTY3NjFmYzA5MTYxZTBfaFV1bkhHdmJiRjNvTnFkVnBGZmI1UkVvejVEVVdvWmFfVG9rZW46QzhHTWI0cnkxb1Jocnl4VUNmWmM3Rm9nbnNjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**课堂练习：**

如果claude code 想更换其他平台的模型该如何操作？

## AI项目初体验

### 新建文件夹

在桌面新建文件夹test，我们会利用claude code在该文件夹下生成前后端的项目

### 启动claude code

在当前文件夹中打开cmd

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NThjZTU3NzI5MDU4OWJiNGFiMDg0NDViMjE2MmY2NzRfbkFtd1JwYXhKNVFMY3BjaGl1ZDFHS1hBQlRLN253dFRfVG9rZW46RHJIZmJxUTU1b2lyOWt4ZkFDZWNWUUJ3bnJnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YTU2ZTM0ZTVhYTA0YjgyYzQwODJiN2VkNDhlMTFhOGFfRVFGOHozN1Fid1dPblk4aHhTbFFlUk1SZFNtM2dTbUFfVG9rZW46UVBlZmI0UEZvb0dRdWR4NlE3OGN3dHZybnZoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

启动claudecode

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzRiNmZhYTZkYjZjMTk5Mzk2OWU1ODM5MTFlOWU2YjdfN2loUUFQSHBMN1FHcTR0WlRMdURydTlucjI5S2tmSm5fVG9rZW46SE5uMmIxMUtpb3RHSFN4WDRDVmNWcGJpbmhnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 生成前后端项目

#### 需求一

我要生成一个前后端的AI对话机器人项目

**提示词一：**

帮我在该文件夹下生成一个前后端的项目，AI对话机器人，前端用原生的html，css生成，利用axios对接后端，要注意前端的美观。后端利用uv进行python的项目管理，利用fastAPI跟前端进行对接，后端在对接大模型完成AI对话机器人的时候， 使用DeepSeek大模型，API_KEY为：XXX

**提示词二：**

你帮我测试一下，前端，后端，大模型之间的接口是否畅通，如果无法联调成功，帮我进行修改，保证代码能成功运行。

**提示词三：**

利用uv启动一下后端服务

**效果图：**

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=YjUyZTllNDlmNzBkYWMxNTBhNDY4NzY1NWI0MjI3NGZfdktjRUo3TDBaNGxycUFsbEpZVG52bGRoanJnU0dvV0NfVG9rZW46WE5YeWJXU240b29xUTV4Z3lxYWMybXRnbmhmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

测试完毕之后，让AI停止

**提示词四：**

停止后端服务

#### 需求二

我要修改原本的项目

**提示词一：**

我现在要修改一下这个项目，要注意前端的美观，把他变成一个AI伴侣对话机器人。

如果屏幕前是兄弟：你可以做AI女友对话机器人

如果屏幕前是姐妹：你可以做AI男友对话机器人

前端页面刚启动的时候会让你选择女友的性格，温柔，暴躁，犀利，害羞等，选择性格之后，输入自己给女友起的名字，最后再进入到AI对话机器人的聊天框中，此时AI就扮演我设定好的女友跟我对话，你帮我修改前端，后端相关的模块

**提示词二：**

你帮我测试一下，前端，后端，大模型之间的接口是否畅通，如果无法联调成功，帮我进行修改，保证代码能成功运行。

**提示词三：**

利用uv启动一下后端服务

> 注：如果项目启动之后，效果可能跟资料中不一样，这没关系，因为大模型生成的代码有不确定性，只要完成业务功能即可。

**效果图：**

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=N2JjMTc0ZmJhMDEzOTM2NjkzZDUxN2QzYzIzOGRiMjNfam5sUnBGbFpRbzVOSXR5WnYxMEdsZFBKR0hERzF4OVVfVG9rZW46WmxjNWIwZVZYb3FIeGN4OVVndWMxUWRwbjVjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

测试完毕之后，让AI停止

**提示词四：**

停止后端服务

### 课后项目实战（学生自己练习）

**需求：**

利用今天所学，自己编写一个学习计划软件

**前端页面效果如下：**

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NmY0MmQ2OGI1Y2QwNTg2NzE1NDAwODA4MjFlZGUwYWRfZDlCVFNvbDNla2RhU1padEFVMzJrVW15M3FTMmYzc1RfVG9rZW46SWxVWGJVM0tKb052Zkd4MWN4SGNPMXRybkNoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

效果解释：

姓名：后面是输入框，自己输入

性别：后面是单选按钮，自己选择

年龄：后面是输入框，自己输入

学历：后面是下拉框，下拉框的内容为：硕士及以上，本科，专升本，专科，其他，默认显示本科

知识基础：后面是输入框，输入自己会的计算机知识，比如：MySQL，C语言基础语法，不会就输入0基础

学习习惯：后面是输入框，输入自己的学习习惯，比如：早上昏昏欲睡，中午吃完饭犯困，晚上精神百倍

点击生成学习计划之后，将输入的信息发送给后端。

**后端服务器逻辑：**

1. 接收前端发送过来的学生信息
2. 先简单的初步判断
    1. 学历选择其他，表示低于专科，不需要访问大模型，直接劝退。

            给前端返回：同学，可以考虑其他非开发类的方向。

3. 将前端发送过来的学生信息，还有学习路线安排，一起发送给大模型。让大模型给出学习计划。

（课程安排如下）

> **课程安排：**
>
> 1. vibecoding项目开发
>
> 2. AI应用全栈开发基础
>
> 3. RAG智能体开发
>
> 4. 企业工程化能力（Java）
>
> 5. AI工程化-微服务智能体实战
>
> 6. 传统项目的智能化升级
>
> 7. AI应用评估与模型调优
>
> 8. 面试指导与就业加强
>
>
> 备注：因为学习内容是固定的，所以直接保存在后端，不需要前端输入。
>
> 后端是要把前端发送过来的数据，和上面的课程安排拼接成一个整体，一起发送给大模型

4. 让AI给自己定制一个具体的学习建议，并给出可实施的方案，并把最终的结果保存到本地Excel中。文件名就叫做：学习计划。

**下面是claudecode的进阶用法**

---

## claudecode的启动方式

昨天我们利用claude命令启动了claudecode，在我们使用的时候其实有以下五种启动方式：

**方式一：**claude：常规启动

**方式二：**claude --continue / claude -c：继续上一次对话启动

**方式三：**claude --resume/ claude -r：恢复历史聊天记录

**方式四：**claude --dangerously-skip-permissions：绕过安全检查启动

**方式五：**claude -n / claude –-name：起别名启动

### 常规启动

最常用的启动方式。

有的时候会显示完整信息，有的时候因为缓存，网络等原因只显示核心信息，但是对后续使用无任何影响

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWNhMzdhY2MyNzAzM2QxN2JhMDVlZWQ2NzYwYWFlMmVfT3FZSVN3alFnSk9pSlJyd2NDdUp2eWZJWkdjV2NFaUJfVG9rZW46VXMwaWJwSnZKbzFlYWd4cjNKZ2NQa1ZmbkpjXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=OGRmYWZkNjRhMzJmNmNiODFlYTk2M2EzYWZhOTY4N2RfMnEyTHg5UE1TM3FNOXRlcGVINnh2SUNpdG1BSE9tNndfVG9rZW46QmVyWWJqTTRZb1hGb0V4SHVmQWNXWk5vblZnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 继续上次对话

如果上一次异常终止，可使用这种方式启动，会把上次对话的记录显示在界面上

使用下面的命令都可以

- claude --continue
- claude -c

### 恢复历史聊天记录

如果想迭代修改以前的模块，可以用这种方式启动，会把以前的聊天记录显示在界面上

使用下面的命令都可以

- claude --resume
- claude -r

### 绕过安全检查启动

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ODU1ZGQ1MGQ2OTVjNGE0MzU1ZmQ4MzAyYjFkYzEwOGJfRVgzUFJNY05jSFpON1lONkZEY1lZUnRld0VEOFhZbEZfVG9rZW46VzVHZmJHSzhyb016NUh4ZTNTYmNqaWxEblJoXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**启动方式：**claude --dangerously-skip-permissions

相当于操作系统绕过防火墙做事情，自动，但是危险。

可以绕过绝大多数权限操作，一般不建议这么干。

一些非常极端的操作也会禁止，比如大面积的数据删除

### 起别名

如果想开多个claudecode的窗口，每个窗口做不同的事情，可以给每一个窗口起别名

使用下面的命令都可以

- claude --name
- claude -n

## claudecode的权限控制

claudecode因为权限问题，很多操作需要我们自己点击yes，下面有三种方式可以让claudecode拥有更多的权限，让我们少点yes

**方式一：**启动时直接绕过安全检查

**方式二：**全自动/半自动方式

**方式三：**配置文件精细控制

### 跳过检测方式

**启动方式：**claude --dangerously-skip-permissions

### 全自动/半自动方式

为了在危险性和自动之间寻求一个平衡。

claudecode中，又引入了多种操作模式，可以利用快捷键进行切换

**快捷键：**Shift + Tab

| 可切换的模式 | 说明 |
| --- | --- |
|plan mode on|计划模式，day04详细学习|
|manual mode on（纯手动）|所有操作需确认|
|accept edits on（半自动）|自动接受文件编辑|
|auto mode on（全自动）|自动执行所有命令（其他命令 + 文件编辑）|

**工作原理：**

在claudecode里面内置了AI 分类器，会进行安全判断。

- 低风险操作（如读文件、编辑已知代码）：分类器判定安全，自动放行。
- 高风险操作（如 `rm -rf`、修改系统文件、执行未经验证的网络请求）：分类器会判定危险，直接拒绝执行。需要我们回退到 "manual mode on" 手动模式，或者要求 Claude 换一种更安全的写法。

**如下图所示：**

出现该问题之后，需要切回手动模式

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=MmUzODQxYTg3MjMwMzBhOTFiNzI4NWY4ODlmYWMwMzVfUEE3RVhCWDhzVXpGRkdjVkZQNEpHRUg0YWFDdkRLbmFfVG9rZW46SmVFQWJyWnZKb2VjVWJ4RUxkbmNDdTZpbmloXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 配置文件方式

这是最精确的控制权限的操作，我们可以把禁止的和允许的写到配置文档当中。

- 允许的操作allow：不需要点击yes，直接放行
- 禁止的操作deny：直接停止

配置方式如下：

- 打开Claude Code 的全局配置文件，位于 `~/.claude/settings.json`

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "大模型的的BASE_URL",
    "ANTHROPIC_AUTH_TOKEN": "自己的APIKey",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": "1",
    "ANTHROPIC_MODEL": "大模型的名字",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "大模型的名字",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "大模型的名字",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "大模型的名字"
  }, // 注意这里要加个逗号，跟模型配置加以区分
  "permissions": {  // 给claudecode添加的权限
   "allow": [ // 允许的权限
     "Read",  // 读取文件中的内容      
     "Write", // 写入文件      
     "Bash(npm *)", // npm命令  
     "Bash(git *)", // git命令   
     "Bash(node *)" // node命令  
   ],
   "ask": [...], // 可以删除，未配置默认ask
   "deny": [ // 禁止的权限
     "Bash(rm -rf *)"  // 全局删除
   ]
  }
}
```

配置完毕之后，重启claudecode，可以再次询问：

```text
你现在被允许直接操作的权限有哪些？禁止操作的权限有哪些？
```

展示效果如下：

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NzcxZjllOTU0MjMxNzMyN2NlMzhjZTMxM2MwZmRjY2VfSU04ejRwTG9jM1RmNVZOSWM1NjNvc2J1UVVyNDdlNzhfVG9rZW46TVlQbGJ0OGlmb0R5eHB4NTdRWWNDV3NTbnNmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 三种方式的区别

- **跳过检测方式：**非常危险，一般不建议使用
- **auto mode on：**由AI分类器判断该操作是否安全，平时用的较多
- **配置文件：**更精细化的权限控制方式，allow直接放行，deny绝对禁止

> 注：配置文件里面禁止的操作，**auto mode on**也无法执行

**建议使用方式：**

可以选择auto mode on，把一些非常危险的操作，比如删除直接配置在setting配置文件夹当中即可

## claudecode的常见命令

### 基础命令

| 命令 | 作用 | 使用场景 |
| --- | --- | --- |
|/help|显示帮助信息|忘记命令时查看|
|/model|查看/切换当前模型（高/中/低档）|我们设置的模型都是一样的，暂时没用|
|/clear|完全清空当前对话|开始全新任务，创建新的聊天记录文件|
|/btw|该命令下的对话不会记入上下文，适合临时提问|主任务进行中想问个无关问题|

### 常见命令

| 命令 | 作用 | 使用场景 |
| --- | --- | --- |
|/context|详细查看上下文中每个模块占比|防止上下文过多导致模型幻觉|
|/compact|压缩当前对话的上下文|对话太长，AI开始“遗忘”早期内容时|
|/init|自动生成项目的 CLAUDE.md|进入新项目后的第一件事|
|/rewind|回退到某个节点|说错几句话，不污染上下文|
|双击esc|停止/回退|如果claudecode正在执行，停止当前操作<br><br>如果claudecode没有执行，等同于/rewind|
|/simplify|从"代码质量"、"运行效率"、"可复用性"三个角度去审核并修改项目代码|开发完毕之后，项目优化时使用|
|/resume|选择历史对话|异常终止|

## claudecode宪法

claudecode里面有一个执行规则，在执行的时候必须要遵守里面的规则，他就是claude.md文件。

### 文件内容

我们会把开发时的注意点，AI要遵守的规则，都写在claude.md中。

**比如：**

```markdown
核心行为准则
1. 所有回答都需要使用简体中文。
2. 上下文接近80%左右的时候，提醒我。
3. 遇到配置文件settings.json中deny绝对禁止的操作，立即停止并提醒我，不要尝试其他方式执行。
4. 如果要修改settings.json的内容，修改之前务必告诉我，允许之后才能修改。
5. 每次回答要精准，不绕弯子，拿不准的提前问我，不编造。

工作流程
1. 涉及 3 个以上文件改动时，先输出中文实施方案，等我确认后再编码。
2. 生成代码时，文件名、变量名、函数名等命名要简洁明了，见名知意。
3. 遇到报错时，先用通俗的中文解释错误含义，再给修复方案。
```

每次claudecode跟大模型交互的时候，都会把claude.md中的内容拼接到提示词中。

### 文件位置

他可以放在任意的目录下，但是一般我们会在以下层级进行配置：

**全局配置**、**项目根目录**和**模块子目录**

- 用户全局配置：

      位于：`C:\Users\你的用户名\.claude\CLAUDE.md`：他是全局的配置，自己开发的所有项目都需要遵守

- 项目根目录（团队）：

    位于：`项目文件夹\CLAUDE.md`：他是本项目的配置，本项目中需要遵守的规则，团队共享。

- 项目根目录（团队补充）：

    位于：`项目文件夹\.claude\rules\xxx.md`：他是本项目的配置，本项目中需要遵守的规则，团队共享。

- 项目根目录（个人）：

      位于：`项目文件夹\CLAUDE.local.md`：他是本项目的配置，本项目中需要遵守的规则，个人遵守。

- 模块子目录：

      位于：`项目文件夹\模块文件夹\CLAUDE.md`：他是单独模块的配置，当前模块需要遵守的规则。

### 优先级

不同位置的`claude.md`中的内容，尽量不要冲突。

如果冲突了，他会遵守就近原则，谁离我近，我就听谁的。

**举例：**

全局配置：回答要中文

项目配置：回答要英文

A模块配置：回答要韩文

B模块配置：回答要俄文

**效果：**

如果我在A模块中问答，结果就是韩文

如果我在C模块中问答，结果就是英文

### 一个好玩的操作方式

可以在claude.md的文档中，手动加上一句话：

1. 每次回答我问题之前，请务必叫我：主人~

这样可以有效的检测AI是否按照claude.md的规则生成代码

如果有一次回复没有这么回答你了，那么就需要压缩上下文了。

> 注：这个称呼你自己定，别搞的太羞耻就行~

但是经过大量测试，这种效果其实并不是特别理想，只能增加开发的趣味性。

真正能控制上下文压缩的方式：

1. 安装HUD实时监控
2. claude.md中达到80%明确提醒
3. setting.json配置自动压缩 "autoCompactThreshold": 80

## Memory记忆

### Memory的使用方式

claudecode在本项目当中自动进行维护的，包括用户的视角设计偏好、用户的技术选择偏好、工作经验等

不需要用户编辑，是claudecode在本项目中自动完成的

地址在：`C:\Users\awei\.claude\projects\项目名\memory当中`

**记忆位置：**

`C:\Users\awei\.claude\projects\项目名\memory当中`

**记忆内容：**

- user：用户的身份、用户的偏好
- feedback：agent该如何配合你，纠错经验
- project：项目相关的内容（进度、阶段结论、重要决策等）
- reference：外部资源位置（xxx文档在xxx位置）

举例：

```text
发送：
    记住了，在当前项目当中，界面要简洁，不要花里胡哨
回答：
    好的我已经记住了！在当前项目中，我会保持界面简洁、清爽、干净，避免花哨的装饰、多余的动画和复杂的配色，让功能优先、视觉为功能服务。后续所有 UI 相关的代码我都会遵循这个原则来设计。
```

检查：

`C:\Users\awei\.claude\projects\项目名\memory`可以在当前目录下查看关于本项目的记忆内容

### 记忆结构

主索引文件：Memory.md。

关联子文件：各类文件.md

Memory.md会告诉claudecode，现在有哪些记忆文件，并一句话概括该文件的内容。

真正的记忆细节会写在子文件当中。

运行的时候，只加载主索引文件，子文件默认不加载，需要的时候再加载

### Memory和claude.md的区别

**claude.md：**

- 用户编辑的规则
- claudecode每次会读取所有内容
- 除非用户要求，claudecode不会自行修改
- 优先级最高

**Memory：**

- claudecode自己在完成事情时，用来记忆的备忘录
- 按需加载，不会加载所有内容
- claudecode会根据项目完成情况，随时修改记忆
- Memory只在当前项目有效

就好比平时生活中，claude.md就是法律我们在做任何事情的时候都要遵守，Memory就是我们自己的记忆

## Skill

AI在写生成代码的时候跟抽盲盒一样，有时干得好，有时干得差。为了解决这个问题我们学习了提示词。

但是，提示词的篇幅往往比较长，还需要进行反复的调试，那么就会带来很多问题：

### 第一个严重的问题

以后我还想做同样的事情，提示词还得再写一遍，还得反复的调试，踩过的坑还要踩一遍，非常麻烦。

**课堂提问：**

同学，如何解决这个问题呢？

答案很简单，把提示词存起来就可以了，txt，office或者其他地方，用到了直接复制。

比如下面这个案例，以后只要想让AI分析简历，就可以直接复制

**举例：**

```text
你是一个专注于"AI应用与智能体开发"的简历审核专家，请帮我审核以下面向Java、Python及Agent（智能体）AI应用开发方向的简历，重点优化技术能力、项目经验和岗位匹配度，确保内容突出应用层开发经验，体现实际应用落地能力而非算法研发。请根据以下要求提供具体修改建议和优化方向：

1.技术栈匹配（侧重应用层）：
○ 确认Java和Python技能描述是否准确，是否涵盖相关应用层框架（如Spring Boot、Django、Flask等）、开发工具（如Maven、Git、Docker）及智能体应用开发技术（如Rasa、DeepPavlov等框架）。
○ 弱化AI算法库（如TensorFlow、PyTorch）的详细描述，转而强调如何调用或集成现有AI模型/服务（如API调用、模型封装、第三方SDK集成）。
○ 突出智能体应用相关技术（如对话系统开发、事件驱动架构、微服务、RESTful API设计等），补充应用层关键词（如“全栈开发”“系统集成”“高并发处理”）。
2.项目经验强化（应用落地导向）：
○ 检查每个项目是否清晰描述应用场景、系统架构（如前后端分离、B/S架构）、个人职责（如需求分析、模块开发、接口对接、部署维护）及实际成果（如用户量增长、效率提升、业务指标优化）。
○ 确保项目案例突出智能体应用场景（如智能客服、自动化流程、推荐系统、任务调度系统），强调AI能力如何嵌入业务流程，而非算法实现细节。
○ 建议使用量化指标（如“用户满意度提升XX%”“日均处理请求量XX万次”）体现应用效果；若原简历缺乏数据，请提示补充方向。
○ 突出工具链使用（如Kubernetes部署、CI/CD流程、监控系统集成）和团队协作经验（如前后端对接、需求沟通）。
3.岗位针对性（应用开发方向）：
○ 分析简历是否匹配目标岗位要求（如Java/Python全栈开发、智能体应用开发、AI系统落地经验），建议增减技能或经验（如补充前端技术、云服务经验、DevOps能力）以贴近招聘需求。
○ 弱化算法设计、模型训练相关描述，聚焦于应用开发、系统集成、性能优化、测试部署等能力。
4. 
结构优化：
○ 优先展示与岗位相关的技能模块（如将“项目经验”置于“技术栈”前，突出实战能力）。
○ 精简教育背景，强调与岗位相关的课程或证书（如AI应用课程、全栈开发认证）。
○ 使用动词开头突出行动和成果（如“设计并开发”“集成并优化”“部署上线”）。
5.专业术语与表达：
○ 修正术语准确性（如区分“模型调用”与“模型训练”，“系统集成”与“算法开发”）。
○ 避免过度技术化描述，用易懂语言说明复杂应用逻辑（如“设计基于Agent的自动化任务调度系统，实现XX业务流程自动化”）。
○ 检查语法和格式，确保简历简洁专业，无冗余信息。
6.附加建议：
○ 若简历有亮点（如高并发系统、跨团队协作项目、上线产品案例），请建议如何更突出展示。
○ 若经验不足，可提供补充方向（如强调技术广度、项目复杂度、工具链熟练度，或补充相关实习/自学项目）。
```

### 第二个严重的问题

提示词复用的问题解决了，但是你觉得这就够了吗？随着保存的提示词越来越多，几百个，几千个。

又会带来第二个很严重的问题：

提示词太多了，每次找都很麻烦，甚至压根找不到了，怎么办？

**课堂提问：**

同学，如何解决这个问题呢？

答案也很简单，把所有的提示词都保存到一个文件夹里面，让AI去找就可以了。

### 第三个严重的问题

提示词复用的问题解决了，文件查找的问题解决了，但是随之又产生了新的问题：AI怎么找？提示词太多了，你不能每次都把所有的提示词交给大模型吧？不现实，更重要的是非常浪费token。

**课堂提问：**

同学，如何解决这个问题呢？

答案其实也很简单，我们给每一个提示词起个名字，加个描述。每次跟大模型对话的时候，不加载全部的上下文，只加载名字和描述，如果当前的描述符合我的需求，我再读取全部的内容。

比如这样：

```text
name: pdf 
description: 只要用户想要对 PDF 文件执行任何操作，就使用下面的提示词。。。

下面就是提示词的完整内容
```

这就是我们接下来要学习的Skill。

### 什么是Skill？

Skill翻译过来就是技能，也叫做工作手册。最简单的理解就是结构化的提示词。最核心的内容是一个md后缀的文件。包含了以下内容：

- **name：**skill的名字，如果手动调用就是通过名字调用的。
- **description：**skill的描述，这个描述非常重要，claudecode就是根据描述自动调用当前的Skill，里面包含了很多触发词。
- **内容：**详细的操作手册

````markdown
// 当前Skill的名字
name: pdf 

// 当前Skill的描述，这个描述非常重要，claudecode就是根据描述自动调用当前Skill的
description: 只要用户想要对 PDF 文件执行任何操作，就使用此技能。包括从 PDF 读取或提取文本、表格、将多个 PDF 合并为一个、拆分 PDF、旋转页面、添加水印、创建新 PDF、填写 PDF 表单、加密/解密 PDF、提取图像以及对扫描的 PDF 进行 OCR 使其可搜索。如果用户提到 .pdf 文件或要求生成 .pdf 文件，请使用此技能。

// 条款 --- 有没有都行
license: 专有。完整条款见 LICENSE.txt

// 内容：就是下面的全文。告诉Skill，如果要操作PDF应该怎么办？无需阅读
# PDF 处理指南

## 概述

本指南涵盖了使用 Python 库和命令行工具进行的基本 PDF 处理操作。有关高级功能、JavaScript 库和详细示例，请参阅 REFERENCE.md。如果需要填写 PDF 表单，请阅读 FORMS.md 并遵循其说明。

## 快速开始

```python
from pypdf import PdfReader, PdfWriter

# 读取 PDF
reader = PdfReader("document.pdf")
print(f"页数: {len(reader.pages)}")

# 提取文本
text = ""
for page in reader.pages:
    text += page.extract_text()
...
未完全复制过来，想要看完整的同学可以看pdf文件夹里面的SKILL.md
````

### Skill的执行原理（了解）

Skill是**按需加载**的，也叫做**懒加载**。不会把所有内容都加载到上下文中交给大模型。

会采取以下步骤：

- 把所有skill的**name**和**description**加载到上下文
- 由大模型判断，完成当前的任务需要哪个skill
- 读取skill全文
- 按照skill的提示进行操作

以上是Skill最基本的执行流程

**好处：**节约token，而且可以把一些经验，踩过的坑都写在skill中，提高以后一次性成功的概率。

但是，你觉得这就够了吗？不，还没有！

### Skill的完全体

#### Skill的问题

当`skill.md`的内容非常多，为了节约token，我们还可以进一步的抽取。把每一步都独立出来。

**比如：**

做饭的完整流程，有以下步骤：

买菜 --> 洗菜 --> 切菜 --> 调酱料 --> 炒菜 --> 摆盘

每一步都有很多的注意点，如果把每一步的注意点都放在一个`skill.md`里面也行，但是内容太多。

而且如果我只关心炒菜，其他步骤不关心，把所有的内容都放在`skill.md`里面，也会浪费token。

此时，我就可以把每一步的注意点单独抽取出来，`Skill.md`里面只罗列整体的流程，每一步的细节放到单独的文件夹里面。

这就需要我们学习Skill的完全体。

#### Skill的组成

一个最简单的skill里面只有只有skill.md文件，比如：`frontend-design`，但是这不是Skill的完全体。

完整的skill里面可以包含了以下内容：

- Skill.md：主要的核心流程
- references：参考文档
- scripts：利用代码使用一些工具
- assets：资源/图片

**每一个模块的作用：**

我们做一件事情，会有1234步骤，其中每一步都有具体的参考文献。

我们就可以这么办：

1. 把核心流程1234步写在`Skill.md`当中
2. 每一步的参考文件写在references当中，用到哪一步就会读取这一步的全部内容
3. 用到的工具写在scripts当中，scripts里面代码不会读取，直接运行
4. 用到的图片，视频等资源，写在assets当中

**好处：**

更加精细化，我现在做第一步，我只看第一步的参考文档，其他文档不看，节约token

**举例：**

做饭的完整流程，有以下步骤：

买菜 --> 洗菜 --> 切菜 --> 调酱料 --> 炒菜 --> 摆盘

每一步都有很多的注意点，如果把每一步的注意点都放在skill.md里面也行，但是内容太多，而且如果现在我只关心炒菜，其他步骤我不关心，把所有的内容都放在skill.md里面，也会浪费token。

处理方案：

- **每一步的注意点：**单独抽取出来，放在references里面，关心什么步骤，就找哪个文件
- **做饭用到的工具：**锅、碗、瓢、盆等，放在scripts文件夹中
- **用到的素材：**成品菜的摆盘示意图等，放在assets文件夹中

所以，完整体的`skill.md`就像是一个目录一样，包含了整体的流程。

每一步的实现步骤放在references当中，用到的工具放在scripts中，用到的图片放在assets当中。

这么做的目的只有一个：节约token。

当然，如果事情比较简单，内容比较少，也不用那么复杂，只使用最简单的`skill.md`就可以。

**课堂提问：**

Skill就是提示词，这句话对吗？

不全面，最简单的Skill，就是一个结构性的提示词

但是完整体的Skill就是一个技能包，包含了使用说明手册，工具，资源等内容

### Skill的下载和安装

#### 下载skill

在今天的资料中也准备了各种skill，下面的地址中也有很多很好用的skill

- anthropic官方仓库：https://github.com/anthropics/skills
- Skills社群网站：https://skillsmp.com/zh
- 优秀开源集合：https://github.com/ComposioHQ/awesome-claude-skills
- 精选skills库：https://github.com/JackyST0/awesome-agent-skills
- 视频制作skill：https://github.com/remotion-dev/skills
- youtube视频剪辑skill：https://github.com/op7418/Youtube-clipper-skill
- 大师帮你创建skill的skill：https://github.com/GBBOSS/skill-from-masters
- notebookLM skill：https://github.com/PleasePrompto/notebooklm-skill
- markdown发布到X skill：https://github.com/wshuyi/x-article-publisher-skill
- AI视频产品 Vidu Skills：https://www.vidu.cn/
- agent-skills.md包含 6000 多个好用的实用技能：https://agent-skills.md/
- Skillstore：https://skillstore.io/zh-hans
- Reddit 社区推荐的技能合集：https://www.skillsdirectory.com/
- agentskills.me：https://agentskills.me/
- Vercel 官方仓库：https://github.com/vercel-labs/agent-skills
- 开发者 Antfu 维护的技能库：https://github.com/antfu/skills
- skill收藏库：https://github.com/ZhanlinCui/Ultimate-Agent-Skills-Collection
- skillsbot：https://www.skillsbot.cn/

#### 安装skill

因为skill就是一个文本文件，所以无需安装，只要粘贴到固定的地方即可

##### 全局安装

**好处：**所有的项目都可以使用

**操作步骤：**

1. 找到路径：`C:\Users\自己电脑用户名\.claude`，在该路径下新建文件夹：skills

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ODgxNTRlYzEwNTRiNmJlMmRhZGI3ZWQwOWQ2NDA5ZjJfYzBnRmRMeVVKWHNYVmdBRHF0NjFTSWhPRTREd0xFVXhfVG9rZW46RjUyOGJnRUZib05HbFZ4eUFQSWNaQ3pPbnVnXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

2. 把资料里面`skills文件夹`中所有的内容直接粘贴进去即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=M2FlOGYzZmE0MTA5NzIwMmEwMTkyNjU2YzU1MjAyYTdfVExSem5Ja1JJUW12WmFrVGR5Y2RLVGk5Sm5GN25GN2JfVG9rZW46SE1UTGIxNTIzb3dkMXV4ckdDbmNjdXhQblNlXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

3. 重新打开claudecode

      **问：**你现在拥有哪些skill？

##### 单独项目安装

如果有部分skill不想让所有的项目使用，只想让某一个单独的项目使用，可以采取本方法。

> 举例：视频生成，不是所有的项目都要视频生成，所以可以把他当做某个项目独立的skill。

1. 找到自己项目的路径：`C:\Users\awei\Desktop\test`，在项目文件夹中创建 `.claude`文件夹，在它下面创建`skills`文件夹
2. 把只想在本项目中的skill粘贴进来即可

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDYxYjQ1MGQzZWVjNzBjYTMwYmQ3NGZiYmYxOWRmYmNfYW9tR21TdGpEellYeE4wY3lONGxnRWt1UDBRU3o0NTlfVG9rZW46VE43R2JXU1BPb3MwUUF4b3FCMmNVMFhpbkFmXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

### 使用别人的Skill

#### 手动调用

直接使用提示词，告诉claudecode，你用哪个skill去做事情

举例：

AI在生成前端页面的时候，要追求美观性。

提示词：

```text
利用XXXskill，完成以下的事情：
帮我开发一个1024⼩程序开发，具体请参考下面的游戏规则说明，⽣成⼀个基于html+css+js的前端⻚⾯
游戏规则如下：
1. 游戏在⼀个4x4或5x5的⽹格上进⾏。你需要通过⽅向键或滑动屏幕，控制所有数字⽅块向同⼀⽅向移动。
2. 核⼼玩法：每次移动时，相邻且数字相同的⽅块会合并成⼀个新⽅块，其数字是两者之和（例如2和2合并成4，4和4合并成8）。
3. 随机⽣成：每次移动并合并后，会在空⽩的格⼦处随机⽣成⼀个新的数字（通常是1或2或4） 。
4. 获胜⽬标：游戏的最终⽬标就是通过不断合并，在⽹格中拼出⼀个数字为“1024”的⽅块
```

#### 自动调用

claudecode也会根据当前的任务自动的调用skill，此时skill的描述就至关重要了。

![](https://heuqqdmbyk.feishu.cn/space/api/box/stream/download/asynccode/?code=NDdkYzI5ZDZmZGYzN2E0OWY0NjBjM2U3MzM3ZTkyZTJfNFBPU3BaNWxYSFBxRmNwdEYwMGpSM3ZjdlNlcExpMExfVG9rZW46U014eGI4bTBwb2JVaW14UW0xY2NQeU5kbjZkXzE3OTE1ODk4Nzk6MTc5MTU5MzQ3OV9WNA&add_watermark=true&scene_type=CCM)

**需求：**

利用skill美化一下对话机器人项目，看自动触发了哪些skill，如果没有自动触发，可以手动触发一下：**frontend-design**

### 蒸馏自己的skill

我们平时经常会利用claudecode编写代码，如果有的业务非常复杂，刚开始的时候没想好，是通过跟claudecode反复的对话才操作成功的。

如果这个业务在以后可能会经常使用，我们就可以把解决的过程、成功的案例、踩过的坑等信息记录下来，变成一个Skill，方便以后复用。记录成功案例的过程专业叫做蒸馏Skill。

在day05的时候，我们会学习如何把Coze对接到我们自己的项目中，这个过程相对比较麻烦，需要多轮对话，还需要在coze官方网站找示例代码，到时候可以把这个技能蒸馏成一个skill，方便复用，现在我们先知道有蒸馏这个概念就可以了。

## 永久记忆

在以后入门我们要做一些大项目，大任务的时候，会遇到以下问题：

- 上下文太多，超出上限

      上下文太多，超出上限，我们一般会进行压缩，但是压缩太多会把一些核心的内容压缩没了。

- 任务较大，要好几天才能完成

      对话内容默认保存30天，第二天找回历史聊天对话会影响上下文的长度。

**解决方案：**

利用handoffplus + 自动记忆实现claudecode的永久记忆

**使用方式：**

一个模块开发完毕，直接使用handoff命令让claudecode总结

再次打开一个claudecode窗口时，让他恢复即可