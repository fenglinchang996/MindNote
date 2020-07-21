import React, { useState, useContext } from "react";
import StyleContext from "./StyleContext";
import BaseCurve from "./BaseCurve";

const wrapCurve = (BaseCurve) => (props) => {
  const { curveData } = props;

  // Use StyleContext
  const { curveStyle } = useContext(StyleContext);

  // Toggle displaying Control Circle
  const [isFocused, setIsFocused] = useState(false);

  return (
    <g
      tabIndex={-1}
      onFocus={() => {
        setIsFocused(true);
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      <BaseCurve
        curveData={{ ...curveData, style: curveData.style || curveStyle.style }}
        isFocused={isFocused}
      />
    </g>
  );
};

const Curve = wrapCurve(BaseCurve);

export default Curve;
