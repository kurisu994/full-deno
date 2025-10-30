#!/bin/bash
set -e

# 检查是否传入版本号参数
if [ $# -ne 1 ]; then
  echo "请传入版本号参数！例如: ./build.sh 1.0.0"
  exit 1
fi

# 配置参数
VERSION=$1
DOMAIN_NAME="app-loader"
USERNAME="kurisu003"
REGISTRY="docker.io/${USERNAME}"
ARCHITECTURES=(
  "linux/amd64"
  "linux/arm64"
)

# 将架构数组转换为逗号分隔的字符串
ARCH_STRING=$(IFS=,; echo "${ARCHITECTURES[*]}")

# 1. 拉取最新代码
echo "===== 拉取最新代码 ====="
git pull --rebase

# 2. 构建并推送多架构镜像
echo -e "\n===== 开始构建多架构镜像 ====="
TAG_VERSION="${REGISTRY}/${DOMAIN_NAME}:${VERSION}"
TAG_LATEST="${REGISTRY}/${DOMAIN_NAME}:latest"

echo "构建架构: ${ARCH_STRING}"
echo "版本号标签: ${TAG_VERSION}"
echo "Latest标签: ${TAG_LATEST}"

# 使用buildx构建所有架构并推送到远程仓库
docker buildx build \
  --platform "${ARCH_STRING}" \
  -t "${TAG_VERSION}" \
  -t "${TAG_LATEST}" \
  -f ./Dockerfile \
  . \
  --push

# 6. 验证推送结果
echo -e "\n===== 验证推送的多架构镜像 ====="
echo "查看 ${TAG_VERSION} 的架构信息："
docker buildx imagetools inspect "${TAG_VERSION}"

echo -e "\n===== 操作完成 ====="
echo "已成功推送多架构镜像："
echo "  - 版本号标签: ${TAG_VERSION}"
echo "  - Latest标签: ${TAG_LATEST}"
echo "支持的架构: ${ARCH_STRING}"