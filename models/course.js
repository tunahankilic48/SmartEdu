const mongoose = require('mongoose');
const slugify = require('slugify');

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
  slug: {
    type: String,
    unique: true,
  },
});

courseSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

const course = mongoose.model('course', courseSchema);
module.exports = course;
