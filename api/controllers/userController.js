const express = require('express');
const router = express.Router();
const { init } = require('../dbConfig');

const User = require('../models/users');

//get all users
router.get('/', async (req, res) => {
    try {

    } catch (err) {

    }
});

//get user by id
router.get('/:id', async (req, res) => {
    try {

    } catch (err) {

    }
});

//update points
router.patch('/:id', async (req, res) => {
    try {

    } catch (err) {

    }
});

//update wins
router.patch('/:id', async (req, res) => {
    try {

    } catch (err) {

    }
});

module.exports = router;

