#!/bin/bash
# Gitee Pages 部署脚本
# 构建 VuePress 站点并推送到 gh-pages 分支
#
# 使用方法：
#   chmod +x deploy.sh
#   ./deploy.sh
#
# 环境变量：
#   VUEPRESS_BASE - 站点基础路径（默认 /omni-docs/）

set -e

REPO_URL="git@gitee.com:omni-platform/omni-docs.git"
BASE_PATH="${VUEPRESS_BASE:-/omni-docs/}"

echo "=== Omni Docs 部署脚本 ==="
echo "目标仓库: $REPO_URL"
echo "基础路径: $BASE_PATH"

# 1. 构建
echo ""
echo "=== 1. 构建站点 ==="
VUEPRESS_BASE="$BASE_PATH" pnpm build

# 2. 创建 gh-pages 分支内容
echo ""
echo "=== 2. 准备 gh-pages 分支 ==="
BUILD_SRC="docs/.vuepress/dist"
BUILD_DIR=$(mktemp -d)
cp -r "$BUILD_SRC"/* "$BUILD_DIR/"
cd "$BUILD_DIR"

git init
git checkout --orphan gh-pages
git add -A
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# 3. 推送
echo ""
echo "=== 3. 推送到远程 gh-pages ==="
git remote add origin "$REPO_URL"
git push -f origin gh-pages

# 4. 清理
cd -
rm -rf "$BUILD_DIR"

echo ""
echo "=== 部署完成 ==="
echo "请到 Gitee Pages 设置中配置："
echo "  部署分支: gh-pages"
echo "  部署目录: /（根目录）"
echo "  自定义域名: （可选）"
echo ""
echo "  访问地址: https://omni-platform.gitee.io/omni-docs/"
