import React, { useState, useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { ITEM_TYPE } from "./enums";

const Node = (props) => {
  const { nodeData, hoverNode, unHoverNode } = props;
  const { id, style } = nodeData;
  const { nodeStyle } = useContext(StyleContext);
  const { setSelectedItem } = useContext(ItemContext);

  return (
    <g
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        setSelectedItem({ type: ITEM_TYPE.NODE, id });
      }}
      onMouseOver={() => hoverNode(id)}
      onMouseLeave={() => {
        unHoverNode();
      }}
    >
      <BaseNode nodeData={{ ...nodeData, style: style || nodeStyle.style }} />
    </g>
  );
};

export default Node;
