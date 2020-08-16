import React from "react";
import TooltipWrapper from "./TooltipWrapper";

const ToolBtn = (props) => {
  const { fa, action, title } = props;
  return (
    <TooltipWrapper tooltipText={title}>
      <div className="tool-item tool-btn" onClick={action}>
        <div className="tool-icon">
          <i className={`fas fa-${fa}`}></i>
        </div>
      </div>
    </TooltipWrapper>
  );
};

export default ToolBtn;
