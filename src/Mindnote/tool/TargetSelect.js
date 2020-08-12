import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolSelector from "./widget/ToolSelector";
import ToolOption from "./widget/ToolOption";

const TargetSelect = (props) => {
  const { maxLevel, levelList, targetLevel, setTargetLevel } = props;
  return (
    <ToolSelect>
      <div className="tool-text">
        {maxLevel > 0 ? `Level ${targetLevel}` : "No Curve"}
      </div>
      <ToolSelector>
        {levelList.length > 0
          ? levelList.map((n) => (
              <ToolOption
                key={n}
                action={() => {
                  setTargetLevel(n);
                }}
              >{`Level ${n}`}</ToolOption>
            ))
          : "None"}
      </ToolSelector>
    </ToolSelect>
  );
};

export default TargetSelect;
