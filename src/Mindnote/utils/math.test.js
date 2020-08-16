import { calcIntersectionPoint } from "./math";

test("calc intersection of A1(1, 1) - A2(3, 1) and B1(2, 0) - B2(2, 2)", () => {
  const A1 = { x: 1, y: 1 };
  const A2 = { x: 3, y: 1 };
  const B1 = { x: 2, y: 0 };
  const B2 = { x: 2, y: 2 };
  const intersection = { x: 2, y: 1 };
  expect(calcIntersectionPoint(A1, A2, B1, B2)).toEqual(intersection);
});

test("two parallel line segments", () => {
  const A1 = { x: 2, y: 2 };
  const A2 = { x: 5, y: 5 };
  const B1 = { x: 1, y: 6 };
  const B2 = { x: 7, y: 12 };
  expect(calcIntersectionPoint(A1, A2, B1, B2)).toBeNull();
});

test("0 length segment(s)", () => {
  const A1 = { x: 2, y: 2 };
  const A2 = { x: 2, y: 2 };
  const B1 = { x: 1, y: 6 };
  const B2 = { x: 7, y: 12 };
  expect(calcIntersectionPoint(A1, A2, B1, B2)).toBeNull();
});

test("the intersection out of the segments", () => {
  const A1 = { x: 1, y: 2 };
  const A2 = { x: 3, y: 4 };
  const B1 = { x: 5, y: 7 };
  const B2 = { x: 6, y: 9 };
  expect(calcIntersectionPoint(A1, A2, B1, B2)).toBeNull();
});
