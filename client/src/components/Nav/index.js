import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import API from "../../utils/API";

class Nav extends Component {
  state = {
    loggedIn: false,
  };
  componentDidMount() {

    // Check session data to see if user should be logged in
    API.signedIn()
      .then(response => {
        if (response.data.loggedIn) {
          this.setState({ loggedIn: true, username: response.data.username });
        } 
      });
  }


  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          Google Books
    </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className= "nav-link"
              >
                Search
          </Link>
            </li>
          </ul>
          {this.state.loggedIn === true ? (
            <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to="/Saved"
                className= "nav-link"
              >
                Books Saved
          </Link>
            </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle" href="#" id="dropdownMenuButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.username}</span>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item text-center" to="/SignOut">Sign Out</Link>
                </div>
              </li>
            </ul>)
            :
            (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" href="#" id="dropdownMenuButton" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Account</span>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item text-center" to="/SignIn">Sign In</Link>
                  </div>
                </li>
              </ul>)
          }
        </div>
      </nav>
    );
  };
};

export default Nav;
