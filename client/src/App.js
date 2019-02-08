import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
import UserAuth from "./pages/UserAuth";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <div className="pt-5">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/Saved" component={Saved} />
          <Route exact path="/SignIn" component={UserAuth} />
          <Route exact path="/SignUp" component={UserAuth} />
          <Route exact path="/Password" component={UserAuth} />
        </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;