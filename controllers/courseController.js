const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      newCourse,
    });
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
    const category = await Category.findOne({slug: categorySlug});

    let filter = {};

    if(categorySlug)
    {
      filter = {category: category._id}
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
    try {
      const courseId = await Course.findOne({slug : req.params.slug});
      const categories = await Category.find().sort('name');
      res.status(200).render('course', {
        course: courseId,
        categories,
        pageName: 'courses'
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
