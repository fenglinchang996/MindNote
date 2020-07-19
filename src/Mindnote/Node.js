import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";

const Node = (props) => {
  const { connectionArrowStyle } = useContext(StyleContext);
  const { nodeData } = props;
  const {
    id,
    center,
    width,
    height,
    style,
    corners,
    edgeCenters,
    connections,
    parentId,
    upstreamCurveId,
    childrenId,
    downstreamCurvesId,
    top,
    right,
    left,
    bottom,
  } = nodeData;

  // Origin
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  // Calculate and set Node origin
  useEffect(() => {
    setOrigin({ x: center.x - 0.5 * width, y: center.y - 0.5 * height });
  }, [center, width, height]);

  // Connection Arrow
  const connectionArrowOffset = 5;
  const [connectionArrows, setConnectionArrows] = useState(null);
  useEffect(() => {
    setConnectionArrows({
      top: {
        x1: connections.topConnection.x,
        y1: connections.topConnection.y,
        x2: connections.topConnection.x,
        y2: connections.topConnection.y - connectionArrowOffset,
      },
      right: {
        x1: connections.rightConnection.x,
        y1: connections.rightConnection.y,
        x2: connections.rightConnection.x + connectionArrowOffset,
        y2: connections.rightConnection.y,
      },
      bottom: {
        x1: connections.bottomConnection.x,
        y1: connections.bottomConnection.y,
        x2: connections.bottomConnection.x,
        y2: connections.bottomConnection.y + connectionArrowOffset,
      },
      left: {
        x1: connections.leftConnection.x,
        y1: connections.leftConnection.y,
        x2: connections.leftConnection.x - connectionArrowOffset,
        y2: connections.leftConnection.y,
      },
    });
  }, [connections]);

  return (
    <g tabIndex={-1}>
      <rect
        x={origin.x}
        y={origin.y}
        width={width}
        height={height}
        style={style}
      ></rect>
      <g>
        <defs>
          <marker
            id="Arrow"
            markerWidth="10"
            markerHeight="10"
            refX="0"
            refY="5"
            orient="auto"
          >
            <polygon
              points="0,0 10,5 0,10"
              style={connectionArrowStyle.style}
            />
          </marker>
        </defs>
        {connectionArrows ? (
          <>
            <line {...connectionArrows.top} markerEnd="url(#Arrow)" />
            <line {...connectionArrows.right} markerEnd="url(#Arrow)" />
            <line {...connectionArrows.bottom} markerEnd="url(#Arrow)" />
            <line {...connectionArrows.left} markerEnd="url(#Arrow)" />
          </>
        ) : (
          ""
        )}
      </g>
    </g>
  );
};

export default Node;
