import React, { useEffect, useContext, useRef } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "./StyleContext";
import { NODE_POINT_TYPE, EDGE } from "./enums";

const SelectedNode = (props) => {
  const {
    nodeData,
    deleteNode,
    moveNode,
    drawNewNode,
    resizeNode,
    autoResizeNode,
  } = props;
  const {
    id,
    center,
    width,
    height,
    style,
    corners,
    connections,
    top,
    right,
    bottom,
    left,
    title,
  } = nodeData;
  const {
    nodeStyle,
    nodeContentStyle,
    selectedNodeStyle,
    nodePointStyle,
    connectionArrowStyle,
  } = useContext(StyleContext);
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

  // Origin
  const origin = { x: center.x - 0.5 * width, y: center.y - 0.5 * height };
  // Content reference
  const contentRef = useRef(null);
  // Add mount reference
  const mount = useRef(false);
  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else {
      const rect = contentRef.current.getBoundingClientRect();
      const clientTopLeft = { x: rect.left, y: rect.top };
      const clientBottomRight = { x: rect.right, y: rect.bottom };
      autoResizeNode(id, clientTopLeft, clientBottomRight);
    }
  }, [title]);
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
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style
            ? { ...style, ...selectedNodeStyle.style }
            : { ...nodeStyle.style, ...selectedNodeStyle.style },
        }}
      />
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
      <foreignObject
        x={origin.x + 0.05 * width}
        y={origin.y + 0.1 * height}
        width={0.9 * width}
        height={0.8 * height}
      >
        <div style={nodeContentStyle.style}>
          <div style={{ textAlign: "center" }} ref={contentRef}>
            {title ? title : "Untitled"}
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
