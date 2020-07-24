import React, { useEffect } from "react";
import "./Header.css";
import {
  Link,
  NavLink,
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

const Header = (props) => {
  const { path, url } = useRouteMatch();
  let history = useHistory();

  const homeNav = (
    <nav className="navbar">
      <div className="navbar-item">Feature</div>
      <div className="navbar-item">Pricing</div>
      <div className="navbar-item">Support</div>
      <div className="navbar-item">About</div>
    </nav>
  );
  const docsNav = (
    <nav className="navbar">
      <div className="navbar-item">
        <NavLink to="/docs/public">Public Mindnotes</NavLink>
      </div>
      <div className="navbar-item">
        <NavLink to="/docs/my">My Mindnotes</NavLink>
      </div>
    </nav>
  );

  const handleGoBack = () => history.goBack();
  const mindnoteNav = (
    <div className="go-back-btn" onClick={handleGoBack}>
      <i className="fas fa-chevron-left"></i>&nbsp; Back
    </div>
  );

  return (
    <header className="header">
      <div className="title">
        <Link to="/">MindNote</Link>
      </div>
      {path === "/home" && homeNav}
      {path === "/docs" && docsNav}
      {path === "/mindnote/:mindnoteId" && mindnoteNav}
      <div className="member-btn">
        <i className="fas fa-user-alt"></i>
      </div>
    </header>
  );
};

export default Header;
