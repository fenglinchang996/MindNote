import React, { useState, useEffect, useContext, useRef } from "react";
import { v4 as uuid } from "uuid";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import SVGContext from "./SVGContext";
import VirtualNode from "./VirtualNode";
import Node from "./Node";
import VirtualCurve from "./VirtualCurve";
import Curve from "./Curve";
import {
  EDGE,
  CURVE_IN_OUT,
  LIST_ACTION_TYPE,
  ITEM_TYPE,
  DRAG_TYPE,
  CLOCKFACE,
} from "./enums";
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
    getNode,
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
    id = null,
    center,
    width = nodeStyle.width,
    height = nodeStyle.height,
    style = null,
    curveIn = null,
    parentNodeId = null,
    upstreamCurveId = null,
    childNodesId = [],
    downstreamCurvesId = [],
    top = {
      nodesId: [],
      curvesId: [],
    },
    right = {
      nodesId: [],
      curvesId: [],
    },
    bottom = {
      nodesId: [],
      curvesId: [],
    },
    left = {
      nodesId: [],
      curvesId: [],
    },
  } = {}) => {
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
      curveIn,
      parentNodeId,
      upstreamCurveId,
      childNodesId,
      downstreamCurvesId,
      top,
      right,
      bottom,
      left,
    };
  };
  const setNodeCurveRelation = (
    actionType,
    parentNode,
    childNode,
    curve,
    startEdge,
    endEdge
  ) => {
    switch (actionType) {
      case "ADD":
        const parentNodeRelationData = {
          childNodesId: [...parentNode.childNodesId, childNode.id],
          downstreamCurvesId: [...parentNode.downstreamCurvesId, curve.id],
          [startEdge]: {
            nodesId: [...parentNode[startEdge].nodesId, childNode.id],
            curvesId: [...parentNode[startEdge].curvesId, curve.id],
          },
        };
        const childNodeRelationData = {
          curveIn: endEdge,
          parentNodeId: parentNode.id,
          upstreamCurveId: curve.id,
          [endEdge]: {
            nodesId: [...childNode[endEdge].nodesId, parentNode.id],
            curvesId: [...childNode[endEdge].curvesId, curve.id],
          },
        };
        const curveRelationData = {
          startNodeId: parentNode.id,
          endNodeId: childNode.id,
          startEdge,
          endEdge,
        };

        return {
          parentNodeRelationData,
          childNodeRelationData,
          curveRelationData,
        };
      case "REMOVE":
        break;
      default:
        break;
    }
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
    id = null,
    start,
    end,
    startNodeId = null,
    endNodeId = null,
    startEdge = null,
    endEdge = null,
    style = null,
  } = {}) => {
    const { startControl, endControl } = calcCurveControl(start, end);
    return {
      id,
      start,
      end,
      startControl,
      endControl,
      startNodeId,
      endNodeId,
      startEdge,
      endEdge,
      style,
    };
  };
  // Virtual Curve
  const [virtualCurve, setVirtualCurve] = useState(null);

  // Initialize Canvas
  useEffect(() => {
    // Create Center Node if no nodeList Data
    if (SVGSize.height !== 0 && SVGSize.width !== 0 && nodeList.length === 0) {
      const center = {
        x: 0.5 * SVGSize.width,
        y: 0.5 * SVGSize.height,
      };
      const centerNode = createNode({ id: uuid(), center });
      dispatchNodes({ type: LIST_ACTION_TYPE.ADD_ITEMS, items: [centerNode] });
    }
  }, [SVGSize, nodeList]);

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

  // Draw new Node
  const [currentStartNode, setCurrentStartNode] = useState(null);
  const calcCurveConnections = (startNode, endNode) => {
    const topIntersect = calcIntersectionPoint(
      startNode.center,
      endNode.center,
      startNode.corners.topLeft,
      startNode.corners.topRight
    );
    const rightIntersect = calcIntersectionPoint(
      startNode.center,
      endNode.center,
      startNode.corners.topRight,
      startNode.corners.bottomRight
    );
    const bottomIntersect = calcIntersectionPoint(
      startNode.center,
      endNode.center,
      startNode.corners.bottomRight,
      startNode.corners.bottomLeft
    );
    const leftIntersect = calcIntersectionPoint(
      startNode.center,
      endNode.center,
      startNode.corners.bottomLeft,
      startNode.corners.topLeft
    );
    let curveDirection;
    // CLOCKFACE
    if (topIntersect) {
      curveDirection =
        topIntersect.x < startNode.center.x ? CLOCKFACE.ELEVEN : CLOCKFACE.ONE;
    } else if (rightIntersect) {
      curveDirection =
        rightIntersect.y < startNode.center.y ? CLOCKFACE.TWO : CLOCKFACE.FOUR;
    } else if (bottomIntersect) {
      curveDirection =
        bottomIntersect.x < startNode.center.x
          ? CLOCKFACE.SEVEN
          : CLOCKFACE.FIVE;
    } else if (leftIntersect) {
      curveDirection =
        leftIntersect.y < startNode.center.y ? CLOCKFACE.TEN : CLOCKFACE.EIGHT;
    } else {
      curveDirection = null;
    }
    let start;
    let end;
    let startEdge;
    let endEdge;
    switch (curveDirection) {
      case CLOCKFACE.ELEVEN:
      case CLOCKFACE.ONE:
        start = startNode.connections.topConnection;
        end = endNode.connections.bottomConnection;
        startEdge = EDGE.TOP;
        endEdge = EDGE.BOTTOM;
        break;
      case CLOCKFACE.TWO:
      case CLOCKFACE.FOUR:
        start = startNode.connections.rightConnection;
        end = endNode.connections.leftConnection;
        startEdge = EDGE.RIGHT;
        endEdge = EDGE.LEFT;
        break;
      case CLOCKFACE.FIVE:
      case CLOCKFACE.SEVEN:
        start = startNode.connections.bottomConnection;
        end = endNode.connections.topConnection;
        startEdge = EDGE.BOTTOM;
        endEdge = EDGE.TOP;
        break;
      case CLOCKFACE.EIGHT:
      case CLOCKFACE.TEN:
        start = startNode.connections.leftConnection;
        end = endNode.connections.rightConnection;
        startEdge = EDGE.LEFT;
        endEdge = EDGE.RIGHT;
        break;
      default:
        start = startNode.center;
        end = endNode.center;
        startEdge = null;
        endEdge = null;
        break;
    }
    return { start, end, startEdge, endEdge };
  };
  const drawNewNode = (e, startNodeId, startEdge) => {
    // Get Start Node
    const startNode = getNode(startNodeId);
    // If edge is not in, then draw a new node
    if (startNode.curveIn !== startEdge) {
      setDragType(DRAG_TYPE.DRAW_NEW_NODE);
      setCurrentStartNode(startNode);
      // Set End Node
      const endCenter = convertToSVGCoord({ x: e.clientX, y: e.clientY });
      const endNode = createNode({ center: endCenter });
      // Get Curve Connection
      const curveConnection = calcCurveConnections(startNode, endNode);
      // Set Curve
      const virtualCurve = createCurve({
        start: curveConnection.start,
        end: curveConnection.end,
      });
      // Set Virtual Node and Virtual Curve
      setVirtualNode(endNode);
      setVirtualCurve(virtualCurve);
    }
  };

  // Drag
  const [dragType, setDragType] = useState(null);
  const drag = (e) => {
    switch (dragType) {
      case DRAG_TYPE.MOVE_CANVAS:
        const previousCursorSVGCoord = convertToSVGCoord({
          x: e.clientX,
          y: e.clientY,
        });
        const newCursorSVGCoord = convertToSVGCoord({
          x: e.clientX + e.movementX,
          y: e.clientY + e.movementY,
        });
        const cursorSVGMovement = {
          dx: newCursorSVGCoord.x - previousCursorSVGCoord.x,
          dy: newCursorSVGCoord.y - previousCursorSVGCoord.y,
        };
        setViewBoxOrigin({
          x: viewBoxOrigin.x - cursorSVGMovement.dx,
          y: viewBoxOrigin.y - cursorSVGMovement.dy,
        });
        break;
      case DRAG_TYPE.DRAW_NEW_NODE:
        // Get Start Node
        const startNode = currentStartNode;
        // Set End Node
        const endCenter = convertToSVGCoord({ x: e.clientX, y: e.clientY });
        const endNode = createNode({ center: endCenter });
        // Get Curve Connection
        const curveConnection = calcCurveConnections(startNode, endNode);
        // Set Curve
        const virtualCurve = createCurve({
          start: curveConnection.start,
          end: curveConnection.end,
        });
        // Set Virtual Node and Virtual Curve
        setVirtualNode(endNode);
        setVirtualCurve(virtualCurve);
      default:
        break;
    }
  };

  // Drop
  const drop = (e) => {
    switch (dragType) {
      case DRAG_TYPE.MOVE_CANVAS:
        break;
      case DRAG_TYPE.DRAW_NEW_NODE:
        // Get Start Node
        const startNode = currentStartNode;
        // Create End Node
        const endCenter = convertToSVGCoord({ x: e.clientX, y: e.clientY });
        const endNode = createNode({
          id: uuid(),
          center: endCenter,
        });
        // Get Curve Connection
        const curveConnection = calcCurveConnections(startNode, endNode);
        // Create Curve
        const curve = createCurve({
          id: uuid(),
          start: curveConnection.start,
          end: curveConnection.end,
        });
        // Set Node and Curve Relation
        const {
          parentNodeRelationData,
          childNodeRelationData,
          curveRelationData,
        } = setNodeCurveRelation(
          "ADD",
          startNode,
          endNode,
          curve,
          curveConnection.startEdge,
          curveConnection.endEdge
        );
        console.log(parentNodeRelationData);
        const newStartNode = { ...startNode, ...parentNodeRelationData };
        const newEndNode = { ...endNode, ...childNodeRelationData };
        const newCurve = { ...curve, ...curveRelationData };
        // Add (and Update) Nodes and Curves
        dispatchNodes({
          type: LIST_ACTION_TYPE.ADD_ITEMS,
          items: [newEndNode],
        });
        dispatchNodes({
          type: LIST_ACTION_TYPE.UPDATE_ITEMS,
          items: [newStartNode],
        });
        dispatchCurves({
          type: LIST_ACTION_TYPE.ADD_ITEMS,
          items: [newCurve],
        });
        // Set Virtual Node and Virtual Curve
        setVirtualNode(null);
        setVirtualCurve(null);
        break;
      default:
        break;
    }
    setDragType(null);
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
      <SVGContext.Provider value={{ drawNewNode }}>
        {curveList.map((curve) => (
          <Curve key={curve.id} curveData={curve} />
        ))}
        {nodeList.map((node) => (
          <Node key={node.id} nodeData={node} />
        ))}
        {virtualNode && <VirtualNode nodeData={virtualNode} />}
        {virtualCurve && <VirtualCurve curveData={virtualCurve} />}
      </SVGContext.Provider>
    </svg>
  );
};

export default SVG;
