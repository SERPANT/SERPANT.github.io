/**
 *
 * @param {number} width : Both length and breath of square.
 *
 *  @returns {Array} : array of point that represent a square
 */
function makeSquare(width) {
  return [[0, 0], [width, 0], [width, width], [0, width]];
}

/**
 *
 * @param {number} width : Length of rectangle.
 * @param {number} height : Breath of rectangle.
 *
 * @returns {Array} : array of point that represent a rectangle
 */
function makeRectangle(width, height) {
  const rectangle = [[0, 0], [width, 0], [width, height], [0, height]];
  return rectangle;
}

function makeTriangle(width, height) {
  const triangle = [[width / 2, 0], [0, height], [width, height]];
  return triangle;
}
