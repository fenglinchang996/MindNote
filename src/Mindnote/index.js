import React, { useState, useReducer, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import SVG from "./svg";
import Tool from "./tool";
import Note from "./note";
import Zoom from "./tool/Zoom";
import SaveTool from "./tool/SaveTool";
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
  STROKE_TYPE,
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
  const [isLoading, setIsLoading] = useState(false);
  const fetchDocAndMindnote = async (docId, mindnoteId) => {
    setIsLoading(true);
    if (docId && mindnoteId) {
      try {
        // fetch doc
        const docRef = db.collection("docs").doc(docId);
        const docDoc = await docRef.get();
        if (docDoc.exists) {
          const doc = docDoc.data();
          setDoc(doc);
        } else {
          // docDoc.data() will be undefined in this case
          console.log("No such doc!");
        }
        const mindnoteRef = db.collection("mindnotes").doc(mindnoteId);
        const mindnoteDoc = await mindnoteRef.get();
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
          if (mindnote.style) {
            setStyle(mindnote.style);
          }
        } else {
          // mindnoteDoc.data() will be undefined in this case
          console.log("No such mindnote!");
        }
        setIsLoading(false);
        setIsDataLoaded(true);
      } catch (error) {
        console.log("Error getting data:", error);
      }
    }
  };
  useEffect(() => {
    fetchDocAndMindnote(docId, mindnoteId);
  }, []);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    setAutoSaveCount(criticalSaveCount);
  }, [isDataLoaded]);
  // Doc Data
  const [doc, setDoc] = useState(null);
  // Mindnote data
  const [nodeList, dispatchNodes] = useReducer(listReducer, []);
  const getNode = (nodeId) => nodeList.find((node) => node.id === nodeId);
  const [curveList, dispatchCurves] = useReducer(listReducer, []);
  const getCurve = (curveId) => curveList.find((curve) => curve.id === curveId);
  const [noteList, dispatchNotes] = useReducer(listReducer, []);
  const getNote = (noteId) => noteList.find((note) => note.id === noteId);
  const [maxLevel, setMaxLevel] = useState(0);
  useEffect(() => {
    const levelList = nodeList.map((node) => node.level);
    const newMaxLevel = Math.max(...levelList);
    if (maxLevel !== newMaxLevel) {
      setMaxLevel(newMaxLevel);
    }
  }, [nodeList]);
  // useEffect(() => {
  //   if (maxLevel > style.nodeStyles.length - 1) {
  //     // modifyNodeStyle(maxLevel, style.defaultNodeStyle);
  //     modifyCurveStyle(maxLevel, style.defaultCurveStyle);
  //   }
  // }, [maxLevel]);
  // Delete Node
  const [nodeToBeDeleted, setNodeToBeDeleted] = useState(null);
  // Style
  const [style, setStyle] = useState(useContext(StyleContext));
  // Node Styles
  const { defaultNodeStyle, nodeStyles } = style;
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
    setStyle({ ...style, nodeStyles: newNodeStyles });
  };
  // Curve Styles
  const { defaultCurveStyle, curveStyles } = style;
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
    setStyle({ ...style, curveStyles: newCurveStyles });
  };
  // Toogle tool
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
  // Resize Note
  const { noteStyle } = style;
  const [noteWidth, setNoteWidth] = useState(noteStyle.defaultWidth);
  const resizeNote = () => {
    setDragType(DRAG_TYPE.RESIZE_NOTE);
  };
  // Resize Canvas
  const [SVGSizeRatio, setSVGSizeRatio] = useState(1);
  const resizeCanvas = (deltaRatio) => {
    if (SVGSizeRatio < 0.5) {
      deltaRatio > 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else if (SVGSizeRatio > 2) {
      deltaRatio < 0 && setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    } else {
      setSVGSizeRatio(SVGSizeRatio + deltaRatio);
    }
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
  const SaveMindnoteToDB = async (
    doc,
    nodeList,
    curveList,
    noteList,
    style
  ) => {
    setIsSaving(true);
    try {
      const mindnoteRef = db.collection("mindnotes").doc(mindnoteId);
      await mindnoteRef.update({
        nodeList,
        curveList,
        noteList,
        style,
      });
      const docRef = db.collection("docs").doc(docId);
      await docRef.set(doc);
      setIsSaving(false);
      setAutoSaveCount(0);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  // Autosave
  const [autoSaveCount, setAutoSaveCount] = useState(0);
  const noteSaveCount = 1;
  useEffect(() => {
    const newAutoSaveCount = autoSaveCount + noteSaveCount;
    setAutoSaveCount(newAutoSaveCount);
  }, [noteList]);
  const mindMapSaveCount = 6;
  useEffect(() => {
    const newAutoSaveCount = autoSaveCount + mindMapSaveCount;
    setAutoSaveCount(newAutoSaveCount);
  }, [doc, nodeList, curveList, style]);
  const criticalSaveCount = 30;
  useEffect(() => {
    if (autoSaveCount >= criticalSaveCount) {
      SaveMindnoteToDB(doc, nodeList, curveList, noteList, style);
      setAutoSaveCount(0);
    }
  }, [autoSaveCount]);
  return (
    <div className="mindnote">
      <div className="canvas" onPointerMove={drag} onPointerUp={drop}>
        <ItemContext.Provider value={ItemContextValue}>
          <StyleContext.Provider value={style}>
            <SVG
              nodeList={nodeList}
              curveList={curveList}
              noteList={noteList}
              selectedItem={selectedItem}
              nodeToBeDeleted={nodeToBeDeleted}
              setNodeToBeDeleted={setNodeToBeDeleted}
              mindnoteMode={mindnoteMode}
              SVGSizeRatio={SVGSizeRatio}
              resizeCanvas={resizeCanvas}
            />
            <Note
              isShowNote={isShowTool.showNote}
              width={noteWidth}
              resizeNote={resizeNote}
              selectedItem={selectedItem}
              selectedNote={selectedNote}
              mindnoteMode={mindnoteMode}
              closeNote={() =>
                dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.CLOSE_NOTE })
              }
            />
            {mindnoteMode === MINDNOTE_MODE.EDIT_MODE && (
              <>
                <Tool
                  selectedItem={selectedItem}
                  deleteSelectedNode={() => {
                    if (selectedItem && selectedItem.type === ITEM_TYPE.NODE) {
                      setNodeToBeDeleted(selectedItem.id);
                    }
                  }}
                  showNodeTool={() =>
                    dispatchToggleTool({
                      type: TOGGLE_TOOL_TYPE.SHOW_NODE_TOOL,
                    })
                  }
                  showCurveTool={() =>
                    dispatchToggleTool({
                      type: TOGGLE_TOOL_TYPE.SHOW_CURVE_TOOL,
                    })
                  }
                  showNote={() =>
                    dispatchToggleTool({ type: TOGGLE_TOOL_TYPE.SHOW_NOTE })
                  }
                  docTitle={doc ? doc.title : ""}
                  modifyDocTitle={modifyDocTitle}
                  maxLevel={maxLevel}
                  isShowNodeTool={isShowTool.showNodeTool}
                  closeNodeTool={() =>
                    dispatchToggleTool({
                      type: TOGGLE_TOOL_TYPE.CLOSE_NODE_TOOL,
                    })
                  }
                  modifyNodeStyle={modifyNodeStyle}
                  isShowCurveTool={isShowTool.showCurveTool}
                  closeCurveTool={() =>
                    dispatchToggleTool({
                      type: TOGGLE_TOOL_TYPE.CLOSE_CURVE_TOOL,
                    })
                  }
                  modifyCurveStyle={modifyCurveStyle}
                  SVGSizeRatio={SVGSizeRatio}
                  resizeCanvas={resizeCanvas}
                />
                <SaveTool
                  isSaving={isSaving}
                  autoSaveCount={autoSaveCount}
                  saveMindnoteToDB={() =>
                    SaveMindnoteToDB(doc, nodeList, curveList, noteList, style)
                  }
                />
              </>
            )}

            <Zoom SVGSizeRatio={SVGSizeRatio} resizeCanvas={resizeCanvas} />
          </StyleContext.Provider>
        </ItemContext.Provider>
        {isLoading ? <Loading /> : ""}
      </div>
    </div>
  );
};

export default Mindnote;
