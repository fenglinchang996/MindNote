import { createContext } from "react";

const SVGContext = createContext({
  drawNewNode: () => {},
});

export default SVGContext;
