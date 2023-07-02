const User = require('../models/User');

module.exports = async (req, res, next) => {
  await User.findById(req.session.userId)
    .then((user) => {
        if(!user) return res.redirect('/login');
      next();
    })
    .catch((err) => {
      return res.redirect('/login');
    });
};
