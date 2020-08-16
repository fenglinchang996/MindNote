import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink, useRouteMatch, useHistory } from "react-router-dom";
import UserContext from "../UserContext";
import "./Header.css";
import { auth } from "../firebase";

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
    <nav className="navbar docs-nav">
      <NavLink
        className="navbar-item"
        to="/docs/public"
        activeClassName="navbar-item-selected"
      >
        Public Mindnotes
      </NavLink>
      <NavLink
        className="navbar-item"
        to="/docs/my"
        activeClassName="navbar-item-selected"
      >
        My Mindnotes
      </NavLink>
    </nav>
  );

  const handleGoBack = () => {
    if (user) {
      history.push("/docs/my");
    } else {
      history.push("/docs/public");
    }
  };
  const mindnoteNav = (
    <div className="go-back-btn" onClick={handleGoBack}>
      <i className="fas fa-chevron-left"></i>&nbsp; Back
    </div>
  );

  return (
    <>
      <header className="header">
        <div className="title">
          <Link to="/home">MindNote</Link>
        </div>
        {/* {path === "/home" && homeNav} */}
        {path === "/docs" && docsNav}
        {path === "/docs" && <MenuBar />}
        {path === "/mindnote/:docId/:mindnoteId" && mindnoteNav}
        {path !== "/member" && (
          <div className="user">
            {user ? (
              <UserInfo user={user} />
            ) : (
              <Link to="/member/login" className="login-btn">
                Log In
              </Link>
            )}
          </div>
        )}
      </header>
      <div className="header-sep"></div>
    </>
  );
};

const MenuBar = (props) => {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const showDropdown = () => setIsDropdownDisplayed(true);
  const closeDropdown = () => setIsDropdownDisplayed(false);
  return (
    <div className="navbar menubar">
      <NavLink
        className="menubar-item"
        to="/docs/public"
        activeClassName="navbar-item-selected menubar-item-selected"
      >
        Public Mindnotes
      </NavLink>
      <NavLink
        className="menubar-item"
        to="/docs/my"
        activeClassName="navbar-item-selected menubar-item-selected"
      >
        My Mindnotes
      </NavLink>
      <div className="dropdown-btn" onClick={showDropdown}>
        <i className="fas fa-chevron-down"></i>
      </div>
      <div
        tabIndex={-1}
        className="dropdown"
        style={{ display: isDropdownDisplayed ? "flex" : "none" }}
        onClick={closeDropdown}
      >
        <NavLink
          className="dropdown-item"
          to="/docs/public"
          activeClassName="dropdown-item-selected"
        >
          Public Mindnotes
        </NavLink>
        <NavLink
          className="dropdown-item"
          to="/docs/my"
          activeClassName="dropdown-item-selected"
        >
          My Mindnotes
        </NavLink>
      </div>
    </div>
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
        console.log(error);
      });
  };
  return (
    <div
      className="user-info"
      onMouseOver={(e) => setisUserPopoverDisplayed(true)}
      onMouseOut={(e) => setisUserPopoverDisplayed(false)}
    >
      <i className="fas fa-user-alt"></i>
      <span className="user-data">&nbsp;{user.email}&nbsp;</span>
      <div
        className="popover"
        style={{ display: isUserPopoverDisplayed ? "block" : "none" }}
      >
        <div className="item">{user.name}</div>
        <div className="item">{user.email}</div>
        <div className="item item-btn" onClick={logOut}>
          Log out
        </div>
      </div>
    </div>
  );
};

export default Header;
