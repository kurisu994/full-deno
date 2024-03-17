FROM denoland/deno:alpine-1.41.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV NPM_CONFIG_REGISTRY=https://registry.npmmirror.com

WORKDIR /app

COPY . .
RUN echo "${DENO_DEPLOYMENT_ID}"
RUN deno task build && deno cache main.ts

EXPOSE 8000

CMD ["run", "-A", "main.ts"]