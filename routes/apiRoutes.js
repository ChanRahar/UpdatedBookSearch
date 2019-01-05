const axios = require("axios");
const router = require("express").Router();
const booksController = require("../controllers/booksController");

// Matches with "/api/books"
router.route("/books")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/books/:id")
  .delete(booksController.remove);

router
  .route("/books/:ISBN")
  .get(booksController.findOne);


module.exports = router;
