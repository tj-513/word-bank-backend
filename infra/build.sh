#!/usr/bin/env bash

docker build -t word-bank -f Dockerfile .
docker rm --force word-bank-container
docker run --publish 8000:8080 --name word-bank-container word-bank:latest