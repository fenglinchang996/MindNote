const calcIntersectionPoint = (A1, A2, B1, B2) => {
  // Check if none of the lines are of length 0
  if ((A1.x === A2.x && A1.y === A2.y) || (B1.x === B2.x && B1.y === B2.y)) {
    return null;
  }

  let denominator =
    (B2.y - B1.y) * (A2.x - A1.x) - (B2.x - B1.x) * (A2.y - A1.y);

  // Lines are parallel
  if (denominator === 0) {
    return null;
  }

  let ua =
    ((B2.x - B1.x) * (A1.y - B1.y) - (B2.y - B1.y) * (A1.x - B1.x)) /
    denominator;
  let ub =
    ((A2.x - A1.x) * (A1.y - B1.y) - (A2.y - A1.y) * (A1.x - B1.x)) /
    denominator;

  // Is the intersection ßalong the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return null;
  }

  // Return a object with the x and y coordinates of the intersection
  let x = A1.x + ua * (A2.x - A1.x);
  let y = A1.y + ua * (A2.y - A1.y);

  return { x, y };
};

const calcCenterPoint = (M, N) => ({
  x: 0.5 * (M.x + N.x),
  y: 0.5 * (M.y + N.y),
});

const calcPointsDistance = (M, N) => {
  const xSquare = Math.pow(M.x - N.x, 2);
  const ySquare = Math.pow(M.y - N.y, 2);
  return Math.sqrt(xSquare + ySquare);
};

const calcOffset = (O, P) => ({ dx: P.x - O.x, dy: P.y - O.y });

const calcMovingPoint = (O, movement) => ({
  x: O.x + movement.dx,
  y: O.y + movement.dy,
});

export {
  calcIntersectionPoint,
  calcCenterPoint,
  calcPointsDistance,
  calcOffset,
  calcMovingPoint,
};
