import React from "react";

import "./Header.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
      <div className="title">
        <Link to="/">MindNote</Link>
      </div>
      {props.children}
      <div className="member-btn">
        <i className="fas fa-user-alt"></i>
      </div>
    </header>
  );
};

export default Header;
