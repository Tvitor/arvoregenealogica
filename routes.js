const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const usuarioController = require('./src/controllers/usuarioController');

//Rotas da Home
route.get('/', homeController.index)


//Rotas de Usuario
// rotas de cadastro
route.get('/usuario/index', usuarioController.index)
route.post('/usuario/register', usuarioController.register)

//rotas de edição
route.get('/usuario/index/:id', usuarioController.editIndex)
route.post('/usuario/edit/:id', usuarioController.edit)

//rota para delete
route.get('/usuario/delete/:id', usuarioController.delete)

module.exports = route;