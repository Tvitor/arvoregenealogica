const bcrypt = require('bcryptjs');
const yup = require('yup');
// const mongoose = require('mongoose');
const user = require('../models/User');

class UserController {
  async index(req, res) {
    try {
      const users = await user.find();
      return res.json(users);
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Erro ao retornar usuarios',
      });
    }
  }

  async show(req, res) {
    res.send(res.user);
  }

  async store(req, res) {
    // mover este bloco para o model
    // validacao atraves do yup

    const schema = yup.object().shape({
      nome: yup.string().required(),
      sobrenome: yup.string().required(),
      email: yup.string().email().required(),
      telefone: yup.string(),
      naturalidade: yup.string(),
      nacionalidade: yup.string(),
      cidadeResidencia: yup.string(),
      dataNascimento: yup.string(),
      nomeConjugeAtual: yup.string(),
      sobreNomeConjugeAtual: yup.string(),
      password: yup.string().required(),

    });
    const valido = schema.isValid(req.body);
    if (!valido) {
      return res.status(400).json({
        error: true,
        message: 'Dados inválidos',
      });
    }

    // checa se o email é unico no banco
    const emailExists = await user.findOne({ email: req.body.email });

    if (emailExists) {
      return res.status(400).json({
        error: true,
        message: 'Email Já cadastrado',
      });
    }

    const {
      nome, sobrenome, email, telefone, naturalidade, nacionalidade, cidadeResidencia,
      dataNascimento, nomeConjugeAtual, sobreNomeConjugeAtual, password,
    } = req.body;

    const data = {
      nome,
      sobrenome,
      email,
      telefone,
      naturalidade,
      nacionalidade,
      cidadeResidencia,
      dataNascimento,
      nomeConjugeAtual,
      sobreNomeConjugeAtual,
      password,
    };
    // criptografa o password
    data.password = await bcrypt.hash(data.password, 8);
    // fim do bloco

    await user.create(data, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: 'Erro ao inserir no MongoDB',
        });
      }
      return res.status(200).json({
        error: false,
        message: 'Usuario cadastrado com sucesso',
      });
    });
  }

  async update(req, res) {
    try {
      res.user = user.findOneAndUpdate({ _id: res.user.id }, req.body, {
        upsert: true,
      }, (error) => {
        if (error) {
          res.status(400).json({
            error: true,
            message: error.message,
          });
        }
      });
    } catch (e) {
      return res.status(400).json({
        error: true,
        message: e.message,
      });
    }
    return res.json(req.body);
  }

  async delete(req, res) {
    try {
      await res.user.remove();
      return res.json({
        error: false,
        message: 'Usuario Exluido',
      });
    } catch (e) {
      return res.status(500).json({
        error: true,
        message: 'Erro ao excluir usuario',
      });
    }
  }
}

module.exports = new UserController();
