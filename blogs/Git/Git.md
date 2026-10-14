![[Pasted image 20260902173753.png]]
# 本地初始化Git仓库
```
# 初始化本地仓库，执行后会生成一个.git隐藏文件夹
git init

# 配置用户名和邮箱
git config user.name "yangsirgitee"
git config user.email "toipload@163.com"
```
# 将本地仓库与Gitee远程仓库关联
```
git remote add origin https://gitee.com/yangsirgitee/Mynotes.git
```
# 添加、提交并推送文件
```
# 1. 添加当前文件夹下所有文件到Git的“暂存区”
git add.

# 2. 将添加的文件提交到本地仓库，并附上说明信息
git commit -m "首次提交 Mynotes 笔记"

# 3. （关键）先拉取远程仓库，合并可能存在的差异
#    因为 Gitee 新建的仓库可能有默认文件，这一步可以避免冲突
git pull origin master --allow-unrelated-histories

# 4. 将本地仓库内容推送到 Gitee 远程仓库的 master 分支
git push -u origin master
```
![[Pasted image 20260902174901.png]]