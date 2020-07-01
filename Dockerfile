FROM node:10.15.3

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pm2

COPY package*.json ./
RUN npm install

COPY . .
