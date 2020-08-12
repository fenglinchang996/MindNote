import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolSelector from "./widget/ToolSelector";
import ToolOption from "./widget/ToolOption";
import { STROKE_TYPE } from "../utils/enums";

const TypeSelect = (props) => {
  const { colorCode, width, modifyType } = props;
  return (
    <ToolSelect>
      <div className="tool-icon">
        <StrokeTypeIcon colorCode={colorCode} />
      </div>
      <ToolSelector>
        {Object.values(STROKE_TYPE).map((type) => (
          <ToolOption key={type} action={() => modifyType(type, width)}>
            <TypeIcon type={type} colorCode={colorCode} />
            {type}
          </ToolOption>
        ))}
      </ToolSelector>
    </ToolSelect>
  );
};
const StrokeTypeIcon = (props) => (
  <svg viewBox="0 0 100 100">
    <line
      x1="0"
      y1="15"
      x2="100"
      y2="15"
      stroke={props.colorCode}
      strokeWidth="10"
    />
    <line
      x1="0"
      y1="45"
      x2="100"
      y2="45"
      stroke={props.colorCode}
      strokeWidth="10"
      strokeDasharray="20, 10"
    />
    <line
      x1="0"
      y1="80"
      x2="100"
      y2="80"
      stroke={props.colorCode}
      strokeWidth="10"
      strokeDasharray="2, 20"
      strokeLinecap="round"
    />
  </svg>
);
const TypeIcon = (props) => {
  const { type, colorCode } = props;
  const getDasharray = (type) => {
    switch (type) {
      case STROKE_TYPE.SOLID:
        return "none";
      case STROKE_TYPE.LONG_DASH:
        return [20, 20];
      case STROKE_TYPE.SHORT_DASH:
        return [10, 10];
      case STROKE_TYPE.DOT:
        return [1, 20];
      default:
        break;
    }
  };
  return (
    <div className="tool-icon">
      <svg viewBox="0 0 100 100">
        <line
          x1="0"
          y1="50"
          x2="100"
          y2="50"
          stroke={colorCode}
          strokeWidth="10"
          strokeDasharray={getDasharray(type)}
        />
      </svg>
    </div>
  );
};

export default TypeSelect;
