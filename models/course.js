const mongoose = require('mongoose');

const schema = mongoose.Schema;

const courseSchema = new schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const course = mongoose.model('course', courseSchema);
module.exports = course;
