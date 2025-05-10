const express = require('express');
const router = express.Router();
const userscontroller = require ('../controllers/users')
routern.get('/',userscontroller.getall);
router.get('/:id', userscontroller.getsingle);