const course = require('../models/course');

exports.createCourse = async (req, res) => {
  const newCourse = await course.create(req.body);

  try {
    res.status(200).json({
      status: 'success',
      newCourse,
    });
  } catch {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
