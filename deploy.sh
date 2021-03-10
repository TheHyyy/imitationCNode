#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
# cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m '修改一些东西'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.g1ithub.io/<REPO>
# git push -f git@gitee.com:rainHou/cnode.git master:gh-pages
git push -f git@github.com:TheHyyy/imitationCNode.git master:gh-pages

cd -