const express = require('express');
const autController = require('../controllers/autController');
const autMiddleware = require("../middlewares/autMiddleware")

const router = express.Router();

router.route('/signup').post(autController.createUser);
router.route('/login').post(autController.loginUser);
router.route('/logout').get(autController.logoutUser);
router.route('/dashboard').get(autMiddleware, autController.getDashboardPage);

module.exports = router;
