import React, { useState, useContext } from "react";
import StyleContext from "./StyleContext";
import BaseCurve from "./BaseCurve";
import { ITEM_TYPE } from "./enums";
import ItemContext from "./ItemContext";

const wrapCurve = (BaseCurve) => (props) => {
  const { curveData, isSelected } = props;
  const { id, style } = curveData;
  const { curveStyle } = useContext(StyleContext);

  // Use ItemContext
  const { setSelectedItem } = useContext(ItemContext);

  // Toggle displaying Control Circle
  const [isFocused, setIsFocused] = useState(false);

  return (
    <g
      tabIndex={-1}
      onFocus={(e) => {
        e.stopPropagation();
        setIsFocused(true);
        setSelectedItem({ type: ITEM_TYPE.CURVE, id });
      }}
      onBlur={() => {
        setIsFocused(false);
      }}
    >
      <BaseCurve
        curveData={{ ...curveData, style: style || curveStyle.style }}
        isFocused={isSelected}
      />
    </g>
  );
};

const Curve = wrapCurve(BaseCurve);

export default Curve;
