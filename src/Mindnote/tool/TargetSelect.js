import React from "react";
import ToolSelect from "./widget/ToolSelect";
import ToolSelector from "./widget/ToolSelector";
import ToolOption from "./widget/ToolOption";

const TargetSelect = (props) => {
  const { levelList, targetLevelString, setTargetLevel } = props;
  return (
    <ToolSelect>
      <div className="tool-text">{targetLevelString}</div>
      <ToolSelector>
        {levelList.length > 0 ? (
          levelList.map((n) => (
            <ToolOption
              key={n}
              action={() => {
                setTargetLevel(n);
              }}
            >{`Level ${n}`}</ToolOption>
          ))
        ) : (
          <ToolOption>None</ToolOption>
        )}
      </ToolSelector>
    </ToolSelect>
  );
};

export default TargetSelect;
