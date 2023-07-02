const express = require('express');
const autController = require('../controllers/autController');
const autMiddleware = require("../middlewares/autMiddleware")
const { body } = require('express-validator');
const User = require("../models/User")

const router = express.Router();

router.route('/signup').post([
    body("name").not().isEmpty().withMessage("Please enter your name."),
    body("email").isEmail().withMessage("Please enter a valid email.")
    .custom((userEmail) =>{
        return User.findOne({email:userEmail}).then((user) => {
            if(user){
                return Promise.reject("Email is already exist")
            }
        })
    }),
    body("password").not().isEmpty().withMessage("Please enter a password."),
],
    autController.createUser);
router.route('/login').post(autController.loginUser);
router.route('/logout').get(autController.logoutUser);
router.route('/dashboard').get(autMiddleware, autController.getDashboardPage);
router.route('/:id').delete(autController.deleteUser);

module.exports = router;
