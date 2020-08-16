import React from "react";

const ToolText = (props) => {
  const { width, textAlign, children } = props;
  return (
    <div
      className="tool-text"
      style={{ width: width || "auto", textAlign: textAlign || "center" }}
    >
      {children}
    </div>
  );
};

export default ToolText;
