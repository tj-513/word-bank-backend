FROM node:10.15.3

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pm2 yarn

COPY package*.json ./
RUN yarn

COPY . .

CMD [ "pm2", "src/index.js"]

EXPOSE 3000