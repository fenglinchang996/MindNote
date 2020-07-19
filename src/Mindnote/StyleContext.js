import { createContext } from "react";

const styleContext = createContext({
  SVGStyle: {
    style: {
      border: "1px solid black",
    },
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
  curvePointStyle: {
    r: 5,
    style: {
      fill: "green",
    },
  },
  curveControlStyle: {
    r: 5,
    style: {
      fill: "green",
    },
  },
  curveControlLineStyle: {
    style: {
      fill: "none",
      stroke: "lightgray",
      strokeWidth: 5,
      strokeDasharray: "5, 5",
    },
  },
});

export default styleContext;
