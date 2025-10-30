#/bin/bash

domainName="app-loader"

git pull --rebase

docker images | grep ${domainName} &> /dev/null
if [ $? -eq 0 ]
then
    docker tag ${domainName}:latest pre/${domainName}:pre
fi

docker build -t ${domainName}:latest -f ./Dockerfile .