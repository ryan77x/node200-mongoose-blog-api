const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/my-blog';
mongoose.connect(url);
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("ok");
});

module.exports = app;