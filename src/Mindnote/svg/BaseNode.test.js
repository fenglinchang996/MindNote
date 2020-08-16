import React from "react";
import renderer from "react-test-renderer";
import StyleContext from "../StyleContext";
import BaseNode from "./BaseNode";

test("BaseNode", () => {
  const centerNodeData = {
    width: 120,
    height: 40,
    center: { x: 480, y: 270 },
    title: "Center",
    level: 0,
  };
  const StyleContextValue = {
    nodeStyles: [],
    defaultNodeStyle: {
      rxRatio: 0.1,
      ryRatio: 0.2,
      style: {
        fill: "white",
        stroke: "black",
        strokeWidth: 2,
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
  };
  const component = renderer.create(
    <StyleContext.Provider value={StyleContextValue}>
      <BaseNode nodeData={centerNodeData} />
    </StyleContext.Provider>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
