import React, { useEffect, useContext, useRef } from "react";
import BaseNode from "./BaseNode";
import StyleContext from "../StyleContext";
import { NODE_POINT_TYPE, EDGE } from "../utils/enums";

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const SelectedNode = (props) => {
  const { nodeData, moveNode, drawNewNode, resizeNode, autoResizeNode } = props;
  const {
    id,
    level,
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
    parentNodeId,
  } = nodeData;
  const {
    defaultNodeStyle,
    nodeStyles,
    nodeContentStyle,
    selectedNodeStyle,
    nodePointStyle,
    connectionArrowStyle,
  } = useContext(StyleContext);
  // The style of selected Node
  const defaultStyle = nodeStyles[level] || defaultNodeStyle;
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
  // Compare prev id
  const prevId = usePrevious(id);
  // Automatically resize Node
  useEffect(() => {
    if (!mount.current) {
      mount.current = true;
    } else {
      if (prevId === id) {
        const rect = contentRef.current.getBoundingClientRect();
        const clientTopLeft = { x: rect.left, y: rect.top };
        const clientBottomRight = { x: rect.right, y: rect.bottom };
        autoResizeNode(id, clientTopLeft, clientBottomRight);
      }
    }
  }, [title, id]);
  return (
    <g
      tabIndex={-1}
      style={{ cursor: parentNodeId ? "move" : "not-allowed" }}
      onPointerDown={() => {
        moveNode(id);
      }}
      className="selected-node"
    >
      <BaseNode
        nodeData={{
          ...nodeData,
          style: style
            ? { ...style, ...selectedNodeStyle.style }
            : { ...defaultStyle.style, ...selectedNodeStyle.style },
        }}
      />
      {connectionArrows && (
        <>
          <ConnectionArrow
            arrowData={connectionArrows.top}
            fa="chevron-up"
            drawNewNode={(e) => drawNewNode(e, id, EDGE.TOP)}
          />
          <ConnectionArrow
            arrowData={connectionArrows.right}
            fa="chevron-right"
            drawNewNode={(e) => drawNewNode(e, id, EDGE.RIGHT)}
          />
          <ConnectionArrow
            arrowData={connectionArrows.bottom}
            fa="chevron-down"
            drawNewNode={(e) => drawNewNode(e, id, EDGE.BOTTOM)}
          />
          <ConnectionArrow
            arrowData={connectionArrows.left}
            fa="chevron-left"
            drawNewNode={(e) => drawNewNode(e, id, EDGE.LEFT)}
          />
        </>
      )}
      {cornerCircles && (
        <>
          <CornerCircle
            cornerCircleData={cornerCircles.topLeft}
            resizeNode={() => resizeNode(id, NODE_POINT_TYPE.TOP_LEFT)}
          />
          <CornerCircle
            cornerCircleData={cornerCircles.topRight}
            resizeNode={() => resizeNode(id, NODE_POINT_TYPE.TOP_RIGHT)}
          />
          <CornerCircle
            cornerCircleData={cornerCircles.bottomRight}
            resizeNode={() => resizeNode(id, NODE_POINT_TYPE.BOTTOM_RIGHT)}
          />
          <CornerCircle
            cornerCircleData={cornerCircles.bottomLeft}
            resizeNode={() => resizeNode(id, NODE_POINT_TYPE.BOTTOM_LEFT)}
          />
        </>
      )}
      <foreignObject
        x={origin.x + ((1 - nodeContentStyle.widthRatio) / 2) * width}
        y={origin.y + ((1 - nodeContentStyle.heightRatio) / 2) * height}
        width={nodeContentStyle.widthRatio * width}
        height={nodeContentStyle.heightRatio * height}
      >
        <div style={nodeContentStyle.style}>
          <div style={{ textAlign: "center" }} ref={contentRef}>
            {title ? title : "Untitled"}
          </div>
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
      onPointerDown={(e) => {
        e.stopPropagation();
        drawNewNode(e);
      }}
    >
      <div
        className="connection-arrow"
        title="Drag and Dorp to Create New Node"
      >
        <i className={`fas fa-${fa}`}></i>
      </div>
    </foreignObject>
  );
};

const CornerCircle = (props) => {
  const { cornerCircleData, resizeNode } = props;
  return (
    <circle
      {...cornerCircleData}
      onPointerDown={(e) => {
        e.stopPropagation();
        resizeNode();
      }}
    />
  );
};

export default SelectedNode;
