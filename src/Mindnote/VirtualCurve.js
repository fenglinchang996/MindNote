import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";
import BaseCurve from "./BaseCurve";

const wrapVirtualCurve = (BaseCurve) => (props) => {
  const { curveData } = props;
  const { virtualCurveStyle } = useContext(StyleContext);

  return (
    <g tabIndex={-1} pointerEvents="none">
      <BaseCurve
        curveData={{
          ...curveData,
          style: virtualCurveStyle.style,
        }}
        isFocused={true}
      />
    </g>
  );
};

const VirtualCurve = wrapVirtualCurve(BaseCurve);

export default VirtualCurve;
