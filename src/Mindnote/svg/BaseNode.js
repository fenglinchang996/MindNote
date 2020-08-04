import React, { useContext } from "react";
import StyleContext from "../StyleContext";

const BaseNode = (props) => {
  const { nodeData } = props;
  const { title, center, width, height, style } = nodeData;
  const { nodeContentStyle } = useContext(StyleContext);

  // Origin
  const origin = { x: center.x - 0.5 * width, y: center.y - 0.5 * height };

  return (
    <g>
      <rect
        x={origin.x}
        y={origin.y}
        width={width}
        height={height}
        style={style}
      ></rect>
      <foreignObject
        x={origin.x + ((1 - nodeContentStyle.widthRatio) / 2) * width}
        y={origin.y + ((1 - nodeContentStyle.heightRatio) / 2) * height}
        width={nodeContentStyle.widthRatio * width}
        height={nodeContentStyle.heightRatio * height}
      >
        <div style={nodeContentStyle.style}>
          <div style={{ textAlign: "center" }}>
            {title ? title : "Click to Add Note"}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};
export default BaseNode;
