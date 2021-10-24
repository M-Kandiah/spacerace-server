const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// importing routes

server.get('/', (req, res) => {res.send("Welcome to SpaceRace!")}); //name change pls this is so lame

module.exports = server;