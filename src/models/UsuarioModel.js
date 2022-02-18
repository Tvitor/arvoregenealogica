const mongoose = require('mongoose');
const validator = require('validator');

const UsuarioSchema =new mongoose.Schema({
    nome: {type: String, required: true},
    sobrenome: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: false, default:''},
    naturalidade: {type: String, required: false, default:''},
    nacionalidade: {type: String, required: false, default:''},
    cidadeResidencia: {type: String, required: false, default:''},
    dataNascimento: {type: String, required: false, default:''},
    nomeConjugeAtual: {type: String, required: false, default:''},
    sobreNomeConjugeAtual: {type: String, required: false, default:''},
    criadoEm: {type: Date, default: Date.now}   
});

const UsuarioModel = mongoose.model('Usuario', UsuarioSchema);


function Usuario(body) {
    this.body = body;
    this.errors = [];
    this.usuario = null;
}

Usuario.prototype.register = async function() {
    this.valida();

    if (this.errors.length > 0) return;
    this.usuario = await UsuarioModel.create(this.body);
};

Usuario.prototype.valida = function() {
    this.cleanUp();

    //o email obrigatório e precisa ser válido
    if(!validator.isEmail(this.body.email)) this.errors.push('Email invalido');

    //nome é obrigatório
    if(!this.body.nome) this.errors.push('Nome é obrigatório');

    //sobrenome é obrigatório
    if(!this.body.sobrenome) this.errors.push('Sobrenome é obrigatório');

    /*
    // a senha precisa ter entre 3 e 50 caracateres
    if(this.body.password.lenght < 3 || this.body.password.lenght > 50 ) {
        this.errors.push('a senha precisa ter entre 3 e 50 caracteres')
    }
    */
}

Usuario.prototype.cleanUp = function() {
    for(const key in this.body) {
        if(typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }
    this.body = {
        nome:  this.body.nome,
        sobrenome:  this.body.sobrenome,
        email: this.body.email,
        telefone: this.body.telefone,
        naturalidade: this.body.naturalidade,
        nacionalidade: this.body.nacionalidade,
        cidadeResidencia: this.body.cidadeResidencia,
        dataNascimento: this.body.dataNascimento,
        nomeConjugeAtual: this.body.nomeConjugeAtual,
        sobreNomeConjugeAtual: this.body.sobreNomeConjugeAtual
    };
}

Usuario.prototype.edit = async function(id) {
    if (typeof id !== 'string') return;
    this.valida();
    if (this.errors.length > 0) return;
    this.usuario = await UsuarioModel.findByIdAndUpdate(id, this.body, {new: true});
}

Usuario.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const user = await UsuarioModel.findById(id);
    return user;
}

//métodos estáticos

Usuario.buscaPorId = async function(id) {
    if(typeof id !== 'string') return;
    const user = await UsuarioModel.findById(id);
    return user;
}

Usuario.buscaUsuarios = async function() {
    const usuarios = await UsuarioModel.find()
    .sort({criadoEm: -1});
    return usuarios;
}

Usuario.delete = async function(id) {
    if (typeof id !== 'string') return;
    const usuario = await UsuarioModel.findOneAndDelete({_id: id});
    return usuario;
}

module.exports = Usuario;