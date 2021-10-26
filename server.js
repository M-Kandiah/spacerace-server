const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// importing routes
const auth = require('./routes/authRoute');
app.use('/auth', auth);

const user = require('./routes/userRoute');
app.use('/users', user);

app.get('/', (req, res) => {res.send("Welcome to SpaceRace!")}); //name change pls this is so lame

module.exports = app;