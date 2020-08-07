import React, { useState, useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import SVG from "./svg";
import Tool from "./tool";
import Note from "./note";
import Loading from "../Loading";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import UserContext from "../UserContext";
import {
  LIST_ACTION_TYPE,
  TOGGLE_TOOL_TYPE,
  ITEM_TYPE,
  MINDNOTE_MODE,
  DRAG_TYPE,
} from "./utils/enums";
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
            (itemToBeDeletedId) => itemToBeDeletedId === item.id
          )
      );
    default:
      return list;
  }
};
const toggleToolReducer = (isShowTool, action) => {
  switch (action.type) {
    case TOGGLE_TOOL_TYPE.SHOW_NODE_TOOL:
      return { ...isShowTool, showNodeTool: true };
    case TOGGLE_TOOL_TYPE.SHOW_CURVE_TOOL:
      return { ...isShowTool, showCurveTool: true };
    case TOGGLE_TOOL_TYPE.SHOW_NOTE:
      return { ...isShowTool, showNote: true };
    case TOGGLE_TOOL_TYPE.CLOSE_NODE_TOOL:
      return { ...isShowTool, showNodeTool: false };
    case TOGGLE_TOOL_TYPE.CLOSE_CURVE_TOOL:
      return { ...isShowTool, showCurveTool: false };
    case TOGGLE_TOOL_TYPE.CLOSE_NOTE:
      return { ...isShowTool, showNote: false };
    case TOGGLE_TOOL_TYPE.CLOSE_ALL:
      return { showNodeTool: false, showCurveTool: false, showNote: false };
    default:
      return isShowTool;
  }
};

