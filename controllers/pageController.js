const nodemailer = require("nodemailer")
const Course = require('../models/Course');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find().sort("-createdAt").limit(2)
  const totalCourses = await Course.find().countDocuments()
  const totalStudents = await User.find({role: "student"}).countDocuments()
  const totalTeachers = await User.countDocuments({role: "teacher"})
    res.status(200).render('index', {
      pageName: "index",
      courses,
      totalCourses,
      totalTeachers,
      totalStudents
    });
  }

  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
      pageName: "about"
    });
  }

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
      pageName: "register"
    });
  }

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
      pageName: "login"
    });
  }

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
      pageName: "contact"
    });
  }

  exports.sendEmail = async (req, res) => {
    try {
    const outputMessage =`
    <h1>Mail Details</h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'humanresourcehs8@gmail.com',
        pass: 'letjphjlfbbzxdsd'
      }
    });

      const info = await transporter.sendMail({
        from: '"Smart Edu Contact Form" <humanresourcehs8@gmail.com>', // sender address
        to: "kilictunahan942@gmail.com", // list of receivers
        subject: "Smart Edu Contact Form New Message", // Subject line
        html: outputMessage, // html body
      });

      req.flash("success", "We received your message succesfully")
      
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      res.status(200).redirect("contact")
  } catch (err) {
    req.flash("error", "Something happen!")
    res.status(200).redirect("contact")
  }
}
