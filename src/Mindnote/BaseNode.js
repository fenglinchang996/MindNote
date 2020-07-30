import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";

const BaseNode = (props) => {
  const { nodeData } = props;
  const { title, center, width, height, style } = nodeData;
  const { nodeContentStyle } = useContext(StyleContext);

  // Origin
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  // Calculate and set Node origin
  useEffect(() => {
    setOrigin({ x: center.x - 0.5 * width, y: center.y - 0.5 * height });
  }, [center, width, height]);

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
        x={origin.x + 0.05 * width}
        y={origin.y + 0.1 * height}
        width={0.9 * width}
        height={0.8 * height}
      >
        <div style={nodeContentStyle.style}>
          <div style={{ textAlign: "center" }}>
            {title ? title : "Click to Add Note"}
          </div>
          <input
            type="text"
            style={{
              display: "none",
              width: "100%",
              border: "none",
              margin: "5px",
            }}
          />
        </div>
      </foreignObject>
    </g>
  );
};
export default BaseNode;
