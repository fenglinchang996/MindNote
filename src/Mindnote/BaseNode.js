import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import SVGContext from "./SVGContext";
import { ITEM_TYPE, NODE_POINT_TYPE } from "./enums";
import { EDGE } from "./enums";

const BaseNode = (props) => {
  const { nodeData, isFocused } = props;
  const {
    id,
    noteId,
    title,
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
  const { nodePointStyle, nodeContentStyle, connectionArrowStyle } = useContext(
    StyleContext
  );
  const { drawNewNode, resizeNode } = useContext(SVGContext);

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

  // Corner Circle
  const cornerCircles = {
    topLeft: {
      cx: corners.topLeft.x,
      cy: corners.topLeft.y,
      r: nodePointStyle.r,
      style: nodePointStyle.style,
    },
    topRight: {
      cx: corners.topRight.x,
      cy: corners.topRight.y,
      r: nodePointStyle.r,
      style: nodePointStyle.style,
    },
    bottomRight: {
      cx: corners.bottomRight.x,
      cy: corners.bottomRight.y,
      r: nodePointStyle.r,
      style: nodePointStyle.style,
    },
    bottomLeft: {
      cx: corners.bottomLeft.x,
      cy: corners.bottomLeft.y,
      r: nodePointStyle.r,
      style: nodePointStyle.style,
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
      <g display={isFocused ? "block" : "none"}>
        {connectionArrows ? (
          <>
            <ConnectionArrow
              arrowData={connectionArrows.top}
              fa="caret-up"
              drawNewNode={(e) => drawNewNode(e, id, EDGE.TOP)}
            />
            <ConnectionArrow
              arrowData={connectionArrows.right}
              fa="caret-right"
              drawNewNode={(e) => drawNewNode(e, id, EDGE.RIGHT)}
            />
            <ConnectionArrow
              arrowData={connectionArrows.bottom}
              fa="caret-down"
              drawNewNode={(e) => drawNewNode(e, id, EDGE.BOTTOM)}
            />
            <ConnectionArrow
              arrowData={connectionArrows.left}
              fa="caret-left"
              drawNewNode={(e) => drawNewNode(e, id, EDGE.LEFT)}
            />
          </>
        ) : (
          ""
        )}
      </g>
      <g display={isFocused ? "block" : "none"}>
        {cornerCircles ? (
          <>
            <circle
              {...cornerCircles.topLeft}
              onMouseDown={(e) => {
                e.stopPropagation();
                resizeNode(id, NODE_POINT_TYPE.TOP_LEFT);
              }}
            />
            <circle
              {...cornerCircles.topRight}
              onMouseDown={(e) => {
                e.stopPropagation();
                resizeNode(id, NODE_POINT_TYPE.TOP_RIGHT);
              }}
            />
            <circle
              {...cornerCircles.bottomRight}
              onMouseDown={(e) => {
                e.stopPropagation();
                resizeNode(id, NODE_POINT_TYPE.BOTTOM_RIGHT);
              }}
            />
            <circle
              {...cornerCircles.bottomLeft}
              onMouseDown={(e) => {
                e.stopPropagation();
                resizeNode(id, NODE_POINT_TYPE.BOTTOM_LEFT);
              }}
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
  const { arrowData, fa, drawNewNode } = props;
  return (
    <foreignObject
      {...arrowData}
      cursor="pointer"
      onMouseDown={(e) => {
        e.stopPropagation();
        drawNewNode(e);
      }}
    >
      <div className="connection-arrow">
        <i className={`fas fa-${fa}`}></i>
      </div>
    </foreignObject>
  );
};

export default BaseNode;