const Mindnote = (props) => {
  const { docId, mindnoteId } = useParams();
  // Get mindnote data from database
  useEffect(() => {
    if (mindnoteId) {
      setIsSaving(true);
      const mindnoteRef = db.collection("mindnotes").doc(mindnoteId);
      mindnoteRef
        .get()
        .then((mindnoteDoc) => {
          if (mindnoteDoc.exists) {
            const mindnote = mindnoteDoc.data();
            if (mindnote.nodeList.length !== 0) {
              dispatchNodes({
                type: LIST_ACTION_TYPE.INIT_ITEMS,
                items: mindnote.nodeList,
              });
              dispatchCurves({
                type: LIST_ACTION_TYPE.INIT_ITEMS,
                items: mindnote.curveList,
              });
              dispatchNotes({
                type: LIST_ACTION_TYPE.INIT_ITEMS,
                items: mindnote.noteList,
              });
            }
            setIsSaving(false);
          } else {
            // mindnoteDoc.data() will be undefined in this case
            console.log("No such mindnote!");
          }
        })
        .catch((error) => {
          console.log("Error getting mindnote:", error);
        });
    }
  }, []);
  // Doc Data
  const [doc, setDoc] = useState(null);
  // Get doc data from database
  useEffect(() => {
    if (docId) {
      const docRef = db.collection("docs").doc(docId);
      docRef
        .get()
        .then((docDoc) => {
          if (docDoc.exists) {
            const doc = docDoc.data();
            setDoc(doc);
          } else {
            // docDoc.data() will be undefined in this case
            console.log("No such doc!");
          }
        })
        .catch((error) => {
          console.log("Error getting doc:", error);
        });
    }
  }, []);
  // Mindnote data
  const [nodeList, dispatchNodes] = useReducer(listReducer, []);
  const getNode = (nodeId) => nodeList.find((node) => node.id === nodeId);
  const [curveList, dispatchCurves] = useReducer(listReducer, []);
  const getCurve = (curveId) => curveList.find((curve) => curve.id === curveId);
  const [noteList, dispatchNotes] = useReducer(listReducer, []);
  const getNote = (noteId) => noteList.find((note) => note.id === noteId);
  const calcMaxLevel = () => {
    const levelList = nodeList.map((node) => node.level);
    const maxLevel = Math.max(...levelList);
    return maxLevel;
  };
  // Toogle toole
  const [isShowTool, dispatchToggleTool] = useReducer(toggleToolReducer, {
    showNode: false,
    showCurve: false,
    showNote: false,
  });
  // Mindnote mode
  const user = useContext(UserContext);
  const [mindnoteMode, setMindnoteMode] = useState(MINDNOTE_MODE.VIEW_MODE);
  useEffect(() => {
    if (user && doc && user.uid === doc.creatorId) {
      setMindnoteMode(MINDNOTE_MODE.EDIT_MODE);
    } else {
      setMindnoteMode(MINDNOTE_MODE.VIEW_MODE);
    }
  }, [user, doc]);
  // selectedItem, selectedNote
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  useEffect(() => {
    if (selectedItem) {
      if (selectedItem.type === ITEM_TYPE.NODE) {
        const node = getNode(selectedItem.id);
        setSelectedNote(node.noteId);
        dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.SHOW_NOTE });
      } else {
        setSelectedNote(null);
        dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.CLOSE_NOTE });
      }
    } else {
      dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.CLOSE_NOTE });
    }
  }, [selectedItem]);
  // ItemContext
  const ItemContextValue = {
    dispatchNodes,
    getNode,
    dispatchCurves,
    getCurve,
    dispatchNotes,
    getNote,
    setSelectedItem,
    mindnoteMode,
  };
  // Modify doc title
  const modifyDocTitle = (newTitle) => {
    setDoc({ ...doc, title: newTitle });
  };
  // Node Style
  let StyleContextValue = useContext(StyleContext);
  const [nodeStyles, setNodeStyles] = useState(StyleContextValue.nodeStyles);
  const { defaultNodeStyle } = StyleContextValue;
  const modifyNodeStyle = (level, newNodeStyle) => {
    const newNodeStyles = [...nodeStyles];
    newNodeStyles[level] = newNodeStyles[level]
      ? {
          ...newNodeStyles[level],
          ...newNodeStyle,
          style: { ...newNodeStyles[level].style, ...newNodeStyle.style },
        }
      : {
          ...defaultNodeStyle,
          ...newNodeStyle,
          style: { ...defaultNodeStyle.style, ...newNodeStyle.style },
        };
    setNodeStyles(newNodeStyles);
  };
  // Curve Style;
  const [curveStyles, setCurveStyles] = useState(StyleContextValue.curveStyles);
  const { defaultCurveStyle } = StyleContextValue;
  const modifyCurveStyle = (level, newCurveStyle) => {
    const newCurveStyles = [...curveStyles];
    newCurveStyles[level] = newCurveStyles[level]
      ? {
          ...newCurveStyles[level],
          ...newCurveStyle,
          style: { ...newCurveStyles[level].style, ...newCurveStyle.style },
        }
      : {
          ...defaultCurveStyle,
          ...newCurveStyle,
          style: { ...defaultCurveStyle.style, ...newCurveStyle.style },
        };
    setCurveStyles(newCurveStyles);
  };
  // Provide Style Context Value
  StyleContextValue = { ...StyleContextValue, nodeStyles, curveStyles };
  // Resize Note
  const { noteStyle } = useContext(StyleContext);
  const [noteWidth, setNoteWidth] = useState(noteStyle.defaultWidth);
  const resizeNote = () => {
    setDragType(DRAG_TYPE.RESIZE_NOTE);
  };
  // Drag Event
  const [dragType, setDragType] = useState(null);
  const drag = (e) => {
    if (dragType === DRAG_TYPE.RESIZE_NOTE) {
      let newNoteWidth = noteWidth - e.movementX;
      newNoteWidth =
        newNoteWidth > noteStyle.minWidth ? newNoteWidth : noteStyle.minWidth;
      setNoteWidth(newNoteWidth);
    }
  };
  // Drop Event
  const drop = (e) => {
    setDragType(null);
  };
  // Saving status
  const [isSaving, setIsSaving] = useState(false);
  // Save(Update) doc/mindnote data to database
  const saveMindnoteToDB = async (doc, nodeList, curveList, noteList) => {
    setIsSaving(true);
    try {
      const mindnoteRef = db.collection("mindnotes").doc(mindnoteId);
      await mindnoteRef.update({
        nodeList,
        curveList,
        noteList,
      });
      const docRef = db.collection("docs").doc(docId);
      await docRef.set(doc);
      setIsSaving(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  return (
    <div className="mindnote">
      <div className="canvas" onMouseMove={drag} onMouseUp={drop}>
        <ItemContext.Provider value={ItemContextValue}>
          <StyleContext.Provider value={StyleContextValue}>
            <SVG
              nodeList={nodeList}
              curveList={curveList}
              noteList={noteList}
              selectedItem={selectedItem}
              mindnoteMode={mindnoteMode}
            />
            {isShowTool.showNote && (
              <Note
                width={noteWidth}
                resizeNote={resizeNote}
                selectedItem={selectedItem}
                selectedNote={selectedNote}
                mindnoteMode={mindnoteMode}
              />
            )}
            {mindnoteMode === MINDNOTE_MODE.EDIT_MODE && (
              <Tool
                selectedItem={selectedItem}
                showNodeTool={() =>
                  dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.SHOW_NODE_TOOL })
                }
                showCurveTool={() =>
                  dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.SHOW_CURVE_TOOL })
                }
                showNote={() =>
                  dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.SHOW_NOTE })
                }
                docTitle={doc ? doc.title : ""}
                modifyDocTitle={modifyDocTitle}
                saveMindnoteToDB={() =>
                  saveMindnoteToDB(doc, nodeList, curveList, noteList)
                }
                calcMaxLevel={calcMaxLevel}
                isShowNodeTool={isShowTool.showNodeTool}
                closeNodeTool={() =>
                  dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.CLOSE_NODE_TOOL })
                }
                modifyNodeStyle={modifyNodeStyle}
                isShowCurveTool={isShowTool.showCurveTool}
                closeCurveTool={() =>
                  dispatchToggleTool({
                    type: TOGGLE_TOOL_TYPE.CLOSE_CURVE_TOOL,
                  })
                }
                modifyCurveStyle={modifyCurveStyle}
              />
            )}
          </StyleContext.Provider>
        </ItemContext.Provider>
        {isSaving ? <Loading /> : ""}
      </div>
    </div>
  );
};

export default Mindnote;
