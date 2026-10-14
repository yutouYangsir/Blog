# 存档
首先呢，先创建一个文件夹，在里面添加`index.html`和`README.md`
![[imgs/Pasted image 20261008200039.png]]
两个文件的内容如下
![[imgs/Pasted image 20261009070755.png]]


## git init
初始化文件夹，这样这个文件夹就可以使用git来进行管理了
执行这个后，会创建一个隐藏的文件夹`.git`

## git status
这是一个非常常用的命令,他的作用就是用来查看当前Git仓库的状态
![[imgs/Pasted image 20261008200303.png]]
```
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md
        index.html
# 说明git发现了我们这两个文件,但是并没有开始跟踪这两个文件的内容,更没有把这两个文件的内容存成对应的版本

```
## 讲解
当使用git来进行管理的时候
我们的这个文件夹就会被分为三个部分
- 工作区
- 暂存区
- 提交历史
比如说我想要把index.html保存成一个版本,不管README.md
![[imgs/Pasted image 20261008201642.png]]通过**git commit**
我们就完成了一次存档
以后即使我们把index.html改坏了,甚至不小心删掉了
我们也可以把他从commit恢复过来
## git add
通过git add可以将改动进入暂存区\
![[imgs/Pasted image 20261008202238.png]]
```
Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   index.html
# 这里的意思就是说这个文件已经进入到暂存区了
```
## git commit
在git commit之前,我们要设置好自己的姓名和邮箱
git每提交一次commit,都会记录下对应提交人的名字和邮箱
所以我们需要提前设置好
![[imgs/Pasted image 20261008202654.png]]

![[imgs/Pasted image 20261008202826.png]]
```
git commit -m "添加待办页面"

# 这里的-m就是message的意思,也就是给这一次的提交附上一段说明
```

## git log
git log就是用来查看commit历史的
![[imgs/Pasted image 20261008203038.png]]```
```
ba7aa330f99d832e5a837d12a7a208fd111d6cea
这个东西就是这次commit的编号,每一次commit都会有一个特别的编号
```

![[imgs/Pasted image 20261008203746.png]]
当我们再次查看时,发现README.md还在,看不见index.html
意思是index.html现在的内容和刚才的commit一致,没有什么新的内容需要提示
所以不需要在这里显示出来

ok,我们再把README.md也传上去吧

以后如果继续修改项目,每完成一个阶段性的工作,我们都可以重复刚才的这套git add 和git commit的流程
把每个阶段性的成果,都记录到提交历史里面
这样的话,git就会一步一步把整个项目的历史保存下来
后面的无论是回溯还是回滚都有据可查
我们再也不怕把项目改坏啦

# 回滚
如果说我们后面发现,代码改着改着出问题,想要回滚到之前的commit,具体应该怎么做呢?
这需要取决于这份修改到底是走到了哪一步
- 第一种可能性：改动只在工作区，也就是说，我们改完了文件之后，还没有做任何与Git相关的操作
- 第二种可能性：改动已经进入了暂存区，也就是说，改完了这个文件之后，我们还执行了git add 命令，把他放到了暂存区里面
- 第三种可能性：改动已经提交到commit，在这种情况下，我们不仅把改动放到了暂存区，还通过git commit 命令，提交了一个新的commit
## 改动只在工作区
比如说我的index.html改错了
![[imgs/Pasted image 20261009070851.png]]

当我们再次执行git status命令
![[imgs/Pasted image 20261009071025.png]]
可以看出,git status列出了index.html,前面标着modified
说明这个文件已经被修改过了
```
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")

# Changes not staged for commit
# git里面,把改动放进暂存区的这个行为就叫做stage
# 所以,已经放进暂存区的改动就叫做 staged, 还没有放进暂存区的改动叫做 unstaged, 或者 not staged
# 所以这句话的意思就是,这些改动还没有放进暂存区,因此还没有准备好被提交一个commit

