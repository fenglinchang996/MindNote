import React from "react";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home">
      <Header />
    </div>
  );
};

const Header = (props) => {
  return (
    <header className="header row align-items-center">
      <div className="title">MindNote</div>
      <nav className="navbar">
        <div className="navbar-item">Feature</div>
        <div className="navbar-item">Pricing</div>
        <div className="navbar-item">Support</div>
        <div className="navbar-item">About</div>
      </nav>
      <div className="member">
        <i className="fas fa-user-alt"></i>
      </div>
    </header>
  );
};

export default Home;
