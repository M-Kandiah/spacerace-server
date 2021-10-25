const app = require('./server');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + "./env" });
const port = process.env.PORT || 3000;
const connectionUrl = process.env.CONNECTION_URL;

mongoose.connect(connectionUrl)
    .then(() => app.listen(port, () => console.log(`express shooting off at ${port}`)))
    .catch((err) => console.log('err'))




