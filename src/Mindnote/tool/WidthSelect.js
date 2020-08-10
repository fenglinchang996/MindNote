import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolSelector from "./widget/ToolSelector";
import ToolOption from "./widget/ToolOption";

const WidthSelect = (props) => {
  const { colorCode, modifyWidth } = props;
  const widthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ToolSelect>
      <div className="tool-icon">
        <StrokeWidthIcon colorCode={colorCode} />
      </div>
      <ToolSelector>
        {widthList.map((width) => (
          <ToolOption key={width} action={() => modifyWidth(width)}>
            <WidthIcon width={width} colorCode={colorCode} />
            &nbsp; {width}
          </ToolOption>
        ))}
      </ToolSelector>
    </ToolSelect>
  );
};
const StrokeWidthIcon = (props) => (
  <svg viewBox="0 0 100 100">
    <line
      x1="0"
      y1="15"
      x2="100"
      y2="15"
      stroke={props.colorCode}
      strokeWidth="4"
    ></line>
    <line
      x1="0"
      y1="45"
      x2="100"
      y2="45"
      stroke={props.colorCode}
      strokeWidth="10"
    ></line>
    <line
      x1="0"
      y1="80"
      x2="100"
      y2="80"
      stroke={props.colorCode}
      strokeWidth="20"
    ></line>
  </svg>
);
const WidthIcon = (props) => {
  const { width, colorCode } = props;
  return (
    <div className="tool-icon">
      <svg viewBox="0 0 100 100">
        <line
          x1={0}
          y1={50}
          x2={100}
          y2={50}
          stroke={colorCode}
          strokeWidth={width * 2}
        />
      </svg>
    </div>
  );
};

export default WidthSelect;
