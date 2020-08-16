import React, { useState } from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolOption from "./widget/ToolOption";
import ToolIcon from "./widget/ToolIcon";

const CornerSelect = (props) => {
  const { colorCode, rxRatio, ryRatio, modifyBorderRadius } = props;
  const [isToolSelectorDisplayed, setIsToolSelectorDisplayed] = useState(false);
  const openToolSelector = () => setIsToolSelectorDisplayed(true);
  const closeToolSelector = () => setIsToolSelectorDisplayed(false);
  return (
    <ToolSelect>
      <ToolIcon title="Border Corner">
        <CornerIcon colorCode={colorCode} />
      </ToolIcon>
      <div>
        <span className="tool-trigger" onClick={openToolSelector}>
          <i className="fas fa-angle-down"></i>
        </span>
        <div
          className="tool-selector"
          style={{ display: isToolSelectorDisplayed ? "block" : "none" }}
        >
          <ToolOption>
            <label>x radius</label>
            <input
              type="range"
              min="0"
              max="50"
              value={rxRatio * 100}
              onChange={(e) =>
                modifyBorderRadius(e.target.value / 100, ryRatio)
              }
            />
          </ToolOption>
          <ToolOption>
            <label>y radius</label>
            <input
              type="range"
              min="0"
              max="50"
              value={ryRatio * 100}
              onChange={(e) =>
                modifyBorderRadius(rxRatio, e.target.value / 100)
              }
            />
          </ToolOption>
          <button className="check-btn" onClick={closeToolSelector}>
            <i className="fas fa-check"></i>&nbsp;Done
          </button>
        </div>
      </div>
    </ToolSelect>
  );
};

const CornerIcon = (props) => {
  const { colorCode } = props;
  return (
    <svg viewBox="0 0 100 100">
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
