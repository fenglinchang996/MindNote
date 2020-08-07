import React, { useState, useEffect, useRef, useContext } from "react";
import StyleContext from "../StyleContext";

const CurveTool = (props) => {
  const { maxLevel, isShowCurveTool, closeCurveTool, modifyCurveStyle } = props;
  const [targetLevel, setTargetLevel] = useState(1);
  const modifyCurveColor = (colorCode) => {
    modifyCurveStyle(targetLevel, { style: { stroke: colorCode } });
  };
  const { defaultCurveStyle, curveStyles } = useContext(StyleContext);
  const currentCurveStyle = curveStyles[targetLevel] || defaultCurveStyle;
  return (
    <div
      className="tool-box curve-tool"
      style={{
        display: isShowCurveTool ? "block" : "none",
      }}
    >
      <div className="tool-main-title">
        Curve <hr className="hori-sep" />
      </div>
      <CloseBtn action={closeCurveTool} />
      <ToolList title="Target">
        <TargetSelect
          maxLevel={maxLevel}
          targetLevel={targetLevel}
          setTargetLevel={setTargetLevel}
        />
      </ToolList>
      <ToolList title="Style">
        <ColorSelect
          colorCode={currentCurveStyle.style.stroke}
          modifyCurveColor={modifyCurveColor}
        />
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <StrokeWidthIcon />
          </div>
          <span className="tool-trigger">
            <i className="fas fa-angle-down"></i>
          </span>
          <div className="tool-selector">12345</div>
        </div>
        <div className="tool-item tool-select">
          <div className="tool-icon">
            <StrokeTypeIcon />
          </div>
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
      </ToolList>
    </div>
  );
};

const ToolList = (props) => {
  const { title, children } = props;
  return (
    <div>
      <div className="tool-list">
        <div className="tool-subtitle">{title}</div>
        {children}
      </div>
    </div>
  );
};

const TargetSelect = (props) => {
  const { maxLevel, targetLevel, setTargetLevel } = props;
  const levelList = [...Array(maxLevel).keys()].map((n) => n + 1);
  const [isToolSelectorDisplayed, setIsToolSelectorDisplayed] = useState(false);
  const closeToolSelector = () => setIsToolSelectorDisplayed(false);
  return (
    <div className="tool-item tool-select">
      <div className="tool-text">
        {maxLevel > 0 ? `Level ${targetLevel}` : "No Curve"}
      </div>
      <ToolTrigger
        openToolSelector={() => {
          setIsToolSelectorDisplayed(true);
        }}
      />
      <ToolSelector
        isToolSelectorDisplayed={isToolSelectorDisplayed}
        closeToolSelector={closeToolSelector}
      >
        {levelList.length > 0
          ? levelList.map((n) => (
              <ToolOption
                key={n}
                action={() => {
                  setIsToolSelectorDisplayed(false);
                  setTargetLevel(n);
                }}
              >{`Level ${n}`}</ToolOption>
            ))
          : "None"}
      </ToolSelector>
    </div>
  );
};

const ColorSelect = (props) => {
  const { colorCode, modifyCurveColor } = props;
  return (
    <div className="tool-item tool-select">
      <div className="tool-icon">
        <div
          className="color-block"
          style={{
            backgroundColor: colorCode,
          }}
        ></div>
      </div>
      <span className="tool-trigger">
        <input
          type="color"
          className="color-trigger"
          value={colorCode}
          onChange={(e) => modifyCurveColor(e.target.value)}
        />
        <i className="fas fa-angle-down"></i>
      </span>
    </div>
  );
};

const ToolTrigger = (props) => {
  const { openToolSelector } = props;
  return (
    <span className="tool-trigger" onClick={openToolSelector}>
      <i className="fas fa-angle-down"></i>
    </span>
  );
};
const ToolSelector = (props) => {
  const { isToolSelectorDisplayed, closeToolSelector, children } = props;
  const selectorRef = useRef(null);
  useEffect(() => {
    if (isToolSelectorDisplayed) {
      selectorRef.current.focus();
    }
  }, [isToolSelectorDisplayed]);
  return (
    <div
      tabIndex={-1}
      ref={selectorRef}
      className="tool-selector"
      style={{ display: isToolSelectorDisplayed ? "block" : "none" }}
      onBlur={closeToolSelector}
    >
      {children}
    </div>
  );
};
const ToolOption = (props) => {
  const { children, action } = props;
  return (
    <div className="tool-option" onClick={action}>
      {children}
    </div>
  );
};

const CloseBtn = (props) => {
  const { action } = props;
  return (
    <button type="button" className="tool-close-btn" onClick={action}>
      <i className="fas fa-times"></i>
    </button>
  );
};

const StrokeWidthIcon = (props) => (
  <svg viewBox="0 0 100 100">
    <line x1="0" y1="15" x2="100" y2="15" stroke="black" strokeWidth="4"></line>
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
);

const StrokeTypeIcon = (props) => (
  <svg viewBox="0 0 100 100">
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
);

export default CurveTool;
