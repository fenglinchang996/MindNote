import { createContext } from "react";

const SVGContext = createContext({
  drawNewNode: () => {},
  modifyCurveControl: () => {},
});

export default SVGContext;
