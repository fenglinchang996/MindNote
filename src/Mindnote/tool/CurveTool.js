import React, { useState, useContext, useEffect } from "react";
import StyleContext from "../StyleContext";
import { STROKE_TYPE } from "../utils/enums";
import ToolList from "./widget/ToolList";
import TargetSelect from "./TargetSelect";
import ColorSelect from "./ColorSelect";
import WidthSelect from "./WidthSelect";
import TypeSelect from "./TypeSelect";
import CloseBtn from "./CloseBtn";
import { ITEM_TYPE } from "../utils/enums";
import ItemContext from "../ItemContext";

const CurveTool = (props) => {
  const {
    maxLevel,
    isShowCurveTool,
    closeCurveTool,
    modifyCurveStyle,
    selectedItem,
  } = props;
  const { getCurve } = useContext(ItemContext);
  // Level List for selecting Curve(s)
  const levelList = [...Array(maxLevel).keys()].map((n) => n + 1);
  const [targetLevel, setTargetLevel] = useState(1);
  useEffect(() => {
    if (maxLevel === 0) {
      setTargetLevel(1);
    } else if (targetLevel > maxLevel) {
      setTargetLevel(maxLevel);
    }
  }, [maxLevel]);
  useEffect(() => {
    if (selectedItem && selectedItem.type === ITEM_TYPE.CURVE) {
      const selectedCurve = getCurve(selectedItem.id);
      setTargetLevel(selectedCurve.level);
    }
  }, [selectedItem]);
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
      <ToolList title="Target">
        <TargetSelect
          levelList={levelList}
          targetLevelString={maxLevel > 0 ? `Level ${targetLevel}` : "No Curve"}
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
      {maxLevel === 0 && <ForbiddenLayer />}
      <CloseBtn action={closeCurveTool} />
    </div>
  );
};

const ForbiddenLayer = () => <div className="forbidden-layer"></div>;

export default CurveTool;
