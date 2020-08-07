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
    style: {
      fill: "none",
      stroke: "blue",
      strokeWidth: 5,
      strokeLinecap: "round",
    },
  },
  curveStyles: [
    null,
    {
      style: {
        fill: "none",
        stroke: "#ffbf00",
        strokeWidth: 5,
        strokeLinecap: "round",
      },
    },
    {
      style: {
        fill: "none",
        stroke: "purple",
        strokeWidth: 5,
        strokeLinecap: "round",
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
      strokeDasharray: "10, 10",
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
