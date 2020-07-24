import React, { useEffect } from "react";
import Header from "./Header";
import "./Home.css";
import { Link, useLocation } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home">
      <main className="main">
        <h1 className="main-title">
          Mind Mapping &nbsp;<i className="fas fa-plus"></i>&nbsp; Note Taking
        </h1>
        <h3 className="main-desc">
          Map Out Your Ideas Visually and Organize Them Detaily
        </h3>
        <div className="main-block">
          <button className="main-btn try-it-btn">
            <Link to="/mindnote">Try It !</Link>
          </button>
          <span>&nbsp;or&nbsp;</span>
          <button className="main-btn sign-up-btn">
            <Link to="/docs/my">Sign Up</Link>
          </button>
          <div className="main-block">
            Already had mindnotes?&nbsp;
            <Link className="link" to="/docs">
              Log in
            </Link>
            &nbsp;here.
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
