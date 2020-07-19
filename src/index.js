const express = require('express');
require('dotenv').config();
const http = require('http');
const {errors} = require('celebrate');
const bodyParser = require('body-parser');

const router = require('./routes');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();

const appServer = http.createServer(app);

app.use(bodyParser.json());
app.use('/', router);
app.use(errors());

appServer.listen(HTTP_PORT, () =>
  console.log(`word-bank-backend is listening on port:${HTTP_PORT}`)
);
