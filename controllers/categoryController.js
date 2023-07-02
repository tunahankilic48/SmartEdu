const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).redirect('/users/dashboard')
    
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {

  await Category.findByIdAndRemove(req.params.id);

  res.status(201).redirect('/users/dashboard');

};