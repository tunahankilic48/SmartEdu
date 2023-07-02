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
    req.flash("success", "Course created successfully!")
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash("error", "Course could not created successfully!")
    res.status(201).redirect('/courses');
  }
};

exports.getAllCourses = async (req, res) => {
  const categorySlug = req.query.categories;
  const query = req.query.search;
  const category = await Category.findOne({ slug: categorySlug });

  let filter = {};

  if (categorySlug) {
    filter = { category: category._id };
    const courses = await Course.find({ category: filter.category }).sort(
      '-createdAt'
    ).populate('user');
    const categories = await Category.find().sort('name');
    res.status(200).render('courses', {
      courses,
      categories,
      pageName: 'courses',
    });
  }

  if (query) {
    filter = { name: query };
    const courses = await Course.find({
      name: { $regex: '.*' + filter.name + '.*', $options: 'i' },
    }).sort('-createdAt').populate('user');
    const categories = await Category.find().sort('name');
    res.status(200).render('courses', {
      courses,
      categories,
      pageName: 'courses',
    });
  }
  const courses = await Course.find().sort('-createdAt').populate('user');
  const categories = await Category.find().sort('name');
  res.status(200).render('courses', {
    courses,
    categories,
    pageName: 'courses',
  });
};

exports.getCourseById = async (req, res) => {
  const user = await User.findById(req.session.userId);

  const courseId = await Course.findOne({ slug: req.params.slug }).populate(
    'user'
  );
  const categories = await Category.find().sort('name');

  res.status(200).render('course', {
    course: courseId,
    categories,
    user,
    pageName: 'courses',
  });
};

exports.enrollCourse = async (req, res) => {
  const user = await User.findById(req.session.userId);
  await user.courses.push({ _id: req.body.course_id });
  await user.save();

  res.status(200).redirect('/users/dashboard');
};

exports.releaseCourse = async (req, res) => {
  const user = await User.findById(req.session.userId);
  await user.courses.pull({ _id: req.body.course_id });
  await user.save();

  res.status(200).redirect('/users/dashboard');
};
