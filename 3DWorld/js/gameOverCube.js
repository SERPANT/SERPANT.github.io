class overCube extends GameObject {
  constructor() {
    super();
    this.objectType = 5;
    this.ratationAngle = 0.1;
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  init(detail) {
    let [position, pattern] = detail;
    let [x, y, z] = position;

    let cubeOb = new CubeOverObject();
    cubeOb.init([x, y, z], pattern, 0, 5, 100);
    this.CubeArray.push(cubeOb);

    this.initPosition();
  }

  moveUpdate() {
    console.log("running");
    for (let cubeOb of this.CubeArray) {
      cubeOb.rotateCenter(this.ratationAngle, cubeOb.position);
    }
    this.initPosition();
  }
}
