import React, { useState, useEffect, useRef, useContext } from "react";
import StyleContext from "../StyleContext";

const CURVE_TYPE = {
  SOLID: "Solid",
  SHORT_DASH: "Short Dash",
  LONG_DASH: "Long Dash",
  DOT: "Dot",
};

const CurveTool = (props) => {
  const { maxLevel, isShowCurveTool, closeCurveTool, modifyCurveStyle } = props;
  const [targetLevel, setTargetLevel] = useState(1);
  const { defaultCurveStyle, curveStyles } = useContext(StyleContext);
  const currentCurveStyle = curveStyles[targetLevel] || defaultCurveStyle;
  const { type, style } = currentCurveStyle;
  const { stroke, strokeWidth, strokeLinecap, strokeDasharray } = style;
  const modifyCurveColor = (colorCode) => {
    modifyCurveStyle(targetLevel, { style: { stroke: colorCode } });
  };
  const modifyCurveWidth = (newWidth) => {
    modifyCurveStyle(targetLevel, {
      style: {
        strokeWidth: newWidth,
        strokeDasharray: modifyStrokeDasharray(type, newWidth),
      },
    });
  };
  const modifyStrokeDasharray = (type, width) => {
    switch (type) {
      case CURVE_TYPE.SOLID:
        return "none";
      case CURVE_TYPE.SHORT_DASH:
        return [width, 2 * width];
      case CURVE_TYPE.LONG_DASH:
        return [2 * width, 2 * width];
      case CURVE_TYPE.DOT:
        return [1, 2 * width];
      default:
        break;
    }
  };
  const modifyCurveType = (type, width) => {
    modifyCurveStyle(targetLevel, {
      type,
      style: { strokeDasharray: modifyStrokeDasharray(type, width) },
    });
  };
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
        <ColorSelect colorCode={stroke} modifyCurveColor={modifyCurveColor} />
        <WidthSelect colorCode={stroke} modifyWidth={modifyCurveWidth} />
        <TypeSelect
          colorCode={stroke}
          width={strokeWidth}
          modifyType={modifyCurveType}
        />
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
  return (
    <ToolSelect>
      <div className="tool-text">
        {maxLevel > 0 ? `Level ${targetLevel}` : "No Curve"}
      </div>
      <ToolSelector>
        {levelList.length > 0
          ? levelList.map((n) => (
              <ToolOption
                key={n}
                action={() => {
                  setTargetLevel(n);
                }}
              >{`Level ${n}`}</ToolOption>
            ))
          : "None"}
      </ToolSelector>
    </ToolSelect>
  );
};
const ColorSelect = (props) => {
  const { colorCode, modifyCurveColor } = props;
  return (
    <ToolSelect>
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
    </ToolSelect>
  );
};
const WidthSelect = (props) => {
  const { colorCode, modifyWidth } = props;
  const widthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ToolSelect>
      <div className="tool-icon">
        <StrokeWidthIcon colorCode={colorCode} />
      </div>
      <ToolSelector>
        {widthList.map((width) => (
          <ToolOption key={width} action={() => modifyWidth(width)}>
            <WidthIcon width={width} colorCode={colorCode} />
            &nbsp; {width}
          </ToolOption>
        ))}
      </ToolSelector>
    </ToolSelect>
  );
};
const StrokeWidthIcon = (props) => (
  <svg viewBox="0 0 100 100">
    <line
      x1="0"
      y1="15"
      x2="100"
      y2="15"
      stroke={props.colorCode}
      strokeWidth="4"
    ></line>
    <line
      x1="0"
      y1="45"
      x2="100"
      y2="45"
      stroke={props.colorCode}
      strokeWidth="10"
    ></line>
    <line
      x1="0"
      y1="80"
      x2="100"
      y2="80"
      stroke={props.colorCode}
      strokeWidth="20"
    ></line>
  </svg>
);
const WidthIcon = (props) => {
  const { width, colorCode } = props;
  return (
    <div className="tool-icon">
      <svg viewBox="0 0 100 100">
        <line
          x1={0}
          y1={50}
          x2={100}
          y2={50}
          stroke={colorCode}
          strokeWidth={width * 2}
        />
      </svg>
    </div>
  );
};
const TypeSelect = (props) => {
  const { colorCode, width, modifyType } = props;
  return (
    <ToolSelect>
      <div className="tool-icon">
        <StrokeTypeIcon colorCode={colorCode} />
      </div>
      <ToolSelector>
        {Object.values(CURVE_TYPE).map((type) => (
          <ToolOption key={type} action={() => modifyType(type, width)}>
            <TypeIcon type={type} colorCode={colorCode} />
            {type}
          </ToolOption>
        ))}
      </ToolSelector>
    </ToolSelect>
  );
};
const StrokeTypeIcon = (props) => (
  <svg viewBox="0 0 100 100">
    <line
      x1="0"
      y1="15"
      x2="100"
      y2="15"
      stroke={props.colorCode}
      strokeWidth="10"
    />
    <line
      x1="0"
      y1="45"
      x2="100"
      y2="45"
      stroke={props.colorCode}
      strokeWidth="10"
      strokeDasharray="20, 10"
    />
    <line
      x1="0"
      y1="80"
      x2="100"
      y2="80"
      stroke={props.colorCode}
      strokeWidth="10"
      strokeDasharray="2, 20"
      strokeLinecap="round"
    />
  </svg>
);

const TypeIcon = (props) => {
  const { type, colorCode } = props;
  const getDasharray = (type) => {
    switch (type) {
      case CURVE_TYPE.SOLID:
        return "none";
      case CURVE_TYPE.LONG_DASH:
        return [20, 20];
      case CURVE_TYPE.SHORT_DASH:
        return [10, 10];
      case CURVE_TYPE.DOT:
        return [1, 20];
      default:
        break;
    }
  };
  return (
    <div className="tool-icon">
      <svg viewBox="0 0 100 100">
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke={colorCode}
          strokeWidth="10"
          strokeDasharray={getDasharray(type)}
        />
      </svg>
    </div>
  );
};

const ToolSelect = (props) => {
  const { children } = props;
  return <div className="tool-item tool-select">{children}</div>;
};
const ToolSelector = (props) => {
  const { children } = props;
  const [isToolSelectorDisplayed, setIsToolSelectorDisplayed] = useState(false);
  const openToolSelector = () => setIsToolSelectorDisplayed(true);
  const closeToolSelector = () => setIsToolSelectorDisplayed(false);
  const selectorRef = useRef(null);
  useEffect(() => {
    if (isToolSelectorDisplayed) {
      selectorRef.current.focus();
    }
  }, [isToolSelectorDisplayed]);
  return (
    <>
      <span className="tool-trigger" onClick={openToolSelector}>
        <i className="fas fa-angle-down"></i>
      </span>
      <div
        tabIndex={-1}
        ref={selectorRef}
        className="tool-selector"
        style={{ display: isToolSelectorDisplayed ? "block" : "none" }}
        onBlur={closeToolSelector}
        onClick={closeToolSelector}
      >
        {children}
      </div>
    </>
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

export default CurveTool;
