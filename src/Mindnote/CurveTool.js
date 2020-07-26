import React, { useState } from "react";

const CurveTool = (props) => {
  const { isShowCurveTool } = props;
  return (
    <div
      className="tool-box"
      style={{
        display: isShowCurveTool ? "block" : "none",
        top: "120px",
        left: "20px",
      }}
    >
      <div className="tool-main-title">
        Curve <hr className="hori-sep" />
      </div>
      <button type="button" className="tool-close-btn">
        <i className="fas fa-times"></i>
      </button>
      <div className="tool-list">
        <div className="tool-subtitle">Style</div>
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
          <div className="tool-icon">
            <i className="fas fa-long-arrow-alt-right"></i>
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
      </div>
    </div>
  );
};

export default CurveTool;
