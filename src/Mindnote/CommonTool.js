import React from "react";

const CommonTool = (props) => {
  const {
    saveMindnoteToDB,
    showNodeTool,
    showNote,
    showCurveTool,
    isSaving,
  } = props;
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
      <ToolItem fa="edit" action={showNote} />
      <span className="verti-sep"></span>
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

export default CommonTool;
