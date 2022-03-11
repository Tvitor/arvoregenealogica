const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function checkLogin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: true,
      message: 'Necessário Fazer login',
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    // verifica se não houve alteração nos dados do usuario
    const user = await User.findOne({ id, email });

    if (!user) {
      return res.status(401).json({
        error: true,
        message: 'Usuario inválido.',
      });
    }

    // add as informações na requisição para todas as paginas que usem o middleware terem acesso.
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      error: true,
      message: 'Token expirado ou invalido.',
    });
  }
}

module.exports = checkLogin;
