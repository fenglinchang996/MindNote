import React, { useState } from "react";

const Note = (props) => {
  const { isShowNote, closeTool } = props;
  return (
    <div
      className="tool-box note"
      style={{ display: isShowNote ? "block" : "none" }}
    >
      <div className="tool-main-title">
        Note
        <hr className="hori-sep" />
      </div>
      <button type="button" className="tool-close-btn" onClick={closeTool}>
        <i className="fas fa-times"></i>
      </button>
      <Toolbar />
      <TextArea />
    </div>
  );
};

const Toolbar = (props) => {
  return (
    <div className="toolbar">
      <div className="tool-list">
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <i className="fas fa-font"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
        <div className="tool-item tool-select">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-highlighter"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-bold"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-italic"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-underline"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon text-color-icon">
            <i className="fas fa-strikethrough"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-list-ul"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-list-ol"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-table"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-link"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-image"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

const TextArea = (props) => {
  return (
    <div className="text-area">
      <div className="text-view"></div>
      <div className="text-edit">
        <textarea
          className="text-content"
          placeholder="Type something..."
          rows="15"
        ></textarea>
      </div>
    </div>
  );
};

export default Note;
