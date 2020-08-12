import React, { useState, useContext } from "react";
import StyleContext from "../StyleContext";
import { STROKE_TYPE } from "../utils/enums";
import ToolList from "./widget/ToolList";
import TargetSelect from "./TargetSelect";
import ColorSelect from "./ColorSelect";
import WidthSelect from "./WidthSelect";
import TypeSelect from "./TypeSelect";
import CornerSelect from "./CornerSelect";
import CloseBtn from "./CloseBtn";

const NodeTool = (props) => {
  const { maxLevel, isShowNodeTool, closeNodeTool, modifyNodeStyle } = props;
  // Level List for selecting Node(s)
  const levelList = [...Array(maxLevel + 1).keys()].map((n) => n);
  const [targetLevel, setTargetLevel] = useState(0);
  const { defaultNodeStyle, nodeStyles } = useContext(StyleContext);
  const currentNodeStyle = nodeStyles[targetLevel] || defaultNodeStyle;
  const { borderType, rxRatio, ryRatio, style } = currentNodeStyle;
  const { fill, stroke, strokeWidth } = style;
  const borderWidthList = [1, 2, 3, 4, 5, 6, 7, 8];
  const modifyBorderColor = (colorCode) => {
    modifyNodeStyle(targetLevel, { style: { stroke: colorCode } });
  };
  const modifyBorderWidth = (newWidth) => {
    modifyNodeStyle(targetLevel, {
      style: {
        strokeWidth: newWidth,
        strokeDasharray: modifyStrokeDasharray(borderType, newWidth),
      },
    });
  };
  const modifyStrokeDasharray = (borderType, width) => {
    switch (borderType) {
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
  const modifyBorderType = (borderType, width) => {
    modifyNodeStyle(targetLevel, {
      borderType,
      style: { strokeDasharray: modifyStrokeDasharray(borderType, width) },
    });
  };
  const modifyBorderRadius = (rxRatio, ryRatio) => {
    modifyNodeStyle(targetLevel, { rxRatio, ryRatio });
  };
  const modifyFillColor = (colorCode) => {
    modifyNodeStyle(targetLevel, { style: { fill: colorCode } });
  };
  return (
    <div
      className="tool-box node-tool"
      style={{
        display: isShowNodeTool ? "block" : "none",
      }}
    >
      <div className="tool-main-title">
        Node <hr className="hori-sep" />
      </div>
      <CloseBtn action={closeNodeTool} />
      <ToolList title="Target">
        <TargetSelect
          maxLevel={maxLevel}
          levelList={levelList}
          targetLevel={targetLevel}
          setTargetLevel={setTargetLevel}
        />
      </ToolList>
      <ToolList title="Border">
        <ColorSelect colorCode={stroke} modifyColor={modifyBorderColor} />
        <WidthSelect
          colorCode={stroke}
          widthList={borderWidthList}
          modifyWidth={modifyBorderWidth}
        />
        <TypeSelect
          colorCode={stroke}
          width={strokeWidth}
          modifyType={modifyBorderType}
        />
        <CornerSelect
          colorCode={stroke}
          rxRatio={rxRatio}
          ryRatio={ryRatio}
          modifyBorderRadius={modifyBorderRadius}
        />
      </ToolList>
      <ToolList title="Fill">
        <ColorSelect colorCode={fill} modifyColor={modifyFillColor} />
      </ToolList>
    </div>
  );
};

export default NodeTool;
