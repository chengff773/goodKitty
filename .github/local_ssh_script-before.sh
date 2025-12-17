#!/bin/bash
# 部署前的准备工作脚本
set -e # 遇到任何错误则退出，便于调试

echo "✅ 远程脚本开始执行..."
echo "当前目录: $(pwd)"
echo "当前用户: $(whoami)"
# 后续可以在这里添加实际的部署前命令，例如：
# cd /your/project/path
# git pull origin main
# npm install --production