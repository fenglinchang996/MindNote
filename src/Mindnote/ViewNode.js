import React, { useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";

const ViewNode = (props) => {
  const { nodeData } = props;
  const { id, style } = nodeData;
  const { nodeStyle } = useContext(StyleContext);
  const { viewNodeStyle } = useContext(StyleContext);
  return (
    <g>
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style
            ? { ...style, ...viewNodeStyle.style }
            : {
                ...nodeStyle.style,
                ...viewNodeStyle.style,
              },
        }}
      />
    </g>
  );
};

export default ViewNode;
