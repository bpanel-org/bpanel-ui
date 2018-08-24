import makeRem from './makeRem';

export default (
  type = 'padding',
  { top, bottom, left, right, horizontal, vertical, all }
) => {
  let gutterTop, gutterRight, gutterBottom, gutterLeft;

  // All gutter calculations
  if (all) gutterRight = gutterLeft = gutterTop = gutterBottom = makeRem(all);

  // Horizontal gutter calculation
  if (horizontal || horizontal === 0) {
    gutterRight = gutterLeft = makeRem(horizontal);
  } else {
    gutterRight = gutterRight || ((right || right === 0) && makeRem(right));
    gutterLeft = gutterLeft || ((left || left === 0) && makeRem(left));
  }

  // Vertical gutter calculation
  if (vertical || vertical === 0) {
    gutterTop = gutterBottom = makeRem(vertical);
  } else {
    gutterTop = gutterTop || ((top || top === 0) && makeRem(top));
    gutterBottom =
      gutterBottom || ((bottom || bottom === 0) && makeRem(bottom));
  }
  const styleObj = {};
  if (gutterTop) styleObj[`${type}Top`] = gutterTop;
  if (gutterRight) styleObj[`${type}Right`] = gutterRight;
  if (gutterBottom) styleObj[`${type}Bottom`] = gutterBottom;
  if (gutterLeft) styleObj[`${type}Left`] = gutterLeft;

  return styleObj;
};
