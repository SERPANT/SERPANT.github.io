class overCube extends GameObject {
  constructor() {
    super();
    this.objectType = 10;
    this.ratationAngle = 1;
    this.map = [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1],
      [1, 1, 1, 0, 0, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 1, 0, 0, 1],
      [0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1],
      [0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 1],
      [1, 0, 0, 1, 0, 1]
    ];
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  init(detail) {
    let [position, pattern] = detail;
    let [x, y, z] = position;

    for (let row in this.map) {
      for (let col in this.map[row]) {
        let cubeOb = new CubeObject();
        if (this.map[row][col] === 1) {
          cubeOb.init([row * 210 + x, col * -300 + y, z], pattern, 0, 5, 100);
          this.CubeArray.push(cubeOb);
        }
      }
    }

    this.initPosition();
  }

  moveUpdate() {
    for (let cubeOb of this.CubeArray) {
      cubeOb.rotateCenter(this.ratationAngle, cubeOb.position);
    }
    this.initPosition();
  }
}
