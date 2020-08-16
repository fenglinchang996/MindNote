import React from "react";

const BaseCurve = (props) => {
  const { curveData } = props;
  const { id, start, end, startControl, endControl, style } = curveData;
  // Path info (d)
  const pathInfo = `M ${start.x} ${start.y} C ${startControl.x} ${startControl.y}, ${endControl.x} ${endControl.y}, ${end.x} ${end.y}`;

  return (
    <g>
      <ThickArrowMarker id={id} fill={style.stroke} />
      <ArrowMarker id={id} stroke={style.stroke} />
      <path d={pathInfo} style={style} markerEnd={`url(#ThickArrow-${id})`} />
    </g>
  );
};

const ThickArrowMarker = (props) => {
  const { id, fill } = props;
  return (
    <defs>
      <marker
        id={`ThickArrow-${id}`}
        markerWidth="3"
        markerHeight="3"
        refX="1.5"
        refY="1.5"
        orient="auto"
      >
        <polygon points="0,0 3,1.5 0,3" fill={fill} />
      </marker>
    </defs>
  );
};

const ArrowMarker = (props) => {
  const { id, stroke } = props;
  return (
    <defs>
      <marker
        id={`Arrow-${id}`}
        markerWidth="6"
        markerHeight="6"
        refX="4"
        refY="3"
        orient="auto"
      >
        <polyline
          points="1,1 5,3, 1,5"
          strokeWidth={1}
          strokeLinecap="round"
          stroke={stroke}
          fill="none"
        />
      </marker>
    </defs>
  );
};

export default BaseCurve;
