import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";
import BaseCurve from "./BaseCurve";

const wrapVirtualCurve = (BaseCurve) => (props) => {
  const { curveData } = props;
  // Use StyleContext
  const { virtualCurveStyle } = useContext(StyleContext);

  return (
    <g tabIndex={-1}>
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
