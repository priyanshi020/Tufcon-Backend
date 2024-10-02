const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Create User
router.post('/createUser', userController.createUser);

// Get All Users
router.get('/', userController.getUsers);

module.exports = router;
