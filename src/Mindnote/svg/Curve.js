import React, { useContext } from "react";
import StyleContext from "../StyleContext";
import BaseCurve from "./BaseCurve";
import { ITEM_TYPE } from "../utils/enums";
import ItemContext from "../ItemContext";

const Curve = (props) => {
  const { curveData } = props;
  const { id, level, style } = curveData;
  const { defaultCurveStyle, curveStyles } = useContext(StyleContext);
  const defaultStyle = curveStyles[level] || defaultCurveStyle;
  // Use ItemContext
  const { setSelectedItem } = useContext(ItemContext);

  return (
    <g
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        setSelectedItem({ type: ITEM_TYPE.CURVE, id });
      }}
    >
      <BaseCurve
        curveData={{ ...curveData, style: style || defaultStyle.style }}
      />
    </g>
  );
};

export default Curve;
