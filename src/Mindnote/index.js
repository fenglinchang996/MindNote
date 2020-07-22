import React, { useState, useReducer, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import SVG from "./SVG";
import CommonTool from "./CommonTool";
import NodeTool from "./NodeTool";
import CurveTool from "./CurveTool";
import Note from "./Note";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { LIST_ACTION_TYPE, SHOW_TOOL_TYPE, TOOL_TYPE } from "./enums";
import "./Mindnote.css";

const listReducer = (list, action) => {
  switch (action.type) {
    case LIST_ACTION_TYPE.ADD_ITEMS:
      return [...list, ...action.items];
    case LIST_ACTION_TYPE.UPDATE_ITEMS:
      const unChangedItems = list.filter(
        (item) =>
          !action.items.some(
            (itemToBeUpdated) => itemToBeUpdated.id === item.id
          )
      );
      return [...unChangedItems, ...action.items];
    case LIST_ACTION_TYPE.DELETE_ITEMS:
      return list.filter(
        (item) =>
          !action.items.some(
            (itemToBeDeleted) => itemToBeDeleted.id === item.id
          )
      );
    default:
      return list;
  }
};
const showToolReducer = (isShowTool, action) => {
  switch (action.type) {
    case SHOW_TOOL_TYPE.SHOW_NODE_TOOL:
      return { ...isShowTool, showNodeTool: true };
    case SHOW_TOOL_TYPE.SHOW_CURVE_TOOL:
      return { ...isShowTool, showCurveTool: true };
    case SHOW_TOOL_TYPE.SHOW_NOTE:
      return { ...isShowTool, showNote: true };
    case SHOW_TOOL_TYPE.CLOSE_NODE_TOOL:
      return { ...isShowTool, showNodeTool: false };
    case SHOW_TOOL_TYPE.CLOSE_CURVE_TOOL:
      return { ...isShowTool, showCurveTool: false };
    case SHOW_TOOL_TYPE.CLOSE_NOTE:
      return { ...isShowTool, showNote: false };
    case SHOW_TOOL_TYPE.CLOSE_ALL:
      return { showNodeTool: false, showCurveTool: false, showNote: false };
    default:
      return isShowNote;
  }
};

const Mindnote = (props) => {
  const [nodeList, dispatchNodes] = useReducer(listReducer, []);
  const getNode = (nodeId) => nodeList.find((node) => node.id === nodeId);
  const [curveList, dispatchCurves] = useReducer(listReducer, []);
  const [isShowTool, dispatchShowTool] = useReducer(showToolReducer, {
    showNode: false,
    showCurve: false,
    showNote: false,
  });
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (selectedItem && selectedItem.type === "NODE") {
      dispatchShowTool({ type: SHOW_TOOL_TYPE.SHOW_NODE_TOOL });
      dispatchShowTool({ type: SHOW_TOOL_TYPE.SHOW_NOTE });
    } else {
      dispatchShowTool({ type: SHOW_TOOL_TYPE.CLOSE_ALL });
    }
  }, [selectedItem]);
  const ItemContextValue = {
    nodeList,
    dispatchNodes,
    getNode,
    curveList,
    dispatchCurves,
    selectedItem,
    setSelectedItem,
  };

  return (
    <div className="mindnote">
      <Header>
        <div className="go-back-btn">
          <Link to="/docs">
            <i className="fas fa-chevron-left"></i>&nbsp; Back
          </Link>
        </div>
      </Header>
      <div className="canvas">
        <ItemContext.Provider value={ItemContextValue}>
          <SVG />
        </ItemContext.Provider>
        <CommonTool />
        <NodeTool
          isShowNodeTool={isShowTool.showNodeTool}
          closeTool={() =>
            dispatchShowTool({ type: SHOW_TOOL_TYPE.CLOSE_NODE_TOOL })
          }
        />
        <CurveTool
          isShowCurveTool={isShowTool.showCurveTool}
          closeTool={() =>
            dispatchShowTool({ type: SHOW_TOOL_TYPE.CLOSE_CURVE_TOOL })
          }
        />
        <Note
          isShowNote={isShowTool.showNote}
          closeTool={() =>
            dispatchShowTool({ type: SHOW_TOOL_TYPE.CLOSE_NOTE })
          }
        />
      </div>
    </div>
  );
};

export default Mindnote;
