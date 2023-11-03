const express = require("express");
const router = express.Router();
const {registerUser, loginUser} = require("../controllers/authController");


// /api/auth/register
router.route("/register").post(registerUser);

// /api/auth/login
router.route("/login").post(loginUser);


module.exports = router;
