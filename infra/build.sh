#!/usr/bin/env bash

docker build -t word-bank -f Dockerfile .
docker run --publish 8000:8080 --detach --name word-bank-container word-bank