import React from "react";
import ToolBtn from "./widget/ToolBtn";
import ToolText from "./widget/ToolText";

const Zoom = (props) => {
  const { SVGSizeRatio, resizeCanvas } = props;
  const calcRealRatioPersent = (SVGSizeRatio) =>
    (SVGSizeRatio * 100).toFixed(0);
  return (
    <div className="tool-box canvas-tool">
      <ToolBtn
        title="Zoom In"
        fa="plus"
        action={() => {
          resizeCanvas(0.1);
        }}
      />
      <ToolBtn
        title="Zoom Out"
        fa="minus"
        action={() => {
          resizeCanvas(-0.1);
        }}
      />
      <span className="verti-sep"></span>
      <ToolText width="50px">
        {`${calcRealRatioPersent(SVGSizeRatio)}%`}
      </ToolText>
    </div>
  );
};

export default Zoom;
