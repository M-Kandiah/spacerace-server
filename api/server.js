const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// importing routes
const auth = require('./routes/authRoute');
server.use('/auth', auth);

const user = require('./routes/userRoute');
server.use('/users', user);

server.get('/', (req, res) => {res.send("Welcome to SpaceRace!")}); //name change pls this is so lame

module.exports = server;