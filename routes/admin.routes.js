const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');

//router.post('/', userController.addUser) //only for create admin
router.post('/', userController.authenticate);

module.exports = router;