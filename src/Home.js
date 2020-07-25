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
          <button className="main-btn sign-up-btn">
            <Link to="/member/signup">Try MindNote for Free</Link>
          </button>
          <button className="main-btn gallery-btn">
            <Link to="/docs/public">
              View People's Mindnotes &nbsp;
              <i className="fas fa-chevron-right"></i>
            </Link>
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
