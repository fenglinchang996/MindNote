import React, { useContext } from "react";
import StyleContext from "./StyleContext";
import BaseCurve from "./BaseCurve";

const ViewCurve = (props) => {
  const { curveData } = props;
  const { id, style } = curveData;
  const { curveStyle, viewCurveStyle } = useContext(StyleContext);

  return (
    <g>
      <BaseCurve
        curveData={{
          ...curveData,
          style: style
            ? { ...style, ...viewCurveStyle.style }
            : { ...curveStyle.style, ...viewCurveStyle.style },
        }}
      />
    </g>
  );
};

export default ViewCurve;
