import React from "react";

const BaseCurve = (props) => {
  const { curveData } = props;
  const { id, start, end, startControl, endControl, style } = curveData;
  // Path info (d)
  const pathInfo = `M ${start.x} ${start.y} C ${startControl.x} ${startControl.y}, ${endControl.x} ${endControl.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <ArrowMarker />
      <path d={pathInfo} style={style} markerEnd="url(#Arrow)" />
    </g>
  );
};

const ArrowMarker = (props) => {
  return (
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
  );
};

export default BaseCurve;
