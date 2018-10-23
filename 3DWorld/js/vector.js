function cross(vector1, vector2) {
  return [
    vector1[1] * vector2[2] - vector1[2] * vector2[1],
    vector1[2] * vector2[0] - vector1[0] * vector2[2],
    vector1[0] * vector2[1] - vector1[1] * vector2[0]
  ];
}

function subtract(vector1, vector2) {
  return add(vector1, scale(vector2, -1));
}

function counterClockWise(vector1, vector2) {
  return cross(vector1, vector2)[2] > 0;
}

function add(vector1, vector2) {
  return [
    vector1[0] + vector2[0],
    vector1[1] + vector2[1],
    vector1[2] + vector2[2]
  ];
}

function scale(vector, scalar) {
  return [scalar * vector[0], scalar * vector[1], scalar * vector[2]];
}

// function rotateY(vector1, mtheta) {
//   //var [x,y,z]=point;
//   return new Vector(
//     Math.cos(theta) * vector1[0] - Math.sin(theta) * vector1[2],
//     vector1[1],
//     Math.sin(theta) * vector1[0] + Math.cos(theta) * vector1[2]
//   );
// }

// function rotateX(vector1, theta) {
//   // var [x,y,z]=point;
//   return [
//     vector1[0],
//     Math.cos(theta) * vector1[1] - Math.sin(theta) * vector1[2],
//     Math.sin(theta) * vector1[1] + Math.cos(theta) * vector1[2]
//   ];
//}
