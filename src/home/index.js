import React from "react";
import "./Home.css";
import mindMap from "./Mind-Map-Pic.png";
import noteTaking from "./Note-Taking-Pic.png";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home">
      <main className="main">
        <div className="main-block">
          <h1 className="main-title">
            Mind Mapping &nbsp;<i className="fas fa-plus"></i>&nbsp; Note Taking
          </h1>
          <h3 className="main-desc">
            Map Out Your Ideas Visually and Organize Them Detaily
          </h3>
          <div className="main-content">
            <button className="main-btn sign-up-btn">
              <Link to="/member/signup">Try MindNote for Free</Link>
            </button>
            <button className="main-btn gallery-btn">
              <Link to="/docs/public">
                View People's Mindnotes &nbsp;
                <i className="fas fa-chevron-right"></i>
              </Link>
            </button>
          </div>
          <div className="main-content">
            Already had mindnotes?&nbsp;
            <Link className="link" to="/member/login">
              Log in
            </Link>
            &nbsp;here.
          </div>
        </div>
        <div className="second-block">
          <div className="second-desc">
            <h3>Visualize Your Ideas with Mind Mapping</h3>
            <p>See your ideas in a whole picture effectively.</p>
          </div>
          <img className="mind-map-pic" src={mindMap} />
        </div>
        <div className="second-block">
          <img className="note-taking-pic" src={noteTaking} />
          <div className="second-desc">
            <h3>Orginize Your Thoughts with Note Taking</h3>
            <p>Write down everything without ignoring any details.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
