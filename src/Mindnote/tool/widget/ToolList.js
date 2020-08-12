import React from "react";

const ToolList = (props) => {
  const { title, children } = props;
  return (
    <div>
      <div className="tool-list">
        <div className="tool-subtitle">{title}</div>
        {children}
      </div>
    </div>
  );
};

export default ToolList;
