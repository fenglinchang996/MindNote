import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { ITEM_TYPE } from "./enums";

const Node = (props) => {
  const { nodeData, isFocused } = props;
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
  const { connectionArrowStyle } = useContext(StyleContext);

  // Origin
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  // Calculate and set Node origin
  useEffect(() => {
    setOrigin({ x: center.x - 0.5 * width, y: center.y - 0.5 * height });
  }, [center, width, height]);

  // Connection Arrow
  const connectionBlockLength = 20;
  const connectionArrows = {
    top: {
      x: connections.topConnection.x - 0.5 * connectionBlockLength,
      y: connections.topConnection.y - connectionBlockLength,
      width: connectionBlockLength,
      height: connectionBlockLength,
    },
    right: {
      x: connections.rightConnection.x,
      y: connections.rightConnection.y - 0.5 * connectionBlockLength,
      width: connectionBlockLength,
      height: connectionBlockLength,
    },
    bottom: {
      x: connections.bottomConnection.x - 0.5 * connectionBlockLength,
      y: connections.bottomConnection.y,
      width: connectionBlockLength,
      height: connectionBlockLength,
    },
    left: {
      x: connections.leftConnection.x - connectionBlockLength,
      y: connections.leftConnection.y - 0.5 * connectionBlockLength,
      width: connectionBlockLength,
      height: connectionBlockLength,
    },
  };

  return (
    <g>
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
            <ConnectionArrow arrowData={connectionArrows.top} fa="caret-up" />
            <ConnectionArrow
              arrowData={connectionArrows.right}
              fa="caret-right"
            />
            <ConnectionArrow
              arrowData={connectionArrows.bottom}
              fa="caret-down"
            />
            <ConnectionArrow
              arrowData={connectionArrows.left}
              fa="caret-left"
            />
          </>
        ) : (
          ""
        )}
      </g>
    </g>
  );
};

const ConnectionArrow = (props) => {
  const { arrowData, fa } = props;
  return (
    <foreignObject {...arrowData} cursor="pointer">
      <div className="connection-arrow">
        <i className={`fas fa-${fa}`}></i>
      </div>
    </foreignObject>
  );
};

export default Node;
