import React, { useState, useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { ITEM_TYPE } from "./enums";

const wrapNode = (BaseNode) => (props) => {
  const { nodeData, hoverNode, deleteNode, moveNode, isSelected } = props;
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
      style={{ cursor: isFocused ? "move" : "auto" }}
      onMouseOver={() => hoverNode(id)}
      onKeyDown={(e) => {
        if (e.key === "Delete" || (e.metaKey && e.key === "Backspace")) {
          deleteNode(id);
        }
      }}
      onMouseDown={() => {
        if (isFocused) {
          moveNode(id);
        }
      }}
    >
      <BaseNode
        nodeData={{ ...nodeData, style: style || nodeStyle.style }}
        isFocused={isSelected}
      />
    </g>
  );
};

const Node = wrapNode(BaseNode);

export default Node;
