import React from "react";
import "./Header.css";

const Header = (props) => {
  return (
    <header className="header">
      <div className="title">MindNote</div>
      {props.children}
      <div className="member-btn">
        <i className="fas fa-user-alt"></i>
      </div>
    </header>
  );
};

export default Header;
