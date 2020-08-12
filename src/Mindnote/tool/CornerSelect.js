import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolSelector from "./widget/ToolSelector";
import ToolOption from "./widget/ToolOption";

const CornerSelect = (props) => {
  const { colorCode, rxRatio, ryRatio, modifyBorderRadius } = props;
  return (
    <ToolSelect>
      <CornerIcon colorCode={colorCode} />
      <ToolSelector>
        <ToolOption>
          <label>x radius</label>
          <input
            type="range"
            min="0"
            max="50"
            value={rxRatio * 100}
            onChange={(e) => modifyBorderRadius(e.target.value / 100, ryRatio)}
          />
        </ToolOption>
        <ToolOption>
          <label>y radius</label>
          <input
            type="range"
            min="0"
            max="50"
            value={ryRatio * 100}
            onChange={(e) => modifyBorderRadius(rxRatio, e.target.value / 100)}
          />
        </ToolOption>
      </ToolSelector>
    </ToolSelect>
  );
};

const CornerIcon = (props) => {
  const { colorCode } = props;
  return (
    <svg className="tool-icon" viewBox="0 0 100 100">
      <path
        d="M25 25 h25 q25 0, 25 25 v25"
        stroke={colorCode}
        strokeWidth="5"
        fill="none"
      />
    </svg>
  );
};

export default CornerSelect;
