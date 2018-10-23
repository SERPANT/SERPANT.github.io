var Wall = function() {
  this.CubeArray = [];
  this.top;
  this.rotated = false;
  this.sidePoints = [];

  this.makeWall = function(detail) {
    var [x, y, z, wallW, wallH, angle, color] = detail;
    let a = Math.floor(wallW / 55);
    let b = Math.floor(wallH / 55);
    // console.log("height", wallH);
    // console.log("width", wallW);
    // console.log("pos", x, y, z);
    // console.log("a", a);
    // console.log("b", b);
    for (var i = x; i < x + wallW; i = i + 55) {
      for (var j = y; j < y + wallH; j = j + 55) {
        cubeOb = new CubeObject();
        cubeOb.init([i, -j, z], color, angle, 0, 30);
        if (i === x && j === y) {
          this.sidePoints.push(cubeOb.verti[3]);
          this.sidePoints.push(cubeOb.verti[7]);
        }

        if (i === x + a * 55 && j === y) {
          this.sidePoints.push(cubeOb.verti[2]);
          this.sidePoints.push(cubeOb.verti[6]);
        }
        if (i === x && j === y + b * 55) {
          this.sidePoints.push(cubeOb.verti[0]);
          this.sidePoints.push(cubeOb.verti[4]);
        }
        if (i === x + a * 55 && j === y + b * 55) {
          this.sidePoints.push(cubeOb.verti[1]);
          this.sidePoints.push(cubeOb.verti[5]);
        }

        this.CubeArray.push(cubeOb);
      }
    }
    //  console.log(this.wallSidePoints);

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
