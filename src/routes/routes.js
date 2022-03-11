const { Router } = require('express');
const getUser = require('../middlewares/GetUser');

const userController = require('../controllers/UserController');
const TokenController = require('../controllers/TokenController');
const loginRequired = require('../middlewares/loginRequired');

const router = new Router();

// Home Routes
router.post('/', TokenController.store);

// User Routes
router.get('/usuario', loginRequired, userController.index); // Lista todos os usuaris
router.get('/usuario/:id', getUser.getUsers, userController.show); // lista 1 usuario

router.post('/usuario', userController.store);

router.patch('/usuario/:id', getUser.getUsers, userController.update);
router.delete('/usuario/:id', getUser.getUsers, userController.delete);

module.exports = router;
