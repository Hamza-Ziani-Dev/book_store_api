const express = require("express");
const router = express.Router();
const { updateUser, deleteUser, getOneUser, getAllUsers } = require("../controllers/usersController");
const {
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyToken
  } = require("../middlewares/verifyToken");

// /api/users
router.route("/").get(verifyTokenAndAuthorization,getAllUsers);



// /api/users/update
router.route("/:id")
.get(verifyTokenAndAdmin,getOneUser)
.put(verifyToken,verifyTokenAndAdmin,updateUser)
.delete(verifyToken,verifyTokenAndAdmin, deleteUser)




module.exports = router;
