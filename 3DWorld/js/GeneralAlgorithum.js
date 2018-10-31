function sortByDistance(array, camPositon) {
  let counter = 0;
  let distarray = [];

  for (let element of array) {
    let dist = coordinateDistance(camPositon, element.position);
    distarray.push([dist, counter]);
    counter++;
  }

  distarray.sort(sortFunction);
  distarray.reverse();
  let newObjectArr = [];

  for (i of distarray) {
    newObjectArr.push(array[i[1]]);
  }
  return newObjectArr;
}

function sortFunction(a, b) {
  if (a[0] === b[0]) {
    return 0;
  } else {
    return a[0] < b[0] ? -1 : 1;
  }
}

function coordinateDistance(point1, point2) {
  let [x1, y1, z1] = point1;
  let [x2, y2, z2] = point2;

  let xdis = Math.pow(x2 - x1, 2);
  let ydis = Math.pow(y2 - y1, 2);
  let zdis = Math.pow(z2 - z1, 2);
  let dist = xdis + ydis + zdis;

  return dist;
}

function shuffle(array) {
  let newArray = Object.assign([], array);
  var currentIndex = newArray.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = newArray[currentIndex];
    newArray[currentIndex] = newArray[randomIndex];
    newArray[randomIndex] = temporaryValue;
  }

  return newArray;
}

function getRandom(start, stop) {
  let number = Math.floor(Math.random() * stop) + start;
  return number;
}
