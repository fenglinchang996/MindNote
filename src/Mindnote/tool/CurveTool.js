import React, { useState, useContext } from "react";
import StyleContext from "../StyleContext";
import { STROKE_TYPE } from "../utils/enums";
import ToolList from "./widget/ToolList";
import TargetSelect from "./TargetSelect";
import ColorSelect from "./ColorSelect";
import WidthSelect from "./WidthSelect";
import TypeSelect from "./TypeSelect";
import CloseBtn from "./CloseBtn";

const CurveTool = (props) => {
  const { maxLevel, isShowCurveTool, closeCurveTool, modifyCurveStyle } = props;
  // Level List for selecting Curve(s)
  const levelList = [...Array(maxLevel).keys()].map((n) => n + 1);
  const [targetLevel, setTargetLevel] = useState(1);
  const { defaultCurveStyle, curveStyles } = useContext(StyleContext);
  const currentCurveStyle = curveStyles[targetLevel] || defaultCurveStyle;
  const { type, style } = currentCurveStyle;
  const { stroke, strokeWidth, strokeLinecap, strokeDasharray } = style;
  const widthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
      case STROKE_TYPE.SOLID:
        return "none";
      case STROKE_TYPE.SHORT_DASH:
        return [2 * width, 2 * width];
      case STROKE_TYPE.LONG_DASH:
        return [4 * width, 2 * width];
      case STROKE_TYPE.DOT:
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
          levelList={levelList}
          targetLevel={targetLevel}
          setTargetLevel={setTargetLevel}
        />
      </ToolList>
      <ToolList title="Style">
        <ColorSelect colorCode={stroke} modifyColor={modifyCurveColor} />
        <WidthSelect
          colorCode={stroke}
          widthList={widthList}
          modifyWidth={modifyCurveWidth}
        />
        <TypeSelect
          colorCode={stroke}
          width={strokeWidth}
          modifyType={modifyCurveType}
        />
      </ToolList>
    </div>
  );
};

export default CurveTool;
