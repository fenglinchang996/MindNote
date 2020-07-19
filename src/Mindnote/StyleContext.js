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
    offset: 5,
    style: {
      fill: "blue",
    },
  },
  curveStyle: {},
});

export default styleContext;
