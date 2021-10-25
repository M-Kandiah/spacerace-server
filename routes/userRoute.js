const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const middleware = require('../middleware/middleware')

router.get('/', middleware.verifyToken, userController.index);
router.get('/:id', middleware.verifyToken, userController.show);
router.patch('/:id/points', middleware.verifyToken, userController.updatePoints);
router.patch('/:id/wins', middleware.verifyToken, userController.updateWins);

module.exports = router;