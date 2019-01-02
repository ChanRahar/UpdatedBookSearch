import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getRecipes: (query) => {
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
  getBooks: () => {
    return axios.get("/api/books");
  },

  deleteBook: (id) => {
    return axios.delete("/api/books/" + id);
  }  
};
