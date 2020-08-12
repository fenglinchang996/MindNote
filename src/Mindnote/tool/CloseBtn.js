import React from "react";

const CloseBtn = (props) => {
  const { action } = props;
  return (
    <button type="button" className="tool-close-btn" onClick={action}>
      <i className="fas fa-times"></i>
    </button>
  );
};

export default CloseBtn;
