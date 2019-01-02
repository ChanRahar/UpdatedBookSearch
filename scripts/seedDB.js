const mongoose = require("mongoose");
const db = require("../models/book");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/googlebooks"
);

const bookSeed = [
  {
    title: "title",
    authors: ["Author"],
    description:"somestuff",
    image: "somestuff",
    infoLink: "somestuff",
    ISBN: "somestuff",
    date: new Date(Date.now())
  },
];

console.log(db.Book)

db.Book
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
