const router = require("express").Router();
// Requiring our models and passport as we've configured it
const db = require("../models");
var passport = require("../config/passport");
var bcrypt = require("bcrypt-nodejs");

// // Matches with "/api/books"
// router.route("/books")
//   .get(function (req, res) {
//     db.Book
//       .find(req.query)
//       .sort({ date: -1 })
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   })
//   .post(function (req, res) {
//     db.Book
//       .create(req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   });

// Matches with "/api/books/:id"
router
  .route("/books/:id")
  .delete(function (req, res) {
    db.Book
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

router
  .route("/books/:ISBN")
  .get(function (req, res) {
    db.Book
      .findOne({ "ISBN": req.params.ISBN })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

// Passport Routes

router
  .route("/sign_up")
  .post(function (req, res) {
    newUser = req.body
    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10), null);
    db.User
      .create(newUser)
      .then(dbModel => {
        res.json(dbModel.username)
      })
      .catch(err => res.status(422).json(err));
  });

router
  .route("/sign_in")
  .post(passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json({
      loggedIn: true,
      username: req.user.username,
    });
  });

// Route for logging user out
router
  .route("/sign_out")
  .get(function (req, res) {
    req.logout();
    res.redirect("/");
  });


router
  .route("/user_data")
  .get(function (req, res) {

    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({ loggedIn: false });
    }
    else {
      // Otherwise send back the user's username
      res.json({
        username: req.user.username,
        loggedIn: true,
        id: req.user._id
      });
    }
  });

router
  .route("/allUsers/:username/:email")
  .get(function (req, res) {
    db.User
      .findOne({
        "username": req.params.username,
        "email": req.params.email
      },
        { username: 1, wins: 1, losses: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })
  .put(function (req, res) {
    newPass = req.body
    newPass.password = bcrypt.hashSync(newPass.password, bcrypt.genSaltSync(10), null);
    db.User
      .findOneAndUpdate(
        {
          "username": req.params.username,
          "email": req.params.email
        },
        {
          $set: newPass
        }
      )
      .then(dbModel => res.json(dbModel.username))
      .catch(err => res.status(422).json(err));
  });

// All users test route
router
  .route("/allUsers")
  .get(function (req, res) {
    db.User
      .find(req.query, { username: 1 })
      .sort({ net: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  });

// Route for saving/updating an Article's associated Note
router
  .route("/allUsers/:_id")
  .get(function (req, res) {
        db.User
          .findOne({ "_id": req.params._id })
          .populate({path: 'books', options: { sort: { 'date': -1 } } })
          .then(dbModel => res.json(dbModel.books))
          .catch(err => res.status(422).json(err));
      })
  .post(function (req, res) {

    // Create a new note and pass the req.body to the entry
    db.Book.create(req.body)
      .then((dbBook) => {

        db.User.findOneAndUpdate({ _id: req.params._id }, { $push: { books: dbBook._id } }, { new: true }).then(console.log("success"));
      })
      .then(function (dbUser) {
        // If we were able to successfully update an User, send it back to the client
        res.json(dbUser);
      })
      .catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

module.exports = router;
