const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String, required: false, default: '' },
  naturalidade: { type: String, required: false, default: '' },
  nacionalidade: { type: String, required: false, default: '' },
  cidadeResidencia: { type: String, required: false, default: '' },
  dataNascimento: { type: String, required: false, default: '' },
  nomeConjugeAtual: { type: String, required: false, default: '' },
  sobreNomeConjugeAtual: { type: String, required: false, default: '' },
  password: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now },
});

//                           nome da tabela
module.exports = mongoose.model('usuarios', userSchema);
