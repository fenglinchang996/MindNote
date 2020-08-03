import React, { useState, useContext, useEffect } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";

const wrapVirtualNode = (BaseNode) => (props) => {
  const { virtualNodeStyle } = useContext(StyleContext);
  const { nodeData } = props;
  const { width, height } = nodeData;
  if (width <= 0 || height <= 0) return <></>;
  return (
    <g>
      <BaseNode
        nodeData={{ ...nodeData, style: virtualNodeStyle.style }}
        isFocused={true}
      />
    </g>
  );
};

const VirtualNode = wrapVirtualNode(BaseNode);

export default VirtualNode;
