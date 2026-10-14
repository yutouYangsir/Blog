# 以密钥登录服务器
## 生成密钥对
```
cmd里面输入
ssh-keygen -t rsa -b 4096 -C "toipload@163.com"
一路回车
```
![[Pasted image 20260814212421.png]]

![[Pasted image 20260814212120.png]]
这里面会出现两个文件，以pub结尾的为公钥
## 将公钥上传到服务器
 ```
 # 在服务器上
 cd /root/.ssh
 rz -be
 cat id_rsa.pub >> authorized_keys
 # 本地选中公钥
 ```

## 修改配置文件
```
vim /etc/ssh/sshd_config
```
![[Pasted image 20260814213817.png]]
```
sshd -t
systemctl restart sshd
```
## Xshell导入私钥
![[Pasted image 20260814220434.png]]
工具里面选择 **用户密钥管理者**
导入本地的私钥
## 新建会话选择密钥登录

# 禁用ssh远程登录
```
vim /etc/ssh/sshd_config.d

PermitRootLogin no
PasswordAuthtication no
:wq

sshd -t
systemctl reload sshd
```
# 验证
Xshell终端
```
ssh root@154.9.227.108
登陆不上

选择密钥后登陆成功
```