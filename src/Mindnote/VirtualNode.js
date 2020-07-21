import React, { useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";

const wrapVirtualNode = (BaseNode) => (props) => {
  const { virtualNodeStyle } = useContext(StyleContext);
  const { nodeData } = props;
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
