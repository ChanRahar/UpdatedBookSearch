const axios = require("axios");
const router = require("express").Router();
const booksController = require("../controllers/booksController");

router.get("/recipes", (req, res) => {
  axios
    .get("https://www.googleapis.com/books/v1/volumes", { params: req.query })
    .then(({ data: { results } }) => res.json(results))
    .catch(err => res.status(422).json(err));
});

// Matches with "/api/books"
router.route("/books")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("books/:id")
  .delete(booksController.remove);

module.exports = router;
