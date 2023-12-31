const bcrypt = require('bcrypt');
const { query, validationResult } = require('express-validator');

const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const result = validationResult(req);
    for(let i = 0; i < result.array().length; i++)
    {
      req.flash("error", `${result.array()[i].msg}`)
    }
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        if (same) {
          // user session
          req.session.userId = user._id;
          res.status(200).redirect('/users/dashboard');
        } else {
          req.flash("error", "Your password is not correct!");
          res.status(400).redirect('/login');
        }
      });
    } else {
      req.flash("error", "User is nor exist!");
          res.status(400).redirect('/login');
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userId }).populate(
    'courses'
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userId });
  const users = await User.find();
  res.status(200).render('dashboard', {
    pageName: 'dashboard',
    user,
    categories,
    courses,
    users
  });
};

exports.deleteUser = async (req, res) => {

    await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({user: req.params.id});
    res.status(201).redirect('/users/dashboard');
  
};
