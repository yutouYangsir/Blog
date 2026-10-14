# 部署Zabbix监控系统
## 创建Zabbix数据库
```
mysql -uroot -p
Enter password: Toipload@163.com

CREATE DATABASE zabbix CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
CREATE USER 'zabbix'@'localhost' IDENTIFIED BY 'Toipload@163.com';
GRANT ALL PRIVILEGES ON zabbix.* TO 'zabbix'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
## 安装Zabbix Server与前端
[Zabbix Official Repository](https://repo.zabbix.com/zabbix/7.0/rocky/9/x86_64/)
![[Pasted image 20260810135828.png]]
下载后
```
cd /tmp
# lrzsz拖进来

yum -y install zabbix-release-7.0-1.el9.noarch.rpm 

yum install -y zabbix-server-mysql zabbix-web-mysql zabbix-apache-conf zabbix-sql-scripts zabbix-selinux-policy zabbix-agent --nogpgcheck

```
## 初始化设置
### 数据库初始化
```
mysql -u root -p -e "SET GLOBAL log_bin_trust_function_creators = 1;"

zcat /usr/share/zabbix-sql-scripts/mysql/server.sql.gz | mysql -u zabbix -p zabbix
Enter password: Toipload@163.com

```
### 配置Zabbix Server
```
vim /etc/zabbix/zabbix_server.conf
找到并修改以下几行（去掉开头的 `#` 注释）：
DBHost=localhost
DBName=zabbix
DBUser=zabbix
DBPassword=Toipload163@163.com
```
### 配置PHP时区
```
vim /etc/php.ini
```
找到 `date.timezone`，修改为：
`date.timezone = Asia/Shanghai`
![[Pasted image 20260810142802.png]]

### 创建Zabbix Nginx配置文件
```
cd /etc/nginx/conf.d
vim zabbix.conf

server {
    listen 81;
    server_name _;

    root /usr/share/zabbix;
    index index.php index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/var/run/php-fpm/www.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    location ~ /(conf|include) {
        deny all;
        return 403;
    }

    location ~ /\.ht {
        deny all;
        return 403;
    }
}
:wq


重启服务
systemctl restart nginx php-fpm zabbix-server zabbix-agent
systemctl enable nginx php-fpm zabbix-server zabbix-agent
```
### 浏览器访问
![[Pasted image 20260810144111.png]]

## 报错处理
### 初始化错误
![[Pasted image 20260810144322.png]]
这是**Zabbix 安装前的环境检测页面**，3 项 PHP 参数不达标导致校验失败：

|参数名|当前值|Zabbix 要求值|问题说明|
|---|---|---|---|
|`post_max_size`|8M|≥16M|PHP 接收 POST 提交数据的最大容量太小，上传、提交表单会受限|
|`max_execution_time`|30|≥300|PHP 脚本最长允许运行秒数太短，复杂监控报表 / 任务会提前中断|
|`max_input_time`|60|≥300|PHP 解析接收请求数据的最长秒数太短，大数据量请求会超时|

其余参数（PHP 版本、内存限制、单文件上传大小）都是正常`OK`状态，只要修改这 3 个参数就能继续安装。

```
cd /etc
vim php.ini
# 找到下面三行改成对应数值
post_max_size = 16M
max_execution_time = 300
max_input_time = 300

```
重启服务生效
```
systemctl restart php-fpm 
systemctl restart nginx
```
![[Pasted image 20260810144949.png]]

![[Pasted image 20260810145225.png]]
默认账户Admin
密码zabbix
![[Pasted image 20260810145311.png]]

### 语言无法选择中文
![[Pasted image 20260811213336.png]]
```
# 安装 glibc 相关包

dnf install -y glibc glibc-common glibc-langpack-zh

# 安装 glibc-utils

dnf install -y glibc-gconv-extra glibc-utils

# 安装语言环境源文件
dnf install -y glibc-locale-source

# 生成中文语言环境
localedef -c -f UTF-8 -i zh_CN zh_CN.UTF-8

# 重载nginx服务
systemctl reload nginx
```
![[Pasted image 20260811214122.png]]![[Pasted image 20260811214131.png]]