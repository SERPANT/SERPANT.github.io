var Stair = function() {
  this.CubeArray = [];
  this.top;
  this.rotated = false;

  this.makeStair = function(detail) {
    var [x, y, z, wallW, wallH, angle, color] = detail;
    let a = Math.floor(wallW / 55);
    let b = Math.floor(wallH / 55);

    for (var i = x; i < x + wallW; i = i + 55) {
      for (var j = y; j < y + wallH; j = j + 55) {
        if (i === j) {
          cubeOb = new CubeObject();
          cubeOb.init([i, -j, z], color, angle, 0, 30);
          this.CubeArray.push(cubeOb);
        }
      }
    }

    var final = this.CubeArray[this.CubeArray.length - 1];
    this.top = final.verti[Math.floor((final.verti.length - 1) / 2)];
    if (angle > 0) {
      this.rotated = true;
    }
  };

  this.getCube = function() {
    return this.CubeArray;
  };

  this.sortCubes = function(camPositon) {
    this.CubeArray = sortAllCubes(this.CubeArray, camPositon);
  };
};
