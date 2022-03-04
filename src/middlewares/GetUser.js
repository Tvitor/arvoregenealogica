const User = require('../models/User');

class GetUser {
  constructor() {
    this.getUsers = async (req, res, next) => {
      let user;
      try {
        user = await User.findById(req.params.id);
        if (user == null) {
          return res.status(404).json({
            error: true,
            message: 'Usuario não encontrado',
          });
        }
      } catch (e) {
        return res.status(500).json({
          error: true,
          message: e.message,
        });
      }

      res.user = user;
      next();
      return res;
    };
  }
}

module.exports = new GetUser();
