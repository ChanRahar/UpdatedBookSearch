import axios from "axios";

// The getBooks method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getBooks: (query) => {
    return axios.get("https://www.googleapis.com/books/v1/volumes", {
      params: {
        q: query
      }
    });
  }, 

  // Saves a book to the database
  saveBook: (bookData) => {
    return axios.post("/api/books", bookData);
  },

  // Gets all books
  getSavedBooks: () => {
    return axios.get("/api/books");
  },
   // Gets the book with the given id
   getOneBook: function(ISBN) {
    return axios.get("/api/books/" + ISBN);
  },
  deleteBook: (id) => {
    return axios.delete("/api/books/" + id);
  }  
};
