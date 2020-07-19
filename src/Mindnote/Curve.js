import React, { useState, useEffect, useContext } from "react";
import StyleContext from "./StyleContext";

const Curve = (props) => {
  const { curveData } = props;
  const { id, start, end, startControl, endControl, style } = curveData;

  // Use StyleContext
  const {
    curvePointStyle,
    curveControlStyle,
    curveControlLineStyle,
  } = useContext(StyleContext);
  // Path info (d)
  const [pathInfo, setPathInfo] = useState("");
  // Set Path
  useEffect(() => {
    setPathInfo(
      `M ${start.x} ${start.y} C ${startControl.x} ${startControl.y}, ${endControl.x} ${endControl.y}, ${end.x} ${end.y}`
    );
  }, [start, end, startControl, endControl]);

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
      <defs>
        <marker
          id="Arrow"
          markerWidth="3"
          markerHeight="3"
          refX="1.5"
          refY="1.5"
          orient="auto"
        >
          <polygon points="0,0 3,1.5 0,3" fill="blue" />
        </marker>
      </defs>
      <path d={pathInfo} style={style} markerEnd="url(#Arrow)" />
      <g display={isFocused ? "block" : "none"}>
        <line {...startControlLine} />
        <line {...endControlLine} />
        <circle {...startCircle} />
        <circle {...endCircle} />
        <circle {...startControlCircle} />
        <circle {...endControlCircle} />
      </g>
    </g>
  );
};

export default Curve;
