import { createContext } from "react";

const ItemContext = createContext({
  nodeList: [],
  curveList: [],
});

export default ItemContext;
