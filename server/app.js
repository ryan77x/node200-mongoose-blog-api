const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const dbURL = process.env.dbURL;
const dbUserName = process.env.dbUserName;
const dbName = process.env.dbName;
const dbUserPassword = process.env.dbUserPassword;

//const url = 'mongodb://localhost:27017/my-blog';
const url = 'mongodb://' + dbUserName + ':' + dbUserPassword + dbURL + '/' + dbName;

mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.status(200).send("ok");
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;