const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// /api/authors
router.route("/").get(getAllAuthors).post(createAuthor);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(updateAuthor)
  .delete( deleteAuthor);

module.exports = router;
