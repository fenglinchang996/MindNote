import React, { useState, useEffect, useContext } from "react";
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
import UserContext from "./UserContext";
import "./Header.css";
import { auth } from "./firebase";

const Header = (props) => {
  const { path, url } = useRouteMatch();
  let history = useHistory();
  const user = useContext(UserContext);

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
        <Link to="/home">MindNote</Link>
      </div>
      {/* {path === "/home" && homeNav} */}
      {path === "/docs" && docsNav}
      {path === "/mindnote/:docId/:mindnoteId" && mindnoteNav}
      <div className="user">
        {user ? (
          <UserInfo user={user} />
        ) : (
          <Link to="/member/login" className="login-btn">
            Log In
          </Link>
        )}
      </div>
    </header>
  );
};

const UserInfo = (props) => {
  const { user } = props;
  const [isUserPopoverDisplayed, setisUserPopoverDisplayed] = useState(false);
  const logOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div
      className="user-info"
      onMouseOver={(e) => setisUserPopoverDisplayed(true)}
      onMouseOut={(e) => setisUserPopoverDisplayed(false)}
    >
      <i className="fas fa-user-alt"></i>
      <span>&nbsp;{user.email}&nbsp;</span>
      <div
        className="popover"
        style={{ display: isUserPopoverDisplayed ? "block" : "none" }}
      >
        <div className="item" onClick={logOut}>
          Log out
        </div>
      </div>
    </div>
  );
};

export default Header;
