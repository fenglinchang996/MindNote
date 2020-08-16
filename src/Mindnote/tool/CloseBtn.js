import React from "react";
import ToolBtn from "./widget/ToolBtn";

const CloseBtn = (props) => {
  const { action } = props;
  return (
    <div className="tool-close-btn">
      <ToolBtn fa="times" action={action} title="close" />
    </div>
  );
};

export default CloseBtn;
