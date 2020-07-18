import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  NavLink,
} from "react-router-dom";
import Home from "./Home";
import Docs from "./Docs";
import Mindnote from "./Mindnote";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/docs">
            <Docs />
          </Route>
          <Route path="/mindnote">
            <Mindnote />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
