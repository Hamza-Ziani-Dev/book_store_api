const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const {
  User,
  validateUpdateUser
} = require("../models/User");



/**
 *  @desc    Get All  Users
 *  @route   /api/users
 *  @method  Get
 *  @access  public
 */
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    if(!users){
        res.status(404).json({message:"Users Not Found!"})
    }
      // Send Message To Client:
      res.status(201).json(users);
  });

/**
 *  @desc    Get One  User
 *  @route   /api/users/:id
 *  @method  Get
 *  @access  public
 */
const getOneUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user){
        res.status(404).json({message:"User Not Found!"})
    }
      // Send Message To Client:
      res.status(201).json(user);
  });

/**
 *  @desc    Update New User
 *  @route   /api/users/:id
 *  @method  PUT
 *  @access  private 
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

 if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
 }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
      },
    },
    { new: true }
  ).select("-password");


    // Send Message To Client:
    res.status(201).json({
     updatedUser
  });
});

/**
 *  @desc    delete User
 *  @route   /api/users/:id
 *  @method  delete
 *  @access  public
 */
const deleteUser = asyncHandler(async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
      // Send Message To Client:
      res.status(201).json({message:"User Delete With Success!"});
  });









module.exports = {
    updateUser,
    deleteUser,
    getOneUser,
    getAllUsers
}