import React, { useState, useContext, useEffect } from "react";
import StyleContext from "../StyleContext";
import { STROKE_TYPE } from "../utils/enums";
import ToolList from "./widget/ToolList";
import TargetSelect from "./TargetSelect";
import ColorSelect from "./ColorSelect";
import WidthSelect from "./WidthSelect";
import TypeSelect from "./TypeSelect";
import CornerSelect from "./CornerSelect";
import CloseBtn from "./CloseBtn";
import { ITEM_TYPE } from "../utils/enums";
import ItemContext from "../ItemContext";

const NodeTool = (props) => {
  const {
    maxLevel,
    isShowNodeTool,
    closeNodeTool,
    modifyNodeStyle,
    selectedItem,
  } = props;
  const { getNode } = useContext(ItemContext);
  // Level List for selecting Node(s)
  const levelList = [...Array(maxLevel + 1).keys()].map((n) => n);
  const [targetLevel, setTargetLevel] = useState(0);
  useEffect(() => {
    if (targetLevel > maxLevel) {
      setTargetLevel(maxLevel);
    }
  }, [maxLevel]);
  useEffect(() => {
    if (selectedItem && selectedItem.type === ITEM_TYPE.NODE) {
      const selectedNode = getNode(selectedItem.id);
      setTargetLevel(selectedNode.level);
    }
  }, [selectedItem]);
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
      <ToolList title="Target">
        <TargetSelect
          levelList={levelList}
          targetLevelString={`Level ${targetLevel}`}
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
      <CloseBtn action={closeNodeTool} />
    </div>
  );
};

export default NodeTool;
