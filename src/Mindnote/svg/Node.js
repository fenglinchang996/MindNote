import React, { useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "../StyleContext";
import ItemContext from "../ItemContext";
import { ITEM_TYPE } from "../utils/enums";

const Node = (props) => {
  const { nodeData, hoverNode, unHoverNode } = props;
  const { id, level, style } = nodeData;
  const { defaultNodeStyle, nodeStyles } = useContext(StyleContext);
  const { setSelectedItem } = useContext(ItemContext);
  const defaultStyle = nodeStyles[level] || defaultNodeStyle;
  return (
    <g
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        setSelectedItem({ type: ITEM_TYPE.NODE, id });
      }}
      onPointerOver={() => {
        hoverNode(id);
      }}
      onPointerLeave={() => {
        unHoverNode();
      }}
    >
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style || defaultStyle.style,
        }}
      />
    </g>
  );
};

export default Node;
