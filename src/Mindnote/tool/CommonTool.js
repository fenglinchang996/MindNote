import React, { useEffect, useState } from "react";
import React from "react";
import ToolBtn from "./widget/ToolBtn";

const CommonTool = (props) => {
  const {
    saveMindnoteToDB,
    showNodeTool,
    showNote,
    showCurveTool,
    docTitle,
    modifyDocTitle,
  } = props;
  return (
    <div className="tool-box common-tool">
      <ToolInput value={docTitle} action={modifyDocTitle} />
      <span className="verti-sep"></span>
      <ToolBtn fa="draw-polygon" action={showNodeTool} title="Node Style" />
      <ToolBtn fa="slash" action={showCurveTool} title="Curve Style" />
      <ToolBtn fa="edit" action={showNote} title="Edit Note" />
      <span className="verti-sep"></span>
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
