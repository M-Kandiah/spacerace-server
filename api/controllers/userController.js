const User = require('../models/users');
const Usermon = require('../models/userMon')

//get all users
async function index(req, res) {
    try {
        Usermon.find()
            .then((result) => res.send(result))
            .catch((err) => console.log(err))
    } catch (err) {
        console.log('could not do index')
    }
};

//get user by id
async function show(req, res) {
    try {
        Usermon.findById(req.params.id)
            .then((result) => res.send(result))
            .catch((err) => console.log(err))
    } catch (err) {
        console.log('didnt work')
    }
};



//update points
async function updatePoints(req, res) {
    try {

    } catch (err) {

    }
};

//update wins
async function updateWins(req, res) {
    try {

    } catch (err) {

    }
};

module.exports = { index, show, updatePoints, updateWins }

