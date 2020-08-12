import React, { useContext } from "react";
import StyleContext from "../StyleContext";
import BaseCurve from "./BaseCurve";

const VirtualCurve = (props) => {
  const { curveData } = props;
  const { id, level, start, end, startControl, endControl, style } = curveData;
  // Use StyleContext
  const {
    defaultCurveStyle,
    curveStyles,
    virtualCurveStyle,
    curvePointStyle,
    curveControlStyle,
    curveControlLineStyle,
  } = useContext(StyleContext);
  // Curve style
  const defaultStyle = curveStyles[level] || defaultCurveStyle;
  // Curve Control
  const startCircle = {
    cx: start.x,
    cy: start.y,
    r: curvePointStyle.r,
    style: curvePointStyle.style,
  };
  const endCircle = {
    cx: end.x,
    cy: end.y,
    r: curvePointStyle.r,
    style: curvePointStyle.style,
  };
  const startControlCircle = {
    cx: startControl.x,
    cy: startControl.y,
    r: curveControlStyle.r,
    style: curveControlStyle.style,
  };
  const endControlCircle = {
    cx: endControl.x,
    cy: endControl.y,
    r: curveControlStyle.r,
    style: curveControlStyle.style,
  };
  const startControlLine = {
    x1: start.x,
    y1: start.y,
    x2: startControl.x,
    y2: startControl.y,
    style: curveControlLineStyle.style,
  };
  const endControlLine = {
    x1: end.x,
    y1: end.y,
    x2: endControl.x,
    y2: endControl.y,
    style: curveControlLineStyle.style,
  };
  return (
    <g tabIndex={-1} pointerEvents="none">
      <BaseCurve
        curveData={{
          ...curveData,
          style: style
            ? { ...style, ...virtualCurveStyle.style }
            : { ...defaultStyle.style, ...virtualCurveStyle.style },
        }}
      />
      <line {...startControlLine} />
      <line {...endControlLine} />
      <circle {...startCircle} />
      <circle {...endCircle} />
      <circle {...startControlCircle} />
      <circle {...endControlCircle} />
    </g>
  );
};

export default VirtualCurve;
