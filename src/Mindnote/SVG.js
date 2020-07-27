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
  CURVE_DIRECTION,
  LIST_ACTION_TYPE,
  ITEM_TYPE,
  DRAG_TYPE,
  CLOCKFACE,
  CURVE_POINT_TYPE,
  CURVE_CONTROL_TYPE,
} from "./enums";
import {
  calcIntersectionPoint,
  calcCenterPoint,
  calcPointsDistance,
  calcOffset,
  calcMovingPoint,
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

  // nodeList, curveList, selectedItem
  const { nodeList, curveList, selectedItem } = props;
  // Style
  const { SVGStyle, nodeStyle, curveStyle, curvePointStyle } = useContext(
    StyleContext
  );
  // Item method
  const {
    dispatchNodes,
    getNode,
    dispatchCurves,
    getCurve,
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
    const offset = curvePointStyle.r;
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
    parentNodeId = null,
    upstreamCurveId = null,
    childNodesId = [],
    downstreamCurvesId = [],
    top = {
      direction: null,
      nodesId: [],
      curvesId: [],
    },
    right = {
      direction: null,
      nodesId: [],
      curvesId: [],
    },
    bottom = {
      direction: null,
      nodesId: [],
      curvesId: [],
    },
    left = {
      direction: null,
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
    let parentNodeRelationData, childNodeRelationData, curveRelationData;
    switch (actionType) {
      case "ADD":
        parentNodeRelationData = {
          childNodesId: parentNode.childNodesId.includes(childNode.id)
            ? parentNode.childNodesId
            : [...parentNode.childNodesId, childNode.id],
          downstreamCurvesId: parentNode.downstreamCurvesId.includes(curve.id)
            ? parentNode.downstreamCurvesId
            : [...parentNode.downstreamCurvesId, curve.id],
          [startEdge]: {
            direction: CURVE_DIRECTION.OUT,
            nodesId: parentNode[startEdge].nodesId.includes(childNode.id)
              ? parentNode[startEdge].nodesId
              : [...parentNode[startEdge].nodesId, childNode.id],
            curvesId: parentNode[startEdge].curvesId.includes(curve.id)
              ? parentNode[startEdge].curvesId
              : [...parentNode[startEdge].curvesId, curve.id],
          },
        };
        childNodeRelationData = {
          parentNodeId: parentNode.id,
          upstreamCurveId: curve.id,
          [endEdge]: {
            direction: CURVE_DIRECTION.IN,
            nodesId: [parentNode.id],
            curvesId: [curve.id],
          },
        };
        curveRelationData = {
          startNodeId: parentNode.id,
          endNodeId: childNode.id,
          startEdge,
          endEdge,
        };
        break;
      case "REMOVE":
        parentNodeRelationData = {
          childNodesId: parentNode.childNodesId.filter(
            (childNodeId) => childNodeId !== childNode.id
          ),
          downstreamCurvesId: parentNode.downstreamCurvesId.filter(
            (downstreamCurveId) => downstreamCurveId !== curve.id
          ),
          [startEdge]: {
            direction:
              parentNode[startEdge].nodesId.length === 1
                ? null
                : parentNode[startEdge].direction,
            nodesId: parentNode[startEdge].nodesId.filter(
              (nodeId) => nodeId !== childNode.id
            ),
            curvesId: parentNode[startEdge].curvesId.filter(
              (curveId) => curveId !== curve.id
            ),
          },
        };
        childNodeRelationData = {
          parentNodeId: null,
          upstreamCurveId: null,
          [endEdge]: {
            direction: null,
            nodesId: [],
            curvesId: [],
          },
        };
        curveRelationData = {
          startNodeId: null,
          endNodeId: null,
          startEdge: null,
          endEdge: null,
        };
        break;
      default:
        throw new Error(
          "You have to provide the action of Node and Curve relation!"
        );
    }
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
  const [currentStartEdge, setCurrentStartEdge] = useState(null);
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
    if (startNode[startEdge].direction !== CURVE_DIRECTION.IN) {
      setDragType(DRAG_TYPE.DRAW_NEW_NODE);
      setCurrentStartNode(startNode);
      setCurrentStartEdge(startEdge);
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

  // Modify Curve Control
  const [currentCurveControlType, setCurrentCurveControlType] = useState(null);
  const modifyCurveControl = (e, curveId, controlType) => {
    if (
      selectedItem &&
      selectedItem.type === ITEM_TYPE.CURVE &&
      selectedItem.id === curveId
    ) {
      setDragType(DRAG_TYPE.MODIFY_CURVE_CONTROL);
      setCurrentCurveControlType(controlType);
      const virtualCurve = { ...getCurve(selectedItem.id) };
      setVirtualCurve(virtualCurve);
    }
  };

  // Move Curve
  const [currentCurvePointType, setCurrentCurvePointType] = useState(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const hoverNode = (nodeId) => setHoveredNode(getNode(nodeId));
  const clacMinDistanceEdge = (newCurvePoint, newConnectionNode) => {
    const curveToEdge = [
      {
        edge: EDGE.TOP,
        d: calcPointsDistance(
          newCurvePoint,
          newConnectionNode.edgeCenters[`${EDGE.TOP}Center`]
        ),
      },
      {
        edge: EDGE.RIGHT,
        d: calcPointsDistance(
          newCurvePoint,
          newConnectionNode.edgeCenters[`${EDGE.RIGHT}Center`]
        ),
      },
      {
        edge: EDGE.BOTTOM,
        d: calcPointsDistance(
          newCurvePoint,
          newConnectionNode.edgeCenters[`${EDGE.BOTTOM}Center`]
        ),
      },
      {
        edge: EDGE.LEFT,
        d: calcPointsDistance(
          newCurvePoint,
          newConnectionNode.edgeCenters[`${EDGE.LEFT}Center`]
        ),
      },
    ];
    const minDistanceEdge = curveToEdge.reduce((prev, current) =>
      current.d < prev.d ? current : prev
    );

    return minDistanceEdge.edge;
  };
  const moveCurve = (e, curveId, pointType) => {
    if (
      selectedItem &&
      selectedItem.type === ITEM_TYPE.CURVE &&
      selectedItem.id === curveId
    ) {
      setDragType(DRAG_TYPE.MOVE_CURVE);
      setCurrentCurvePointType(pointType);
      const virtualCurve = { ...getCurve(selectedItem.id) };
      setVirtualCurve(virtualCurve);
    }
  };
  // Drag
  const [dragType, setDragType] = useState(null);
  const drag = (e) => {
    if (dragType) {
      if (dragType === DRAG_TYPE.MOVE_CANVAS) {
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
      } else if (dragType === DRAG_TYPE.DRAW_NEW_NODE) {
        // Get Start Node
        const startNode = currentStartNode;
        // Set End Node
        const endCenter = convertToSVGCoord({ x: e.clientX, y: e.clientY });
        const endNode = createNode({ center: endCenter });
        // Get Curve Connection
        const curveConnection = calcCurveConnections(startNode, endNode);
        // Set Curve
        const virtualCurve = createCurve({
          start: currentStartNode.connections[`${currentStartEdge}Connection`], // curveConnection.start,
          end: curveConnection.end,
        });
        // Set Virtual Node and Virtual Curve
        setVirtualNode(endNode);
        setVirtualCurve(virtualCurve);
      } else if (dragType === DRAG_TYPE.MODIFY_CURVE_CONTROL) {
        const newControlPoint = convertToSVGCoord({
          x: e.clientX,
          y: e.clientY,
        });
        const newVirtualCurve = {
          ...virtualCurve,
          [currentCurveControlType]: newControlPoint,
        };
        setVirtualCurve(newVirtualCurve);
      } else if (dragType === DRAG_TYPE.MOVE_CURVE) {
        const newCurvePoint = convertToSVGCoord({ x: e.clientX, y: e.clientY });
        const curveMovement = calcOffset(
          virtualCurve[currentCurvePointType],
          newCurvePoint
        );
        const newControlPoint = calcMovingPoint(
          virtualCurve[`${currentCurvePointType}Control`],
          curveMovement
        );
        const newVirtualCurve = {
          ...virtualCurve,
          [currentCurvePointType]: newCurvePoint,
          [`${currentCurvePointType}Control`]: newControlPoint,
        };
        setVirtualCurve(newVirtualCurve);
      }
    }
  };

  // Drop
  const drop = (e) => {
    if (dragType) {
      if (dragType === DRAG_TYPE.MOVE_CANVAS) {
      } else if (dragType === DRAG_TYPE.DRAW_NEW_NODE) {
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
          start: currentStartNode.connections[`${currentStartEdge}Connection`], // curveConnection.start,
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
          currentStartEdge, // curveConnection.startEdge,
          curveConnection.endEdge
        );
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
      } else if (dragType === DRAG_TYPE.MODIFY_CURVE_CONTROL) {
        const newControlPoint = convertToSVGCoord({
          x: e.clientX,
          y: e.clientY,
        });
        const originalCurve = getCurve(selectedItem.id);
        const updatedCurve = {
          ...originalCurve,
          [currentCurveControlType]: newControlPoint,
        };
        dispatchCurves({
          type: LIST_ACTION_TYPE.UPDATE_ITEMS,
          items: [updatedCurve],
        });
        setCurrentCurveControlType(null);
        setVirtualCurve(null);
      } else if (dragType === DRAG_TYPE.MOVE_CURVE) {
        const newConnectionNode = hoveredNode;
        const movingCurve = getCurve(selectedItem.id);
        if (newConnectionNode) {
          if (
            (currentCurvePointType === CURVE_POINT_TYPE.END &&
              newConnectionNode.id === movingCurve.endNodeId) ||
            (currentCurvePointType === CURVE_POINT_TYPE.START &&
              newConnectionNode.id !== movingCurve.endNodeId &&
              !getNode(movingCurve.endNodeId).childNodesId.some(
                (childId) => childId === newConnectionNode.id
              ))
          ) {
            const newCurvePoint = convertToSVGCoord({
              x: e.clientX,
              y: e.clientY,
            });
            const newConnectionEdge = clacMinDistanceEdge(
              newCurvePoint,
              newConnectionNode
            );
            if (
              (currentCurvePointType === CURVE_POINT_TYPE.END &&
                newConnectionNode[newConnectionEdge].direction !==
                  CURVE_DIRECTION.OUT) ||
              (currentCurvePointType === CURVE_POINT_TYPE.START &&
                newConnectionNode[newConnectionEdge].direction !==
                  CURVE_DIRECTION.IN)
            ) {
              const newConnectionPoint =
                newConnectionNode.connections[`${newConnectionEdge}Connection`];
              const curveMovement = calcOffset(
                movingCurve[currentCurvePointType],
                newConnectionPoint
              );
              const newControlPoint = calcMovingPoint(
                movingCurve[`${currentCurvePointType}Control`],
                curveMovement
              );

              const originalEndNode = getNode(movingCurve.endNodeId);
              const originalStartNode = getNode(movingCurve.startNodeId);

              let newStartNode, updatedOriginalStartNode, newEndNode, newCurve;
              let removeRelation, addRelation;
              switch (currentCurvePointType) {
                case CURVE_POINT_TYPE.END:
                  removeRelation = setNodeCurveRelation(
                    "REMOVE",
                    originalStartNode,
                    originalEndNode,
                    movingCurve,
                    movingCurve.startEdge,
                    movingCurve.endEdge
                  );
                  newStartNode = {
                    ...originalStartNode,
                    ...removeRelation.parentNodeRelationData,
                  };
                  newCurve = {
                    ...movingCurve,
                    ...removeRelation.curveRelationData,
                  };
                  newEndNode = {
                    ...originalEndNode,
                    ...removeRelation.childNodeRelationData,
                  };
                  addRelation = setNodeCurveRelation(
                    "ADD",
                    originalStartNode,
                    newConnectionNode,
                    movingCurve,
                    movingCurve.startEdge,
                    newConnectionEdge
                  );
                  newStartNode = {
                    ...newStartNode,
                    ...addRelation.parentNodeRelationData,
                  };
                  newCurve = { ...newCurve, ...addRelation.curveRelationData };
                  newEndNode = {
                    ...newEndNode,
                    ...addRelation.childNodeRelationData,
                  };
                  dispatchNodes({
                    type: LIST_ACTION_TYPE.UPDATE_ITEMS,
                    items: [newStartNode, newEndNode],
                  });
                  newCurve = {
                    ...newCurve,
                    [CURVE_POINT_TYPE.END]: newConnectionPoint,
                    [CURVE_CONTROL_TYPE.END_CONTROL]: newControlPoint,
                  };
                  dispatchCurves({
                    type: LIST_ACTION_TYPE.UPDATE_ITEMS,
                    items: [newCurve],
                  });
                  break;
                case CURVE_POINT_TYPE.START:
                  removeRelation = setNodeCurveRelation(
                    "REMOVE",
                    originalStartNode,
                    originalEndNode,
                    movingCurve,
                    movingCurve.startEdge,
                    movingCurve.endEdge
                  );
                  updatedOriginalStartNode = {
                    ...originalStartNode,
                    ...removeRelation.parentNodeRelationData,
                  };
                  newCurve = {
                    ...movingCurve,
                    ...removeRelation.curveRelationData,
                  };
                  newEndNode = {
                    ...originalEndNode,
                    ...removeRelation.childNodeRelationData,
                  };
                  addRelation = setNodeCurveRelation(
                    "ADD",
                    newConnectionNode,
                    originalEndNode,
                    movingCurve,
                    newConnectionEdge,
                    movingCurve.endEdge
                  );

                  newCurve = { ...newCurve, ...addRelation.curveRelationData };
                  newEndNode = {
                    ...newEndNode,
                    ...addRelation.childNodeRelationData,
                  };
                  if (originalStartNode.id === newConnectionNode.id) {
                    newStartNode = {
                      ...updatedOriginalStartNode,
                      ...addRelation.parentNodeRelationData,
                    };
                    dispatchNodes({
                      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
                      items: [newStartNode, newEndNode],
                    });
                  } else {
                    newStartNode = {
                      ...newConnectionNode,
                      ...addRelation.parentNodeRelationData,
                    };
                    dispatchNodes({
                      type: LIST_ACTION_TYPE.UPDATE_ITEMS,
                      items: [
                        updatedOriginalStartNode,
                        newStartNode,
                        newEndNode,
                      ],
                    });
                  }
                  newCurve = {
                    ...newCurve,
                    [CURVE_POINT_TYPE.START]: newConnectionPoint,
                    [CURVE_CONTROL_TYPE.START_CONTROL]: newControlPoint,
                  };
                  dispatchCurves({
                    type: LIST_ACTION_TYPE.UPDATE_ITEMS,
                    items: [newCurve],
                  });
                  break;
                default:
                  break;
              }
            }
          }
        }
        setCurrentCurvePointType(null);
        setVirtualCurve(null);
      }
      setDragType(null);
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
      <SVGContext.Provider
        value={{ drawNewNode, modifyCurveControl, moveCurve }}
      >
        {curveList.map((curve) => (
          <Curve key={curve.id} curveData={curve} />
        ))}
        {nodeList.map((node) => (
          <Node
            key={node.id}
            nodeData={node}
            hoverNode={hoverNode}
          />
        ))}
        {virtualNode && <VirtualNode nodeData={virtualNode} />}
        {virtualCurve && <VirtualCurve curveData={virtualCurve} />}
      </SVGContext.Provider>
    </svg>
  );
};

export default SVG;
