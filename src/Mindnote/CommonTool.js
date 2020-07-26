import React from "react";

const CommonTool = (props) => {
  return (
    <div className="tool-box common-tool">
      <ToolItem fa="eye" />
      <ToolItem fa="pen" />
      <span className="verti-sep"></span>
      <ToolItem fa="undo-alt" />
      <ToolItem fa="redo-alt" />
      <span className="verti-sep"></span>
      <ToolItem fa="draw-polygon" />
      <ToolItem fa="slash" />
      <ToolItem fa="edit" />
      <span className="verti-sep"></span>
      <ToolItem fa="save" />
    </div>
  );
};

const ToolItem = (props) => {
  const { fa } = props;
  return (
    <div className="tool-item tool-btn">
      <div className="tool-icon">
        <i className={`fas fa-${fa}`}></i>
      </div>
    </div>
  );
};

export default CommonTool;
