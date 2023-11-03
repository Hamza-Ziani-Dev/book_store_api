const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
  generateToken
} = require("../models/User");

/**
 *  @desc    Register New User
 *  @route   /api/auth/register
 *  @method  POST
 *  @access  public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "this user already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  const result = await user.save();
  const token = user.generateToken();


  const { password,...other } = result._doc;

    // Send Message To Client:
    res.status(201).json({
     result,
      token
  });
});


/**
 *  @desc    Login New User
 *  @route   /api/auth/login
 *  @method  POST
 *  @access  public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Not Found User" });
  }

  const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid Password!" });
  }

  const token = user.generateToken();

  const { password, ...other } = user._doc;
  // Send Message To Client:
  res.status(201).json({
    _id:user._id ,
    isAdmin:user.isAdmin,
    token
});
});



module.exports = {
    registerUser,
    loginUser
}