import React from "react";
import ToolBtn from "./widget/ToolBtn";
import ToolText from "./widget/ToolText";

const CommonTool = (props) => {
  const {
    isSaving,
    autoSaveCount,
    saveMindnoteToDB,
    showNodeTool,
    showNote,
    showCurveTool,
    docTitle,
    modifyDocTitle,
  } = props;
  const getSavingString = (isSaving, autoSaveCount) => {
    if (isSaving) return "Saving...";
    if (autoSaveCount === 0) return "Saved";
    else return "Changed";
  };
  return (
    <div className="tool-box common-tool">
      <ToolInput value={docTitle} action={modifyDocTitle} />
      <span className="verti-sep"></span>
      <ToolBtn fa="draw-polygon" action={showNodeTool} title="Node Style" />
      <ToolBtn fa="slash" action={showCurveTool} title="Curve Style" />
      <ToolBtn fa="edit" action={showNote} title="Edit Note" />
      <span className="verti-sep"></span>
      {isSaving ? (
        <Saving />
      ) : (
        <ToolBtn fa="save" action={saveMindnoteToDB} title="Save" />
      )}
      <ToolText width="80px" textAlign="left">
        {getSavingString(isSaving, autoSaveCount)}
      </ToolText>
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

const Saving = (props) => {
  return (
    <div className="tool-item">
      <div className="spinner saving-icon">
        <i className="fas fa-sync-alt"></i>
      </div>
    </div>
  );
};

export default CommonTool;
