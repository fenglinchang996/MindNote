import React, { useContext } from "react";
import BaseCurve from "./BaseCurve";
import StyleContext from "./StyleContext";
import { CURVE_CONTROL_TYPE, CURVE_POINT_TYPE } from "./enums";

const SelectedCurve = (props) => {
  const { curveData, modifyCurveControl, moveCurve } = props;
  const { id, start, end, startControl, endControl, style } = curveData;
  const { curveStyle } = useContext(StyleContext);
  // Use StyleContext
  const {
    curvePointStyle,
    curveControlStyle,
    curveControlLineStyle,
  } = useContext(StyleContext);
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
    <g tabIndex={-1}>
      <BaseCurve
        curveData={{ ...curveData, style: style || curveStyle.style }}
      />
      <line {...startControlLine} />
      <line {...endControlLine} />
      <circle
        {...startCircle}
        onMouseDown={(e) => {
          moveCurve(e, id, CURVE_POINT_TYPE.START);
        }}
      />
      <circle
        {...endCircle}
        onMouseDown={(e) => {
          moveCurve(e, id, CURVE_POINT_TYPE.END);
        }}
      />
      <circle
        {...startControlCircle}
        onMouseDown={(e) =>
          modifyCurveControl(e, id, CURVE_CONTROL_TYPE.START_CONTROL)
        }
      />
      <circle
        {...endControlCircle}
        onMouseDown={(e) =>
          modifyCurveControl(e, id, CURVE_CONTROL_TYPE.END_CONTROL)
        }
      />
    </g>
  );
};

export default SelectedCurve;
