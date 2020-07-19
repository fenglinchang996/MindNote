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
        x: connections.topConnection.x - 10,
        y: connections.topConnection.y - 20,
        width: 20,
        height: 20,
      },
      right: {
        x: connections.rightConnection.x,
        y: connections.rightConnection.y - 10,
        width: 20,
        height: 20,
      },
      bottom: {
        x: connections.bottomConnection.x - 10,
        y: connections.bottomConnection.y,
        width: 20,
        height: 20,
      },
      left: {
        x: connections.leftConnection.x - 20,
        y: connections.leftConnection.y - 10,
        width: 20,
        height: 20,
      },
    });
  }, [connections]);

  // focusable
  const [isFocused, setIsFocused] = useState(false);

  return (
    <g
      tabIndex={-1}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      <rect
        x={origin.x}
        y={origin.y}
        width={width}
        height={height}
        style={style}
      ></rect>
      <g display={isFocused ? "block" : "none"}>
        {connectionArrows ? (
          <>
            <foreignObject {...connectionArrows.top} cursor="pointer">
              <div className="connection-arrow">
                <i className="fas fa-caret-up"></i>
              </div>
            </foreignObject>
            <foreignObject {...connectionArrows.right} cursor="pointer">
              <div className="connection-arrow">
                <i className="fas fa-caret-right"></i>
              </div>
            </foreignObject>
            <foreignObject {...connectionArrows.bottom} cursor="pointer">
              <div className="connection-arrow">
                <i className="fas fa-caret-down"></i>
              </div>
            </foreignObject>
            <foreignObject {...connectionArrows.left} cursor="pointer">
              <div className="connection-arrow">
                <i className="fas fa-caret-left"></i>
              </div>
            </foreignObject>
          </>
        ) : (
          ""
        )}
      </g>
    </g>
  );
};

export default Node;
