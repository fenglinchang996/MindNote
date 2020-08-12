import { createContext } from "react";
import { STROKE_TYPE } from "./utils/enums";

const styleContext = createContext({
  defaultNodeStyle: {
    width: 120,
    height: 40,
    rxRatio: 0.1,
    ryRatio: 0.2,
    borderType: STROKE_TYPE.SOLID,
    style: {
      fill: "#ffffff",
      stroke: "#000000",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeDasharray: "none",
    },
  },
  nodeStyles: [
    {
      rxRatio: 0.1,
      ryRatio: 0.2,
      borderType: STROKE_TYPE.SHORT_DASH,
      style: {
        fill: "#ffffff",
        stroke: "#008000",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDasharray: [4, 4],
      },
    },
    {
      rxRatio: 0.1,
      ryRatio: 0.5,
      borderType: STROKE_TYPE.LONG_DASH,
      style: {
        fill: "#ffffff",
        stroke: "#0000ff",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDasharray: [8, 4],
      },
    },
  ],
  nodePointStyle: {
    r: 5,
    style: {
      stroke: "#000000",
      fill: "#ffffff",
      cursor: "pointer",
    },
  },
  nodeContentStyle: {
    widthRatio: 0.9,
    heightRatio: 0.8,
    style: {
      fontSize: "0.8rem",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
  },
  virtualNodeStyle: {
    style: {
      stroke: "#ffc0cb",
      strokeDasharray: [5, 2],
    },
  },
  selectedNodeStyle: {
    style: {
      stroke: "#ff0000",
    },
  },
  viewNodeStyle: {
    style: {
      stroke: "#ff0000",
    },
  },
  connectionArrowStyle: {
    style: {},
  },
  defaultCurveStyle: {
    type: STROKE_TYPE.SOLID,
    style: {
      fill: "none",
      stroke: "#0000ff",
      strokeWidth: 5,
      strokeLinecap: "round",
      strokeDasharray: "none",
    },
  },
  curveStyles: [
    null,
    {
      type: STROKE_TYPE.SHORT_DASH,
      style: {
        fill: "none",
        stroke: "#ffbf00",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeDasharray: [6, 6],
      },
    },
    {
      type: STROKE_TYPE.SHORT_DASH,
      style: {
        fill: "none",
        stroke: "#800080",
        strokeWidth: 5,
        strokeLinecap: "round",
        strokeDasharray: [20, 10],
      },
    },
  ],
  defaultCurveArrowStyle: {
    style: {
      fill: "#0000ff",
    },
  },
  curveArrowStyles: [
    {
      style: {
        fill: "#0000ff",
      },
    },
  ],
  virtualCurveStyle: {
    style: {},
  },
  selectedCurveStyle: {
    style: {},
  },
  viewCurveStyle: {
    style: {},
  },
  curvePointStyle: {
    r: 5,
    style: {
      stroke: "#000000",
      fill: "#ffffff",
      cursor: "pointer",
    },
  },
  curveControlStyle: {
    r: 5,
    style: {
      stroke: "#000000",
      fill: "#ffffff",
      cursor: "pointer",
    },
  },
  curveControlLineStyle: {
    style: {
      fill: "none",
      stroke: "#d3d3d3",
      strokeWidth: 5,
      strokeDasharray: "2, 2",
    },
  },
  noteStyle: {
    defaultWidth: 300,
    minWidth: 250,
  },
});

export default styleContext;
