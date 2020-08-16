import React from "react";
import TooltipWrapper from "./TooltipWrapper";

const ToolIcon = (props) => {
  const { title, children } = props;
  return (
    <TooltipWrapper tooltipText={title}>
      <div className="tool-icon">{children}</div>
    </TooltipWrapper>
  );
};

export default ToolIcon;
