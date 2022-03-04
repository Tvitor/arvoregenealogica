const { Router } = require('express');
const getUser = require('../middlewares/GetUser');

// import userController from '../controllers/UserController';

const userController = require('../controllers/UserController');

// const User = require('../models/User');

const router = new Router();

// router.get('/', userController.index);

// router.get('/', userController.show);

router.get('/usuario', userController.index);
router.post('/usuario', userController.store);
router.get('/usuario/:id', getUser.getUsers, userController.show);
router.patch('/usuario/:id', getUser.getUsers, userController.update);
router.delete('/usuario/:id', getUser.getUsers, userController.delete);

module.exports = router;
