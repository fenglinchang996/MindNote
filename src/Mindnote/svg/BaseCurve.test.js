import React from "react";
import renderer from "react-test-renderer";
import BaseCurve from "./BaseCurve";

test("BaseCurve", () => {
  const curveData = {
    id: "test",
    start: { x: 480, y: 295 },
    startControl: { x: 479, y: 331 },
    endControl: { x: 478, y: 350 },
    end: { x: 478, y: 386 },
    level: 1,
    style: {
      fill: "none",
      stroke: "blue",
      strokeWidth: 5,
      strokeLinecap: "round",
    },
  };
  const component = renderer.create(<BaseCurve curveData={curveData} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
