步骤：

1.安装 git 然后打开 Git Bush

2.在本地创建 ssh key
  $ ssh-keygen -t rse -C "1178770858@qq.com"

3.在电脑上查找文件夹“.ssh” 复制 “id_rsa.pub”中的密钥

4.登录github官网 在官网上填写ssh keys（密钥）关联账号和电脑

5.$ git config --global user.name "your name"
  $ git config --global user.email "your_email@youremail.com"

6.在电脑上创建项目文件夹，文件夹的名字与github的库名相同，方便查找

7.在该文件夹中进行 鼠标右键 Git Bash Here

8.$ git init 检查是否成功

9.$ git remote add origin git@github.com:yourName/yourRepo.git

  git@github.com:yourName/yourRepo.git-->在官网上，点击右边的ssh即可获得

10.$ git remote -v 查看服务端仓库地址 同步到远程仓库

11.$ git add . 添加文件

12.$ git commit -m "代码提交信息"  提交项目内容

13.$ git push -u

14.$ git push origin master

15.$ git pull 多人协作解决冲突

16.$ git push 修改后的文件上传
