const express = require('express');
const http = require('http');
const router = require('./routes');
const bodyParser = require('body-parser');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();

const appServer = http.createServer(app);

app.use(bodyParser.json());
app.use('/', router);

appServer.listen(HTTP_PORT, () =>
  console.log(`word-bank-backend is listening on port:${HTTP_PORT}`)
);
