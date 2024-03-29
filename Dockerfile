FROM denoland/deno:alpine-1.41.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
# 设置npm镜像仓库
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com
ENV TZ=Asia/Shanghai

WORKDIR /app

RUN ln -sf /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

COPY . .
RUN echo "${DENO_DEPLOYMENT_ID}"
RUN deno task build && deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]