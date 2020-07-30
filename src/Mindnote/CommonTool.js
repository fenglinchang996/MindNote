import React, { useEffect, useState } from "react";

const CommonTool = (props) => {
  const {
    saveMindnoteToDB,
    showNodeTool,
    showNote,
    showCurveTool,
    docTitle,
    modifyDocTitle,
  } = props;
  // const [editTitle, setEditTitle] = useState("");
  // useEffect(() => {
  //   setEditTitle(docTitle);
  // }, [docTitle]);
  // const modifyDocTitle = (newTitle) => {
  //   setEditTitle(newTitle);
  // };
  return (
    <div className="tool-box common-tool">
      {/* <ToolItem fa="eye" />
      <ToolItem fa="pen" />
      <span className="verti-sep"></span>
      <ToolItem fa="undo-alt" />
      <ToolItem fa="redo-alt" />
      <span className="verti-sep"></span>
      <ToolItem fa="draw-polygon" action={showNodeTool} />
      <ToolItem fa="slash" action={showCurveTool} /> */}
      <ToolInput value={docTitle} action={modifyDocTitle} />
      <span className="verti-sep"></span>
      <ToolItem fa="edit" action={showNote} />
      <ToolItem fa="save" action={saveMindnoteToDB} />
    </div>
  );
};

const ToolItem = (props) => {
  const { fa, action } = props;
  return (
    <div className="tool-item tool-btn" onClick={action}>
      <div className="tool-icon">
        <i className={`fas fa-${fa}`}></i>
      </div>
    </div>
  );
};

const ToolInput = (props) => {
  const { value, action } = props;
  return (
    <div className="tool-item tool-input">
      <input
        className="doc-title-input"
        type="text"
        value={value ? value : ""}
        placeholder="Untitled Mindnote"
        onChange={(e) => action(e.target.value)}
      />
    </div>
  );
};

export default CommonTool;
