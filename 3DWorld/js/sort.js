function sortAllCubes(cubeArray, camPositon) {
  // console.log("here");
  let [x1, y1, z1] = camPositon;
  let distarray = [];
  let counter = 0;
  for (cube of cubeArray) {
    let [x2, y2, z2] = cube.position;
    let xdis = Math.pow(x2 - x1, 2);
    let ydis = Math.pow(y2 - y1, 2);
    let zdis = Math.pow(z2 - z1, 2);
    let dist = xdis + ydis + zdis;
    distarray.push([dist, counter]);
    counter++;
  }

  distarray.sort(sorting);
  distarray.reverse();
  let newObjectArr = [];

  for (i of distarray) {
    newObjectArr.push(cubeArray[i[1]]);
  }
  return newObjectArr;
}

function sorting(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}
