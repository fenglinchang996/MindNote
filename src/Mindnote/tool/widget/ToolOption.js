import React from "react";

const ToolOption = (props) => {
  const { children, action } = props;
  return (
    <div className="tool-option" onClick={action}>
      {children}
    </div>
  );
};

export default ToolOption;
