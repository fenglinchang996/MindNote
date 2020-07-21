import React, { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuid } from "uuid";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import VirtualNode from "./VirtualNode";
import Node from "./Node";
import VirtualCurve from "./VirtualCurve";
import Curve from "./Curve";
import { LIST_ACTION_TYPE, ITEM_TYPE, DRAG_TYPE } from "./enums";
import {
  calcIntersectionPoint,
  calcCenterPoint,
  calcPointsDistance,
  calcOffset,
} from "./math";

// prevent browser default zooming action
document.addEventListener(
  "wheel",
  (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  },
  {
    passive: false,
  }
);

const SVG = (props) => {
  // SVG
  const convertToSVGCoord = ({ x, y }) => {
    const clientPoint = SVGRef.current.createSVGPoint();
    clientPoint.x = x;
    clientPoint.y = y;
    const CTM = SVGRef.current.getScreenCTM();
    const SVGPoint = clientPoint.matrixTransform(CTM.inverse());
    return { x: SVGPoint.x, y: SVGPoint.y };
  };
  const SVGRef = useRef(null);
  const [SVGSize, setSVGSize] = useState({
    width: 1920,
    height: 1080,
  });
  const [SVGSizeRatio, setSVGSizeRatio] = useState(1);
  const [viewBoxOrigin, setViewBoxOrigin] = useState({ x: 0, y: 0 });

  // Style
  const { SVGStyle, nodeStyle, curveStyle } = useContext(StyleContext);
  // Item: NodeList, CurveList
  const {
    nodeList,
    dispatchNodes,
    curveList,
    dispatchCurves,
    selectedItem,
    setSelectedItem,
  } = useContext(ItemContext);

  // Node
  const calcNodeCorners = (center, width, height) => {
    const halfWidth = 0.5 * width;
    const halfHeight = 0.5 * height;
    return {
      topLeft: { x: center.x - halfWidth, y: center.y - halfHeight },
      topRight: { x: center.x + halfWidth, y: center.y - halfHeight },
      bottomRight: { x: center.x + halfWidth, y: center.y + halfHeight },
      bottomLeft: { x: center.x - halfWidth, y: center.y + halfHeight },
    };
  };
  const calcNodeEdgeCenters = (topLeft, topRight, bottomRight, bottomLeft) => {
    return {
      topCenter: calcCenterPoint(topLeft, topRight),
      rightCenter: calcCenterPoint(topRight, bottomRight),
      bottomCenter: calcCenterPoint(bottomRight, bottomLeft),
      leftCenter: calcCenterPoint(bottomLeft, topLeft),
    };
  };
  const calcNodeEdgeConnections = (
    topCenter,
    rightCenter,
    bottomCenter,
    leftCenter,
    offset
  ) => {
    return {
      topConnection: { x: topCenter.x, y: topCenter.y - offset },
      rightConnection: { x: rightCenter.x + offset, y: rightCenter.y },
      bottomConnection: { x: bottomCenter.x, y: bottomCenter.y + offset },
      leftConnection: { x: leftCenter.x - offset, y: leftCenter.y },
    };
  };
  const calcNodeCoord = (center, width, height) => {
    const corners = calcNodeCorners(center, width, height);
    const { topLeft, topRight, bottomRight, bottomLeft } = corners;
    const edgeCenters = calcNodeEdgeCenters(
      topLeft,
      topRight,
      bottomRight,
      bottomLeft
    );
    const { topCenter, rightCenter, bottomCenter, leftCenter } = edgeCenters;
    const offset = 0.5 * nodeStyle.style.strokeWidth;
    const connections = calcNodeEdgeConnections(
      topCenter,
      rightCenter,
      bottomCenter,
      leftCenter,
      offset
    );
    return {
      corners,
      edgeCenters,
      connections,
    };
  };
  const createNode = ({
    center,
    width = nodeStyle.width,
    height = nodeStyle.height,
    style = null,
    parentId = null,
    upstreamCurveId = null,
    childrenId = [],
    downstreamCurvesId = [],
    top = {
      curveInOut: null,
      childrenId: [],
      curvesId: [],
    },
    right = {
      curveInOut: null,
      childrenId: [],
      curvesId: [],
    },
    bottom = {
      curveInOut: null,
      childrenId: [],
      curvesId: [],
    },
    left = {
      curveInOut: null,
      childrenId: [],
      curvesId: [],
    },
  } = {}) => {
    const id = uuid();
    const { corners, edgeCenters, connections } = calcNodeCoord(
      center,
      width,
      height
    );
    return {
      id,
      center,
      width,
      height,
      corners,
      edgeCenters,
      connections,
      style,
      parentId,
      upstreamCurveId,
      childrenId,
      downstreamCurvesId,
      top,
      right,
      bottom,
      left,
    };
  };
  // Virtual Node
  const [virtualNode, setVirtualNode] = useState(null);

  // Curve
  const calcCurveControl = (start, end) => {
    const directionVector = { a: end.x - start.x, b: end.y - start.y };
    const startFraction = 0.4;
    const endFraction = 0.6;
    const startOffset = {
      dx: directionVector.a * startFraction,
      dy: directionVector.b * startFraction,
    };
    const endOffset = {
      dx: directionVector.a * endFraction,
      dy: directionVector.b * endFraction,
    };
    let startControl = {
      x: start.x + startOffset.dx,
      y: start.y + startOffset.dy,
    };
    let endControl = { x: start.x + endOffset.dx, y: start.y + endOffset.dy };
    return { startControl, endControl };
  };
  const createCurve = ({
    start,
    end,
    startNode = null,
    endNode = null,
    startEdge = null,
    endEdge = null,
    style = null,
  } = {}) => {
    const id = uuid();
    const { startControl, endControl } = calcCurveControl(start, end);
    return {
      id,
      start,
      end,
      startControl,
      endControl,
      startNode,
      endNode,
      startEdge,
      endEdge,
      style,
    };
  };
  // Virtual Curve
  const [virtualCurve, setVirtualCurve] = useState(null);

  // Initialize Canvas
  useEffect(() => {
    // Todo: get Node List from database asynchronously
    // Create Center Node
    if (SVGSize.height !== 0 && SVGSize.width !== 0 && nodeList.length === 0) {
      const center = {
        x: 0.5 * SVGSize.width,
        y: 0.5 * SVGSize.height,
      };
      const centerNode = createNode({ center });
      dispatchNodes({ type: LIST_ACTION_TYPE.ADD_ITEMS, items: [centerNode] });
    }
  }, [SVGSize, nodeList]);

  // Drag
  const [dragType, setDragType] = useState(null);
  const drag = (e) => {
    switch (dragType) {
      case DRAG_TYPE.MOVE_CANVAS:
        setViewBoxOrigin({
          x: viewBoxOrigin.x - e.movementX,
          y: viewBoxOrigin.y - e.movementY,
        });
        break;
      default:
        break;
    }
  };

  // Drop
  const drop = (e) => {
    switch (dragType) {
      case DRAG_TYPE.MOVE_CANVAS:
        break;
      default:
        break;
    }
    setDragType(null);
  };

  // Move Canvas
  const moveCanvas = () => setDragType(DRAG_TYPE.MOVE_CANVAS);

  // Resize Canvas
  const resizeCanvas = (deltaRatio) => {
    if (SVGSizeRatio < 0.5) {
      deltaRatio > 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else if (SVGSizeRatio > 2) {
      deltaRatio < 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else {
      setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    }
  };

  return (
    <svg
      tabIndex={-1}
      id="svg"
      className="svg"
      xmlns="http://www.w3.org/2000/svg"
      ref={SVGRef}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox={`${viewBoxOrigin.x} ${viewBoxOrigin.y} ${
        SVGSizeRatio * SVGSize.width
      } ${SVGSizeRatio * SVGSize.height}`}
      style={SVGStyle.style}
      onFocus={() => setSelectedItem({ type: ITEM_TYPE.SVG })}
      onWheel={(e) => {
        if (e.ctrlKey) {
          resizeCanvas(0.0002 * e.deltaY);
        }
      }}
      onMouseDown={(e) => {
        if (e.target === SVGRef.current) {
          moveCanvas();
        }
      }}
      onMouseMove={drag}
      onMouseUp={drop}
    >
      {nodeList.map((node) => (
        <Node key={node.id} nodeData={node} />
      ))}
    </svg>
  );
};

export default SVG;