# 所以,git status, 可以得知,git检测到index.html被修改了,只不过这些修改内容还只在工作区里面
# 但是git status 只能看到哪些文件被修改,无法看到具体的修改内容
# 如果想要看具体的修改内容,可以执行git diff命令
```
### git diff
![[imgs/Pasted image 20261009071757.png]]
```
按j可以往下一行移动
k可以往上一行移动
f往下移动一整页
b往上移动一整页
q退出
```
### git restore
这个命令可以撤销工作区的改动
![[imgs/Pasted image 20261009072218.png]]
可以看到之前那句话不见了,回滚成功

![[imgs/Pasted image 20261009072302.png]]
```
working tree就是工作区的意思
有时候也叫 working directory
```
## 改动进入了暂存区
如果说改动进入了暂存区,那么我们就需要把他从暂存区里面去掉,再从工作区里面去掉
![[imgs/Pasted image 20261009072755.png]]
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\yutouyang\Desktop\我的测试> git diff
diff --git a/index.html b/index.html
index dee3f4c..2a15795 100644
--- a/index.html
+++ b/index.html
@@ -6,6 +6,6 @@
     <title>测试</title>
 </head>
 <body>
-    <h1>这只是一个测试</h1>
+    <h1>Sorry 我又改错了</h1>
 </body>
:
```
以上是在工作区的改动
接下来进入暂存区
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git add .\index.html       
PS C:\Users\yutouyang\Desktop\我的测试> git status 
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

```
### git restore --staged
```
(use "git restore --staged <file>..." to unstage)
# stage就是把改动放进暂存区
# unstage就是把改动从暂存区去掉
```
所以通过这个命令,就可以把改动从暂存区里面去掉
![[imgs/Pasted image 20261009073647.png]]

然后再执行git restore才能把改动从工作区撤销
![[imgs/Pasted image 20261009073759.png]]

### 总结
我们需要两个命令来进行撤销已经进入了暂存区的改动
git restore --staged和git restore

## 改动已提交为commit
如果改动已经提交为commit
一个非常直接的办法就是把这个commit直接去掉
然后再到暂存区和工作区逐步撤销
就能回滚到改动前的状态了
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git diff
+++ b/index.html
@@ -6,6 +6,6 @@
     <title>测试</title>
 </head>
 <body>
-    <h1>这只是一个测试</h1>
+    <h1>天呐我居然第三次改错了</h1>
 </body>
PS C:\Users\yutouyang\Desktop\我的测试> 
PS C:\Users\yutouyang\Desktop\我的测试> git add .\index.html
PS C:\Users\yutouyang\Desktop\我的测试> git status 
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

PS C:\Users\yutouyang\Desktop\我的测试> git commit -m "需要被撤销"
[master fcdd78f] 需要被撤销
 1 file changed, 1 insertion(+), 1 deletion(-)
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch master
nothing to commit, working tree clean
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit fcdd78fae0403f215c4b1b8788643565ac1c4308 (HEAD -> master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 07:44:33 2026 +0800

    需要被撤销

commit 58515bf1e0115968fac0324a0171663e95d5e10d
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明

commit ba7aa330f99d832e5a837d12a7a208fd111d6cea
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:28:06 2026 +0800

    添加待办页面
```
### git reset --hard HEAD~1

```
commit fcdd78fae0403f215c4b1b8788643565ac1c4308 (HEAD -> master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 07:44:33 2026 +0800

    需要被撤销

commit 58515bf1e0115968fac0324a0171663e95d5e10d
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明

commit ba7aa330f99d832e5a837d12a7a208fd111d6cea
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:28:06 2026 +0800

    添加待办页面
```

![[imgs/Pasted image 20261009075102.png]]

git reset --hard HEAD~1
reset就是重置的意思
HEAD~1就是倒数第二次提交
\--hard的意思就是工作区、暂存区、提交历史三个部分一起回滚，全部回到之前的状态
所以执行这个命令就相当于把HEAD的位置移到现在HEAD~1的位置，其他的依次下移

```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git reset --hard HEAD~1
HEAD is now at 58515bf 添加项目说明
PS C:\Users\yutouyang\Desktop\我的测试> git log 
commit 58515bf1e0115968fac0324a0171663e95d5e10d (HEAD -> master)
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明

commit ba7aa330f99d832e5a837d12a7a208fd111d6cea
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:28:06 2026 +0800

    添加待办页面
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch master
nothing to commit, working tree clean
```

### 提醒
--hard干的很彻底, 如果你的工作区和暂存区还有别的改动, 他也会不管那么多, 全部回滚回去, 所以小心点哦
### git reset的三种模式
- \--hard : 工作区,暂存区,提交历史全部回滚
- \--mixed : 默认模式, 工作区保留, 暂存区和提交历史回滚
- \--soft : 工作区和暂存区保留, 只回滚提交历史 

### 创建一个新的commit来回滚
比如说现在是状态2,之前是状态1
我们需要先把工作区里面的内容回滚到之前的状态,暂存区和提交历史保持不变
实际上这是一个状态3,不过这个状态3和状态1长得一模一样
然后再把状态3添加进暂存区,再从暂存区提交到提交历史
这样子的话,提交历史中就会有123,其中1和3完全一样
这样子的好处是,保留了2的状态,如果以后需要基于2做改动的话,我们可以回来

