class Wall extends GameObject {
  constructor() {
    super();
    this.objectType = 1;
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  makeWall(detail) {
    let angle = detail[5];

    if (angle === 0) {
      this.drawHorizontalCube(detail);
    } else {
      this.drawVertialCube(detail);
    }
    this.initPosition();
    if (angle > 0) {
      this.rotated = true;
    }
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  drawHorizontalCube(detail) {
    let [x, y, z, wallW, wallH, angle, pattern] = detail;
    for (var i = x; i < x + wallW; i = i + 55) {
      for (var j = y; j < y + wallH; j = j + 55) {
        let cubeOb = new CubeObject();
        cubeOb.init([i, -j, z], pattern, angle, 0, 30);

        this.CubeArray.push(cubeOb);
      }
    }
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  drawVertialCube(detail) {
    let [x, y, z, wallW, wallH, angle, pattern] = detail;
    for (var i = z; i < z + wallW; i = i + 55) {
      for (var j = y; j < y + wallH; j = j + 55) {
        let cubeOb = new CubeObject();
        cubeOb.init([x, -j, i], pattern, angle, 5, 30);

        this.CubeArray.push(cubeOb);
      }
    }
  }
}
