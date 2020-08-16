import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolIcon from "./widget/ToolIcon";

const ColorSelect = (props) => {
  const { colorCode, modifyColor } = props;
  return (
    <ToolSelect>
      <ToolIcon title="Color">
        <div
          className="color-block"
          style={{
            backgroundColor: colorCode,
          }}
        ></div>
      </ToolIcon>
      <span className="tool-trigger">
        <input
          type="color"
          className="color-trigger"
          value={colorCode}
          onChange={(e) => modifyColor(e.target.value)}
        />
        <i className="fas fa-angle-down"></i>
      </span>
    </ToolSelect>
  );
};

export default ColorSelect;
