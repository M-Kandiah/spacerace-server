const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.show);
router.get('/:id',userController.showIndex);
router.patch('/:id', userController.updateBadgeById);

module.exports = router;