import { createContext } from "react";

const styleContext = createContext({
  defaultNodeStyle: {
    width: 120,
    height: 40,
    rxRatio: 0.1,
    ryRatio: 0.2,
    style: {
      fill: "white",
      stroke: "black",
      strokeWidth: 2,
    },
  },
  nodeStyles: [
    {
      rxRatio: 0.1,
      ryRatio: 0.2,
      style: { fill: "white", stroke: "green", strokeWidth: 2 },
    },
    {
      rxRatio: 0.1,
      ryRatio: 0.5,
      style: {
        fill: "white",
        stroke: "blue",
        strokeWidth: 2,
      },
    },
  ],
  nodePointStyle: {
    r: 5,
    style: {
      stroke: "black",
      fill: "white",
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
      stroke: "pink",
      strokeDasharray: [5, 2],
    },
  },
  selectedNodeStyle: {
    style: {
      stroke: "red",
    },
  },
  viewNodeStyle: {
    style: {
      stroke: "red",
    },
  },
  connectionArrowStyle: {
    style: {},
  },
  defaultCurveStyle: {
    type: "Solid",
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
      type: "Short Dash",
      style: {
        fill: "none",
        stroke: "#ffbf00",
        strokeWidth: 3,
        strokeLinecap: "round",
        strokeDasharray: [3, 6],
      },
    },
    {
      type: "Short Dash",
      style: {
        fill: "none",
        stroke: "#800080",
        strokeWidth: 5,
        strokeLinecap: "round",
        strokeDasharray: [5, 10],
      },
    },
  ],
  defaultCurveArrowStyle: {
    style: {
      fill: "blue",
    },
  },
  curveArrowStyles: [
    {
      style: {
        fill: "blue",
      },
    },
  ],
  virtualCurveStyle: {
    style: {
      stroke: "#ffc0cb",
    },
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
      stroke: "black",
      fill: "white",
      cursor: "pointer",
    },
  },
  curveControlStyle: {
    r: 5,
    style: {
      stroke: "black",
      fill: "white",
      cursor: "pointer",
    },
  },
  curveControlLineStyle: {
    style: {
      fill: "none",
      stroke: "lightgray",
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
