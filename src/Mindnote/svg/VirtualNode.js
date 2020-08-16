import React, { useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "../StyleContext";

const VirtualNode = (props) => {
  const { defaultNodeStyle, nodeStyles, virtualNodeStyle } = useContext(
    StyleContext
  );
  const { nodeData } = props;
  const { level, width, height, style } = nodeData;
  const defaultStyle = nodeStyles[level] || defaultNodeStyle;
  if (width <= 0 || height <= 0) return <></>;
  return (
    <g>
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style
            ? { ...style, ...virtualNodeStyle.style }
            : { ...defaultStyle.style, ...virtualNodeStyle.style },
        }}
      />
    </g>
  );
};

export default VirtualNode;
