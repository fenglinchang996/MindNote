import React from "react";
import "./Home.css";
import mindMapIcon from "./mind-map-icon.svg"; // https://www.iconfinder.com/icons/3209313/avatar_circuit_customer_digital_mind_icon
import noteTakingIcon from "./note-taking-icon.svg"; // https://www.iconfinder.com/icons/4212916/education_note_notes_student_icon
import mindMap from "./mind-map-pic.png";
import noteTaking from "./note-taking-pic.png";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="home">
      <main className="main">
        <div className="main-block">
          <div className="main-title">
            <h1 className="title">Mind Mapping</h1>
            <i className="fas fa-plus"></i>
            <h1 className="title">Note Taking</h1>
          </div>
          <div className="main-desc">
            <h3 className="desc">Map Out Your Ideas Visually</h3>
            <h3 className="desc">and</h3>
            <h3 className="desc">Organize Them Detaily</h3>
          </div>
          <div className="main-content">
            <div>
              <Link className="main-btn sign-up-btn" to="/member/signup">
                Try MindNote for Free
              </Link>
            </div>
            <div>
              <Link className="main-btn gallery-btn" to="/docs/public">
                View People's Mindnotes &nbsp;
                <i className="fas fa-chevron-right"></i>
              </Link>
            </div>
          </div>
          <div className="main-content">
            Already had mindnotes?&nbsp;
            <Link className="link" to="/member/login">
              Log in
            </Link>
            &nbsp;here.
          </div>
          <img className="main-pic mind-map" src={mindMapIcon} />
          <img className="main-pic note-taking" src={noteTakingIcon} />
        </div>
        <div className="second-block">
          <div className="second-desc">
            <img className="icon" src={mindMapIcon} />
            <h3>Visualize Your Ideas with Mind Mapping</h3>
            <p>See your ideas in a whole picture effectively.</p>
          </div>
          <img className="pic" src={mindMap} />
        </div>
        <div className="second-block">
          <div className="second-desc">
            <img className="icon" src={noteTakingIcon} />
            <h3>Orginize Your Thoughts with Note Taking</h3>
            <p>Write down everything without ignoring any details.</p>
          </div>
          <img className="pic" src={noteTaking} />
        </div>
      </main>
    </div>
  );
};

export default Home;
