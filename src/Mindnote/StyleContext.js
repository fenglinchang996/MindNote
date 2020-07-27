import { createContext } from "react";

const styleContext = createContext({
  SVGStyle: {
    style: {},
  },
  nodeStyle: {
    width: 80,
    height: 40,
    style: {
      rx: 5,
      ry: 5,
      fill: "white",
      stroke: "red",
      strokeWidth: 2,
    },
  },
  nodePointStyle: {
    r: 5,
    style: {
      stroke: "black",
      fill: "white",
      cursor: "pointer",
    },
  },
  nodeContentStyle: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgray",
    },
  },
  virtualNodeStyle: {
    style: {
      rx: 5,
      ry: 5,
      fill: "white",
      stroke: "pink",
      strokeWidth: 2,
      strokeDasharray: "5, 5",
    },
  },
  connectionArrowStyle: {
    style: {
      fill: "blue",
      cursor: "pointer",
    },
  },
  curveStyle: {
    style: {
      fill: "none",
      stroke: "blue",
      strokeWidth: 5,
      strokeLinecap: "round",
    },
  },
  virtualCurveStyle: {
    style: {
      fill: "none",
      stroke: "lightblue",
      strokeWidth: 5,
      strokeDasharray: "10, 5",
    },
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
});

export default styleContext;
