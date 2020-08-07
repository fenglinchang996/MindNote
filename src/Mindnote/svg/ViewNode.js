import React, { useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "../StyleContext";

const ViewNode = (props) => {
  const { nodeData } = props;
  const { level, style } = nodeData;
  const { defaultNodeStyle, nodeStyles, viewNodeStyle } = useContext(
    StyleContext
  );
  const defaultStyle = nodeStyles[level] || defaultNodeStyle;
  return (
    <g>
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style
            ? { ...style, ...viewNodeStyle.style }
            : {
                ...defaultStyle.style,
                ...viewNodeStyle.style,
              },
        }}
      />
    </g>
  );
};

export default ViewNode;
