const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const slugify = require('slugify');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    default: "student"
  }

});

UserSchema.pre('validate', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    })
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
