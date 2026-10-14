# 安装Docker
## 卸载旧版
## 配置docker的yum库

```
# 首先要安装一个yum工具
yum install -y yum-utils

# 安装完成后,执行命令,配置Docker的yum源
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
```
## 安装Docker
最后,执行命令,安装Docker
```
yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## 启动和校验
```
# 启动docker
systemctl start docker
# 停止docker
systemctl stop docker
# 重启docker
systemctl restart docker
# 设置开机自启
systemctl enable docker

# 执行docker ps命令,如果不报错,证明安装启动成功
docker ps
```
# Docker安装MySql
```
docker run -d   --name mysql   -p 3306:3306   -e TZ=Asia/Shanghai   -e MYSQL_ROOT_PASSWORD=123   mysql
```
## 镜像和容器
当我们利用Docker安装应用时, Docker会自动搜索并下载应用镜像。镜像不仅包含应用本身， 还包含应用运行所需要的环境、配置、系统函数库。Docker会在运行镜像时创建一个隔离环境，称为容器

镜像仓库：存储和管理镜像的平台，Docker官方维护了一个公共仓库：Docker Hub

## 命令解读
```
docker run -d  \ 
 --name mysql  \
 -p 3306:3306  \
 -e TZ=Asia/Shanghai  \
 -e MYSQL_ROOT_PASSWORD=123  \
 mysql
```
- docker run：创建并运行一个容器，-d是让容器在后台运行
- \--name mysql: 给容器起个名字，必须唯一
- -p 3306:3306：设置端口映射
- -e KEY=VALUE: 设置环境变量
- mysql: 指定运行的镜像的名字

# Docker基础
## 常见命令
Docker最常见的命令就是操作镜像、容器的命令，
详见官方文档：[docs.docker.com](https://docs.docker.com/)

- docker pull 获取镜像
- docker images 查看镜像
- docker rmi 删除镜像 
- docker build 构建镜像
- docker save 保存镜像文件
- docker load 加载镜像文件
- docker push 推到镜像仓库
- docker run 创建并运行容器
- docker stop 停止容器进程
- docker start 启动容器进程
- docker ps 查看当前容器的运行状态
- docker rm 删除容器
- docker logs 查看容器日志
- docker exec 进入容器内部
### 下载并运行nginx
```
# 拉取nginx镜像
docker pull nginx
# 创建并运行nginx容器
docker run -d --name nginx -p 80:80 nginx

[root@Rainyun ~]# docker run -d --name nginx -p 80:80 nginx
5266ece696d2659e59f9640193f319d86d78868b78fc9736050eb8e0454584d8
# 返回了一串数字


[root@Rainyun ~]# docker ps
 CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                                                    NAMES
5266ece696d2   nginx     "/docker-entrypoint.…"   2 minutes ago   Up 2 minutes   0.0.0.0:80->80/tcp, [::]:80->80/tcp                      nginx
58d71d625146   mysql     "docker-entrypoint.s…"   14 hours ago    Up 14 hours    0.0.0.0:3306->3306/tcp, [::]:3306->3306/tcp, 33060/tcp   mysql


# 查看nginx日志
docker logs nginx
```
![[imgs/Pasted image 20261013085446.png]]
可以直接访问到nginx
```
# 进入容器内部
docker exec -it nginx bash

-it 是指添加一个可输入的终端
nginx 是容器名
bash 是交互方式
```

## 数据卷
数据卷是一个虚拟目录，是容器内目录与宿主机目录之间映射的桥梁
![[imgs/Pasted image 20261013092947.png]]
创建的虚拟目录在宿主机的
```
/var/lib/docker/volumes
```
这个目录下
![[imgs/Pasted image 20261013093217.png]]

提示
- 在执行docker run 命令时,使用 -v 数据卷:容器内目录 可以完成数据卷挂载
- 当创建容器时, 如果挂在了数据卷且数据卷不存在,会自动创建数据卷
- 挂载数据卷的操作一定是要在创建容器的时候就执行,如果容器已经创建了就没招了
### 案例1-nginx容器部署静态资源
需求：
- 创建nginx容器，修改nginx容器内的html目录下的index.html文件，查看变化
- 将静态资源部署到nginx的html目录下

```
# 创建并运行容器，并挂载数据卷
docker run -d --name nginx -p 80:80 -v nginx-html:/usr/share/nginx/html nginx

# 查看数据卷是否创建成功
docker volume ls

# 进入数据卷
cd /var/lib/docker/volumes/nginx-html/_data
```
通过VS Code 进行编辑
![[imgs/Pasted image 20261013101222.png]]

访问80端口
![[imgs/Pasted image 20261013101302.png]]
### 案例2-mysql容器的数据挂载
需求：
- 查看mysql容器，判断是否有数据卷挂载
- 基于宿主机目录实现MySql数据目录、配置文件、初始化脚本的挂载（查阅官方镜像文档）
```
# 查看mysql的挂载情况
docker inspect mysql
```
`docker inspect mysql` 用来**查看名为 `mysql` 的容器（或镜像）的详细底层信息**，输出是 JSON 格式。
![[imgs/Pasted image 20261013104028.png]]
```
cd /var/lib/docker/888ab2..../_data
ls

发现确实有挂载
```
![[imgs/Pasted image 20261013120453.png]]
这个就是Mysql默认的匿名卷

提示:
- 在执行 docker run命令时, 使用 -v 本地目录:容器内目录 可以完成本地目录挂载
- 本地目录必须以'/'或者'./'开头, 会被识别为数据卷而非本地目录
	- -v mysql:/var/lib/msyql 会识别为一个数据卷叫mysql
	- -v ./mysql:/var/lib/mysql 会被识别为当前目录下的mysql目录
	
 
## 自定义镜像
## 网络