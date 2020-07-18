import React from "react";
import "./Docs.css";
import docPic from "./Mind-Map-Paper.svg";

const Docs = () => {
  return (
    <div className="docs">
      <Header />
      <DocList />
    </div>
  );
};

const Header = (props) => {
  return (
    <header className="header">
      <div className="title">MindNote</div>
      <nav className="navbar">
        <div className="navbar-item">My Mindnotes</div>
        <div className="navbar-item">Public Mindnotes</div>
      </nav>
      <div className="member">
        <i className="fas fa-user-alt"></i>
      </div>
    </header>
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
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Docs;
