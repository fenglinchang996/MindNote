import React from "react";
import Header from "./Header";
import "./Home.css";

const Home = (props) => {
  return (
    <div className="home">
      <Header>
        <nav className="navbar">
          <div className="navbar-item">Feature</div>
          <div className="navbar-item">Pricing</div>
          <div className="navbar-item">Support</div>
          <div className="navbar-item">About</div>
        </nav>
      </Header>
    </div>
  );
};

export default Home;
