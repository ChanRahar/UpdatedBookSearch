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

  // Passport Account Related 
  signUp: (userData) => {
    return axios.post("/api/sign_up", userData);
  },

  signIn: (userData) => {
    return axios.post("/api/sign_in", userData);
  },

  signedIn: () => {
    return axios.get("/api/user_data")
  },

  signOut: () => {
    return axios.get("/api/sign_out")
  },

  passReset: function (username, email, userData) {
    return axios.put(`/api/allUsers/${username}/${email}`, userData);
  },

  // Saves a book to the database for the specific user
  saveBook: (id, bookData) => {
    return axios.post(`/api/allUsers/${id}`, bookData);
  },

  // Gets all books saved by a user
  getSavedBooks: (id) => {
    return axios.get(`/api/allUsers/${id}`);
  },

  // Delete saved book
  deleteBook: (id) => {
    return axios.delete("/api/books/" + id);
  },
};
