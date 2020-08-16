import React, { useState } from "react";

const TooltipWrapper = (props) => {
  const { tooltipText, children } = props;
  const [isDisplayed, setIsDisplayed] = useState(false);
  return (
    <div
      className="tooltip-wrapper"
      onPointerEnter={() => setIsDisplayed(true)}
      onPointerLeave={() => setIsDisplayed(false)}
    >
      {children}
      <div
        className="tooltip fade-out"
        style={{ display: isDisplayed ? "block" : "none" }}
      >
        <span>{tooltipText}</span>
      </div>
    </div>
  );
};

export default TooltipWrapper;
