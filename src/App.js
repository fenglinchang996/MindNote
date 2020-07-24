import React, { useEffect } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link,
  NavLink,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";
import Header from "./Header";
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
            <Header />
            <Docs />
          </Route>
          <Route path="/mindnote/:mindnoteId">
            <Header />
            <Mindnote />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
