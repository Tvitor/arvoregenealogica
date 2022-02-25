const Usuario = require('../models/UsuarioModel')

exports.index = async (req,res ) =>{
    const usuarios = await Usuario.buscaUsuarios();
    res.render('index', {usuarios});
    return;        
};

