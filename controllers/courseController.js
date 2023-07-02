const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');


exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userId,
    });
    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find().sort('name');
    res.status(200).render('courses', {
      courses,
      categories,
      pageName: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.getCourseById = async (req, res) => {

    const courseId = await Course.findOne({ slug: req.params.slug }).populate(
      'user'
    );
    const categories = await Category.find().sort('name');

    res.status(200).render('course', {
      course: courseId,
      categories,
      pageName: 'courses',
    });
};
