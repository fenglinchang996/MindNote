import React, { useState, useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
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
    case LIST_ACTION_TYPE.INIT_ITEMS:
      return [...action.items];
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
  const getCurve = (curveId) => curveList.find((curve) => curve.id === curveId);
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
  const { mindnoteId } = useParams();
  // Get mindnote data from database
  useEffect(() => {
    if (mindnoteId) {
      const mindnoteRef = db.collection("mindnotes").doc(mindnoteId);
      mindnoteRef
        .get()
        .then((mindnoteDoc) => {
          if (mindnoteDoc.exists) {
            const mindnote = mindnoteDoc.data();
            dispatchNodes({
              type: LIST_ACTION_TYPE.INIT_ITEMS,
              items: mindnote.nodeList,
            });
            dispatchCurves({
              type: LIST_ACTION_TYPE.INIT_ITEMS,
              items: mindnote.curveList,
            });
          } else {
            // mindnoteDoc.data() will be undefined in this case
            console.log("No such mindnote!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, []);
  // Save(Update) mindnote data to database
  const saveMindnoteToDB = (nodeList, curveList) => {
    db.collection("mindnotes")
      .doc(mindnoteId)
      .update({
        nodeList,
        curveList,
        noteList: [],
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };
  return (
    <div className="mindnote">
      <div className="canvas">
        <ItemContext.Provider value={ItemContextValue}>
          <SVG />
        </ItemContext.Provider>
        <CommonTool
          saveMindnoteToDB={() => saveMindnoteToDB(nodeList, curveList)}
        />
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