```
PS C:\Users\yutouyang\Desktop\我的测试> git add .\index.html
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   index.html

PS C:\Users\yutouyang\Desktop\我的测试> git commit -m "新增段落a"
[master e66b5ce] 新增段落a
 1 file changed, 1 insertion(+)
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit e66b5ce96748d8581338f3af2524ffad9804fb11 (HEAD -> master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 08:25:19 2026 +0800

    新增段落a

commit 58515bf1e0115968fac0324a0171663e95d5e10d
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明
```
### git revert HEAD
通过这一行命令,就可以达到刚刚说的那么多内容
```powershell
PS C:\Users\yutouyang\Desktop\我的测试>  git revert HEAD
[master 3741764] Revert "新增段落a"
 1 file changed, 1 deletion(-)
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit 3741764ababfc1bbd1efb64c650766a9969cc66e (HEAD -> master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 08:31:14 2026 +0800

    Revert "新增段落a"
    
    This reverts commit e66b5ce96748d8581338f3af2524ffad9804fb11.

commit e66b5ce96748d8581338f3af2524ffad9804fb11
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 08:25:19 2026 +0800

    新增段落a

commit 58515bf1e0115968fac0324a0171663e95d5e10d
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明

commit ba7aa330f99d832e5a837d12a7a208fd111d6cea
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:28:06 2026 +0800

    添加待办页面
```
# 使用.gitignore忽略文件
放在项目文件夹里的文件并不是都需要被提交到commit

比如我创建了一个不需要被提交到commit的note.txt
![[imgs/Pasted image 20261009111858.png]]

![[imgs/Pasted image 20261009111949.png]]
有没有办法告诉git，以后不需要再提示这个文件呢
因为这只是我个人的学习笔记，跟项目没有直接关联

我们可以直接创建一个.gitignore文件
然后在里面写上需要被忽略的文件名
![[imgs/Pasted image 20261009112317.png]]
![[imgs/Pasted image 20261009112328.png]]
凡是写在.gitignore里面的文件,都会被git忽略

# 分支
![[imgs/Pasted image 20261009112840.png]]这里的这个master就是一个分支的名字

我们在实际开发的时候,可能需要添加新的功能
然而在新功能的开发过程中, 又需要保持项目整体的稳定性
所以我们可以创建一个新的分支
在这个分支上开发新的功能
待新的功能在这个分支上开发完成
我们再把master分支和这里合并
这样就能够实现在开发过程中 , 既不影响原先代码的运行稳定, 又能完成新功能的开发

## 创建分支和切换分支
### git branch
使用git branch+分支名
- 可以创建分支
使用 git branch
- 可以查看分支
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git branch test01
PS C:\Users\yutouyang\Desktop\我的测试> git branch       
* master
  test01
