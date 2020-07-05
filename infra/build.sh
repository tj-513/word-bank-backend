#!/usr/bin/env bash

docker build -t word-bank -f Dockerfile .
docker rm --force word-bank-container
docker run --publish 3000:3000 --name word-bank-container word-bank:latest