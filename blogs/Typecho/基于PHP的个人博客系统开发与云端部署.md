# 在雨云平台租云服务器和域名
## xshell连接云服务器
# 搭建LNMP环境
## Linux
```
cat /etc/os-release    #查看Linux版本信息
```
## Nginx
```
yum -y install nginx    #下载nginx
dnf info nginx          #查看nginx版本
systemctl start nginx   #启动nginx服务
cd /usr/share/nginx/html #进入nginx默认index.html所处目录
```
## MySQL
### 安装MySQL
Mysql下载网址 [MySQL :: Download MySQL Community Server (Archived Versions)](https://downloads.mysql.com/archives/community/)

![[Pasted image 20260809164609.png]]
![[Pasted image 20260809165139.png]]
```
cd /usr/local/src  #进入存放源码包或第三方软件安装包的规范位置
yum -y install lrzsz
```
把下载好的五个安装包拖进Xshell
![[Pasted image 20260809165159.png]]
```
dnf -y install ./*.rpm  # 使用 DNF 包管理器，自动确认安装当前目录下所有以 `.rpm` 结尾的软件包。
mysql --version  # 安装好之后查看mysql版本信息
mysql  Ver 9.7.1 for Linux on x86_64 (MySQL Community Server - GPL)
```
### 启动MySQL
```
# 启动 MySQL 服务
systemctl start mysqld

# 设置开机自启（这样服务器重启后 MySQL 会自动运行）
systemctl enable mysqld

# 查看服务状态，确认是 active (running)
systemctl status mysqld

[root@RainYun-oGnbmR5L src]# systemctl status mysqld
● mysqld.service - MySQL Server
     Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; >
     Active: active (running) since Sun 2026-08-09 17:07:29 CST; 24s a>
       Docs: man:mysqld(8)
             http://dev.mysql.com/doc/refman/en/using-systemd.html
    Process: 232229 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exi>
   Main PID: 232292 (mysqld)
     Status: "Server is operational"
      Tasks: 36 (limit: 11084)
     Memory: 442.9M
        CPU: 2.667s
     CGroup: /system.slice/mysqld.service
             └─232292 /usr/sbin/mysqld

Aug 09 17:07:25 RainYun-oGnbmR5L systemd[1]: Starting MySQL Server...
Aug 09 17:07:29 RainYun-oGnbmR5L systemd[1]: Started MySQL Server.
```
### 登录MySQL
```
# MySQL启动后，会在日志文件里生成一个临时密码
grep 'temporary password' /var/log/mysqld.log

2026-08-09T09:07:26.927132Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: 0KOJd:yEZpuM

mysql -uroot -p
Enter password:        #输入0KOJd:yEZpuM

# 修改密码为Toipload@163.com
ALTER USER 'root'@'localhost' IDENTIFIED BY 'Toipload@163.com';
FLUSH PRIVILEGES;
```
## PHP
```
# 这个命令会安装 PHP 核心和连接 MySQL 数据库等常用扩展 
dnf install php php-mysqlnd php-gd php-xml php-mbstring -y

systemctl start php-fpm
systemctl enable php-fpm
```

### 修改nginx配置
编辑你的 Nginx 站点配置文件（通常是 `/etc/nginx/nginx.conf` 或 `/etc/nginx/conf.d/` 下的文件），在 `server` 块中添加以下 `location` 规则，让 Nginx 知道如何将 PHP 请求转发给 PHP-FPM：
```
location ~ \.php$ {
    try_files $uri =404;
    fastcgi_pass unix:/run/php-fpm/www.sock;  # 指定 PHP-FPM 的 socket 文件
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    include fastcgi_params;
}
```
重启nginx
```
# 测试有无语法错误
nginx -t
# 重启nginx服务
systemctl restart nginx
```
### 验证
```
cd /usr/share/nginx/html
rm -f index.*
touch index.php
vim index.php
```
在index.php中写入一个探针
```
<?php
phpinfo()
?>
```
在浏览器中打开云服务器ip地址
![[Pasted image 20260809175154.png]]






# Typecho
## 下载Typecho
https://github.com/typecho/typecho/releases/tag/v1.3.0
在这里下载typecho压缩包
```
cd /usr/share/nginx/html
# 通过lrzsz将压缩包拖到Xshell中

# 安装unzip解压命令
yum -y install unzip
# 解压
unzip typecho.zip
```
## 初始化
在浏览器中打开IP地址
![[Pasted image 20260809184233.png]]
这里说明usr/uploads目录权限不足
```
chmod 777 usr/uploads
```
![[Pasted image 20260809184444.png]]
```
mysql -uroot -p
Enter password: Toipload@163.com
mysql> create database typecho;
```
![[Pasted image 20260809184733.png]]
```
touch config.inc.php
vim config.inc.php
# 将复制的内容粘贴进去
:wq 
```
![[Pasted image 20260809185019.png]]
![[Pasted image 20260809185032.png]]

# 域名绑定
## 域名解析
在开始配置前，需要先在域名注册商的管理后台，将域名通过 **A记录** 解析到服务器的公网IP，确保外网能访问到你的服务器
![[Pasted image 20260810063312.png]]

## 修改配置
```
cd /etc/nginx/conf.d
touch blog.conf
vim blog.com
```
```
server {
    listen 80;
    # 这里填写你的域名，支持空格分隔多个域名[citation:2][citation:4]
    server_name blog.yang.ipload.cn; 

    # 网站文件存放的根目录[citation:2][citation:3]
    root /var/www/blog.yang.com; 

    # 默认首页文件[citation:2][citation:11]
    index index.html index.htm; 

    location / {
        try_files $uri $uri/ =404;
    }
}
```
### 错误排查
此时打开网站后报错403
![[Pasted image 20260810070837.png]]
域名解析没有问题
```
# 给权限
chown -R nginx:nginx /var/www/blog.yang.com
```
依然403
```
# 查看错误日志
tail -f /var/log/nginx/error.log

2026/08/10 06:52:04 [error] 242233#242233: *650 directory index of "/var/www/blog.yang.com/" is forbidden, client: 175.153.169.120, server: blog.yang.ipload.cn, request: "GET / HTTP/1.1", host: "154.9.227.108"
2026/08/10 06:52:05 [error] 242233#242233: *650 directory index of "/var/www/blog.yang.com/" is forbidden, client: 175.153.169.120, server: blog.yang.ipload.cn, request: "GET / HTTP/1.1", host: "154.9.227.108"
```
错误信息 `directory index of "/var/www/blog.yang.com/" is forbidden` 的意思是：Nginx 试图访问这个目录，但目录里**没有**配置中指定的默认首页文件（比如 `index.html` 或 `index.php`），同时 Nginx 又不允许列出目录内容，所以就报 `403 Forbidden` 了。
因为默认首页文件为php，而我们原本的配置文件里没有写
```
cd /etc/nginx/conf.d
vim blog.conf 

server {
    listen 80;
    # 这里填写你的域名，支持空格分隔多个域名[citation:2][citation:4]
    server_name blog.yang.ipload.cn; 

    # 网站文件存放的根目录[citation:2][citation:3]
    root /var/www/blog.yang.com; 

    # 默认首页文件[citation:2][citation:11]
    index index.html index.php index.htm; 

    location / {
        try_files $uri $uri/ =404;
    }
}

nginx -t
systemctl reload nginx
```
再次打开后报错502
![[Pasted image 20260810070233.png]]
```
tail -f /var/log/nginx/error.log

2026/08/10 06:52:04 [error] 242233#242233: *650 directory index of "/var/www/blog.yang.com/" is forbidden, client: 175.153.169.120, server: blog.yang.ipload.cn, request: "GET / HTTP/1.1", host: "154.9.227.108"
2026/08/10 06:52:05 [error] 242233#242233: *650 directory index of "/var/www/blog.yang.com/" is forbidden, client: 175.153.169.120, server: blog.yang.ipload.cn, request: "GET / HTTP/1.1", host: "154.9.227.108"
2026/08/10 06:53:52 [notice] 242278#242278: signal process started
```
看到最新的日志里有 `signal process started`，说明刚才执行了 `systemctl reload nginx`，配置已经重载成功了。

但核心问题还在：**目录 `/var/www/blog.yang.com/` 里没有首页文件**。

问题出在 **Nginx 没有配置 PHP 解析**，所以它不认识 `index.php` 文件，还是试图找 `index.html`

```
vim blog.conf

server {
    listen 80;
    server_name blog.yang.ipload.cn ;
    root /var/www/blog.yang.com/;
    index index.php index.html index.htm;

    location / {
        try_files $uri $uri/ /index.php?$args;
    }

    location ~ \.php$ {
        # fastcgi_pass 127.0.0.1:9000;
        # 如果用 PHP-FPM socket，用下面这行（取消注释，注释掉上面那行）
        fastcgi_pass unix:/run/php-fpm/www.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.ht {
        deny all;
    }
}

:wq

nginx -t
systemctl reload nginx
```
在浏览器中输入域名，打开成功
![[Pasted image 20260810113048.png]]