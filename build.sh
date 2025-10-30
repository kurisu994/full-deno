#!/bin/bash
set -e  # 任何命令失败立即退出脚本

# 检查是否传入版本号参数
if [ $# -ne 1 ]; then
  echo "请传入版本号参数！例如: ./build.sh 1.0.0"
  exit 1
fi

# 配置参数
VERSION=$1
DOMAIN_NAME="app-loader"
USERNAME="kurisu003"
# 远程仓库地址（默认Docker Hub，如需其他仓库可修改，如：registry.example.com/kurisu003）
REGISTRY="docker.io/${USERNAME}"
# 要构建的所有架构（包含你指定的6种）
ARCHITECTURES=(
  "linux/amd64"
  "linux/arm64"
  "linux/arm/v7"
  "linux/arm/v6"
  "linux/s390x"
)

# 1. 拉取最新代码
echo "===== 拉取最新代码 ====="
git pull --rebase

# 2. 初始化QEMU模拟器（支持跨架构构建）
echo -e "\n===== 删除现有构建器 ====="
docker buildx rm multiarch-builder

echo -e "\n===== 初始化跨架构模拟器 ====="
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

# 3. 准备buildx构建器（支持多架构）
BUILDER_NAME="multiarch-builder"
echo -e "\n===== 准备构建器 ${BUILDER_NAME} ====="
if ! docker buildx inspect "${BUILDER_NAME}" &> /dev/null; then
  docker buildx create --name "${BUILDER_NAME}" --use
else
  docker buildx use "${BUILDER_NAME}"
fi
# 确保构建器启动
docker buildx inspect --bootstrap

# 4. 构建并推送多架构镜像（同时打版本号和latest标签）
echo -e "\n===== 开始构建并推送多架构镜像 ====="
# 定义镜像标签（远程仓库+名称+标签）
TAG_VERSION="${REGISTRY}/${DOMAIN_NAME}:${VERSION}"
TAG_LATEST="${REGISTRY}/${DOMAIN_NAME}:latest"

# 使用buildx构建所有架构并推送到远程仓库
docker buildx build \
  --platform "${ARCHITECTURES[*]}" \  # 指定所有架构（用空格分隔）
  -t "${TAG_VERSION}" \               # 版本号标签
  -t "${TAG_LATEST}" \                # latest标签
  -f ./Dockerfile \
  . \
  --push                              # 推送镜像到仓库

# 5. 验证推送结果
echo -e "\n===== 验证推送的多架构镜像 ====="
echo "查看 ${TAG_VERSION} 的架构信息："
docker buildx imagetools inspect "${TAG_VERSION}"

echo -e "\n===== 操作完成 ====="
echo "已推送多架构镜像："
echo "  - 版本号标签: ${TAG_VERSION}"
echo "  - Latest标签: ${TAG_LATEST}"
echo "支持的架构: ${ARCHITECTURES[*]}"