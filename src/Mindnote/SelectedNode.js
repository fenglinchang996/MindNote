import React, { useState, useContext } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";
import { NODE_POINT_TYPE, EDGE } from "./enums";

const SelectedNode = (props) => {
  const { nodeData, deleteNode, moveNode, drawNewNode, resizeNode } = props;
  const { id, style, corners, connections } = nodeData;
  const { nodeStyle } = useContext(StyleContext);
  const { nodePointStyle, connectionArrowStyle } = useContext(StyleContext);
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
      style: { ...nodePointStyle.style, cursor: "nwse-resize" },
    },
    topRight: {
      cx: corners.topRight.x,
      cy: corners.topRight.y,
      r: nodePointStyle.r,
      style: { ...nodePointStyle.style, cursor: "nesw-resize" },
    },
    bottomRight: {
      cx: corners.bottomRight.x,
      cy: corners.bottomRight.y,
      r: nodePointStyle.r,
      style: { ...nodePointStyle.style, cursor: "nwse-resize" },
    },
    bottomLeft: {
      cx: corners.bottomLeft.x,
      cy: corners.bottomLeft.y,
      r: nodePointStyle.r,
      style: { ...nodePointStyle.style, cursor: "nesw-resize" },
    },
  };
  return (
    <g
      tabIndex={-1}
      style={{ cursor: "move" }}
      onKeyDown={(e) => {
        if (e.key === "Delete" || (e.metaKey && e.key === "Backspace")) {
          deleteNode(id);
        }
      }}
      onMouseDown={() => {
        moveNode(id);
      }}
    >
      <BaseNode nodeData={{ ...nodeData, style: style || nodeStyle.style }} />
      {connectionArrows && (
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
      )}

      {cornerCircles && (
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
      )}
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

export default SelectedNode;
