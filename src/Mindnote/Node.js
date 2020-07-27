import React, { useState, useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { ITEM_TYPE } from "./enums";

const wrapNode = (BaseNode) => (props) => {
  const { nodeData, hoverNode, deleteNode } = props;
  const { id, style } = nodeData;
  const { nodeStyle } = useContext(StyleContext);
  const { setSelectedItem } = useContext(ItemContext);
  // focusable
  const [isFocused, setIsFocused] = useState(false);

  return (
    <g
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        setIsFocused(true);
        setSelectedItem({ type: ITEM_TYPE.NODE, id });
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
      onMouseOver={() => hoverNode(id)}
    >
      <BaseNode
        nodeData={{ ...nodeData, style: style || nodeStyle.style }}
        isFocused={isFocused}
      />
    </g>
  );
};

const Node = wrapNode(BaseNode);

export default Node;
