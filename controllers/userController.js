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
        const user = await Usermon.findByIdAndUpdate(req.params.id, { $inc: { points: req.body.points } });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ err });
    }
};

//update wins
async function updateWins(req, res) {
    try {
        const user = await Usermon.findByIdAndUpdate(req.params.id, { $inc: { wins: 1 } })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ err });
    }
};

module.exports = { index, show, updatePoints, updateWins }

