import React, { useState } from "react";

const NodeTool = (props) => {
  const { isShowNodeTool, closeTool } = props;
  return (
    <div
      className="tool-box node-tool"
      style={{
        display: isShowNodeTool ? "block" : "none",
        top: "280px",
        left: "20px",
      }}
    >
      <div className="tool-main-title">
        Node <hr className="hori-sep" />
      </div>
      <button type="button" className="tool-close-btn" onClick={closeTool}>
        <i className="fas fa-times"></i>
      </button>
      <div className="tool-list">
        <div className="tool-subtitle">Border</div>
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <div
              className="color-block"
              style={{
                backgroundColor: "#1d3557",
              }}
            ></div>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
        <div className="tool-item tool-select">
          <svg className="tool-icon" viewBox="0 0 100 100">
            <line
              x1="0"
              y1="15"
              x2="100"
              y2="15"
              stroke="black"
              strokeWidth="4"
            ></line>
            <line
              x1="0"
              y1="45"
              x2="100"
              y2="45"
              stroke="black"
              strokeWidth="10"
            ></line>
            <line
              x1="0"
              y1="80"
              x2="100"
              y2="80"
              stroke="black"
              strokeWidth="20"
            ></line>
          </svg>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
        <div className="tool-item tool-select">
          <svg className="tool-icon" viewBox="0 0 100 100">
            <line
              x1="0"
              y1="15"
              x2="100"
              y2="15"
              stroke="black"
              strokeWidth="10"
            ></line>
            <line
              x1="0"
              y1="45"
              x2="100"
              y2="45"
              stroke="black"
              strokeWidth="10"
              strokeDasharray="20, 10"
            ></line>
            <line
              x1="0"
              y1="80"
              x2="100"
              y2="80"
              stroke="black"
              strokeWidth="10"
              strokeDasharray="2, 20"
              strokeLinecap="round"
            ></line>
          </svg>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
        <div className="tool-item tool-select">
          <svg className="tool-icon" viewBox="0 0 100 100">
            <path
              d="M25 25 h25 q25 0, 25 25 v25"
              stroke="#1d3557"
              strokeWidth="5"
              fill="none"
            />
          </svg>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
      </div>
      <div className="tool-list">
        <div className="tool-subtitle">Fill</div>
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <div
              className="color-block"
              style={{
                backgroundColor: "#1d3557",
              }}
            ></div>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
      </div>
      <div className="tool-list">
        <div className="tool-subtitle">Text</div>
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <i className="fas fa-font"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-bold"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-italic"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-underline"></i>
          </div>
        </div>
        <div className="tool-item tool-btn">
          <div className="tool-icon">
            <i className="fas fa-strikethrough"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NodeTool;
