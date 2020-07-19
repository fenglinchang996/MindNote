import React, { useState, useReducer, createContext } from "react";
import Header from "../Header";
import Canvas from "./Canvas";
import Tool from "./Tool";
import StyleContext from "./StyleContext";
import ItemContext from "./ItemContext";
import { LIST_ACTION_TYPE } from "./enums";

const listReducer = (list, action) => {
  switch (action.type) {
    case LIST_ACTION_TYPE.ADD_ITEMS:
      return [...list, ...action.items];
    case LIST_ACTION_TYPE.UPDATE_ITEMS:
      const unChangedItems = list.filter(
        (item) =>
          !action.items.some(
            (itemToBeUpdated) => itemToBeUpdated.id === item.id
          )
      );
      return [...unChangedItems, ...action.items];
    case LIST_ACTION_TYPE.DELETE_ITEMS:
      return list.filter(
        (item) =>
          !action.items.some(
            (itemToBeDeleted) => itemToBeDeleted.id === item.id
          )
      );
    default:
      return list;
  }
};

const Mindnote = (props) => {
  const [nodeList, dispatchNodes] = useReducer(listReducer, []);
  const [curveList, dispatchCurves] = useReducer(listReducer, []);
  const ItemContextValue = {
    nodeList,
    dispatchNodes,
    curveList,
    dispatchCurves,
  };
  return (
    <div className="mindnote">
      <Header>
        <div className="go-back-btn">
          <i className="fas fa-chevron-left"></i>&nbsp; Back
        </div>
      </Header>
      <ItemContext.Provider value={ItemContextValue}>
        <Canvas />
      </ItemContext.Provider>
      <Tool />
    </div>
  );
};

export default Mindnote;
