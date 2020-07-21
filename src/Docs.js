import React from "react";
import Header from "./Header";
import "./Docs.css";
import docPic from "./Mind-Map-Paper.svg";
import { Link } from "react-router-dom";

const Docs = () => {
  return (
    <div className="docs">
      <Header>
        <nav className="navbar">
          <div className="navbar-item">My Mindnotes</div>
          <div className="navbar-item">Public Mindnotes</div>
        </nav>
      </Header>
      <DocList />
    </div>
  );
};

const DocList = (props) => {
  const docList = [
    {
      title: "Your First Mindnote",
      creator: "FLC",
      creatorId: "12345",
      createDate: "2020/07/18",
      mindnoteId: "ttyyudg",
    },
  ];
  return (
    <div className="doc-list">
      {docList.map((doc) => {
        const { title, creator, createDate, mindnoteId } = doc;
        return (
          <div key={mindnoteId} className="doc">
            <div className="doc-diagram">
              <img src={docPic} />
            </div>
            <div className="doc-info">
              <span className="doc-title">{title}</span>
            </div>
          </div>
        );
      })}
      <div className="doc new-doc">
        <button className="add-mindnote-btn">
          <Link to="/mindnote">
            <i className="fas fa-plus"></i>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Docs;