```
master前面的这个`*`就表示我们当前所在的分支
### git switch
使用git switch可以切换分支
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git switch test01
Switched to branch 'test01'
PS C:\Users\yutouyang\Desktop\我的测试> git branch
  master
* test01
```
### git switch -c
这条命令是上面两条命令的总和
git switch -c +分支名
先创建一条分支, 然后立即切过去
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit 2a76a3bcc87dd892afe813623900683ac631d0d4 (HEAD -> test01, master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:26:54 2026 +0800

    .gitignore

commit 3741764ababfc1bbd1efb64c650766a9969cc66e
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 08:31:14 2026 +0800

    Revert "新增段落a"
    
    This reverts commit e66b5ce96748d8581338f3af2524ffad9804fb11.

commit e66b5ce96748d8581338f3af2524ffad9804fb11
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 08:25:19 2026 +0800

    新增段落a

commit 58515bf1e0115968fac0324a0171663e95d5e10d
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:41:03 2026 +0800

    添加项目说明

commit ba7aa330f99d832e5a837d12a7a208fd111d6cea
Author: Yang <toipload@163.com>
Date:   Thu Oct 8 20:28:06 2026 +0800

    添加待办页面
```

### 在分支上开发新功能
好的那么现在呢, 我要开始修改我的index.html
分三次commit为他添加三个h2标题

```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git status
On branch test01
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.html

no changes added to commit (use "git add" and/or "git commit -a")
PS C:\Users\yutouyang\Desktop\我的测试> git diff
diff --git a/index.html b/index.html
index dee3f4c..0b389dd 100644
--- a/index.html
+++ b/index.html
@@ -7,5 +7,6 @@
 </head>
 <body>
     <h1>这只是一个测试</h1>
+    <h2>这是第一个二级标题</h2>
 </body>
 </html>
\ No newline at end of file
```
好的,现在已经添加好第一个了
现在把他提交上去
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git add .\index.html
PS C:\Users\yutouyang\Desktop\我的测试> git commit -m "第一次添加二级标题"
[test01 03d799a] 第一次添加二级标题
 1 file changed, 1 insertion(+)
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit 03d799afa64ccde45949995b79254637339cfb06 (HEAD -> test01)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:51:42 2026 +0800

    第一次添加二级标题

commit 2a76a3bcc87dd892afe813623900683ac631d0d4 (master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:26:54 2026 +0800

    .gitignore
```

在这里我们可以看到test01已经和master分家了
![[imgs/Pasted image 20261009115313.png]]

接下来完成剩下的两次

```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git log
commit 58d8e716633a1a939ea166fd3747c4f14155c060 (HEAD -> test01)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:55:50 2026 +0800

    第三次添加二级标题

commit d312d8d5a30bee02f4a386a6e643aac622f8fe55
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:54:53 2026 +0800

    第二次添加二级标题

commit 03d799afa64ccde45949995b79254637339cfb06
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:51:42 2026 +0800

    第一次添加二级标题

commit 2a76a3bcc87dd892afe813623900683ac631d0d4 (master)
Author: Yang <toipload@163.com>
Date:   Fri Oct 9 11:26:54 2026 +0800

    .gitignore
```
![[imgs/Pasted image 20261009120409.png]]
### git log --oneline
刚刚那么看多不直观呀
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git log --oneline 
58d8e71 (HEAD -> test01) 第三次添加二级标题
d312d8d 第二次添加二级标题
03d799a 第一次添加二级标题
2a76a3b (master) .gitignore
3741764 Revert "新增段落a"
e66b5ce 新增段落a
58515bf 添加项目说明
ba7aa33 添加待办页面
```
在后面加上\--oneline
就只会显示commit编号前几位和提交说明
作者和时间就不显示了

当我们切换回master,是看不到后面添加的三个二级标题的,因为他们只属于test01分支
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git switch master
Switched to branch 'master'
PS C:\Users\yutouyang\Desktop\我的测试> git log --oneline
2a76a3b (HEAD -> master) .gitignore
3741764 Revert "新增段落a"
e66b5ce 新增段落a
58515bf 添加项目说明
ba7aa33 添加待办页面
```
而且我们的代码也回到了原来的样子
![[imgs/Pasted image 20261009120329.png]]

## 合并分支
我现在三个二级标题已经创建好了,是时候把他们合并回master分支了
我们所说的合并是把别的分支合并到当前所在的分支
所以我们需要在master分支下执行
我们需要先确保我们是在master分支下
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git switch master
Switched to branch 'master'
PS C:\Users\yutouyang\Desktop\我的测试> git branch
* master
  test01
```
### git merge
使用这条命令加分支名,就可以把别的分支合并到当前所在的分支啦
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git merge test01
Updating 2a76a3b..58d8e71
Fast-forward
 index.html | 3 +++
 1 file changed, 3 insertions(+)
PS C:\Users\yutouyang\Desktop\我的测试> git log --oneline
58d8e71 (HEAD -> master, test01) 第三次添加二级标题
d312d8d 第二次添加二级标题
03d799a 第一次添加二级标题
2a76a3b .gitignore
3741764 Revert "新增段落a"
e66b5ce 新增段落a
58515bf 添加项目说明
ba7aa33 添加待办页面
```

![[imgs/Pasted image 20261009120903.png]]


## 删除分支
### git branch -d
使用这条命令加分支名
可以删掉对应的分支
```powershell
PS C:\Users\yutouyang\Desktop\我的测试> git branch -d test01
Deleted branch test01 (was 58d8e71).
PS C:\Users\yutouyang\Desktop\我的测试> git branch
* master
PS C:\Users\yutouyang\Desktop\我的测试> git log --oneline
58d8e71 (HEAD -> master) 第三次添加二级标题
d312d8d 第二次添加二级标题
03d799a 第一次添加二级标题
2a76a3b .gitignore
3741764 Revert "新增段落a"
e66b5ce 新增段落a
58515bf 添加项目说明
ba7aa33 添加待办页面
```
## 合并冲突
 