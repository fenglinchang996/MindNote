import React, { useContext } from "react";
import StyleContext from "../StyleContext";
import BaseCurve from "./BaseCurve";

const ViewCurve = (props) => {
  const { curveData } = props;
  const { id, level, style } = curveData;
  const { defaultCurveStyle, curveStyles, viewCurveStyle } = useContext(
    StyleContext
  );
  const defaultStyle = curveStyles[level] || defaultCurveStyle;
  return (
    <g>
      <BaseCurve
        curveData={{
          ...curveData,
          style: style
            ? { ...style, ...viewCurveStyle.style }
            : { ...defaultStyle.style, ...viewCurveStyle.style },
        }}
      />
    </g>
  );
};

export default ViewCurve;
