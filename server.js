const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 8801;
const app = express();
const apiRoutes = require("./routes/apiRoutes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setup passport
app.use(session({ secret: "googleBooks", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Use apiRoutes
app.use("/api", apiRoutes);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
