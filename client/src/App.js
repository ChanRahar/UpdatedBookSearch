import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <br></br>
        <Jumbotron />
        <Switch>
          <Route exact path="/" component={Search} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;