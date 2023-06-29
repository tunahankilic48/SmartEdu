const course = require('../models/course');

exports.createCourse = async (req, res) => {
  try {
    const newCourse = await course.create(req.body);
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
    const courses = await course.find().sort('-createdAt');
    res.status(200).render('courses', {
      courses,
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
      const courseId = await course.findOne({slug : req.params.slug});
      res.status(200).render('course', {
        course: courseId,
        pageName: 'courses'
      });
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };
