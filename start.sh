#/bin/bash

domainName="app-loader"

docker ps | grep ${domainName} &>/dev/null
if [ $? -eq 0 ]; then
  docker stop ${domainName}
fi

docker ps -a | grep ${domainName} &>/dev/null
if [ $? -eq 0 ]; then
  docker rm ${domainName}
fi

docker run -d -ti --name ${domainName} \
  -u root \
  -p 9000:8000 \
  -v "$PWD/.db:/app/.db" \
  -e TZ=Asia/Shanghai \
  ${domainName}:latest

docker images | grep pre/${fileName} &>/dev/null
if [ $? -eq 0 ]; then
  docker rmi pre/${fileName}:pre
fi
