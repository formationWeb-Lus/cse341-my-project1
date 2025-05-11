
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);          // /users
router.get('/:id', usersController.getSingle);    // /users/:id

module.exports = router;
