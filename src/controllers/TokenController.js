// const mongoose = require('mongoose');
const bcrypt = require('bcryptjs/dist/bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class TokenController {
  async store(req, res) {
    const {
      email = '', password = '',
    } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        error: true,
        message: 'Credenciais inválidas',
      });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Usuário não existe',
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        error: true,
        message: 'Senha invalida',
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

module.exports = new TokenController();
