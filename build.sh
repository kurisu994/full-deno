#/bin/bash

domainName="app-loader"

git pull --rebase

docker images | grep ${fileName} &> /dev/null
if [ $? -eq 0 ]
then
    docker tag ${fileName}:latest pre/${fileName}:pre
fi

docker build -t ${fileName}:latest -f ./Dockerfile .