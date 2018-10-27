class Enemy extends GameObject {
  constructor() {
    super();
    this.speed;
    this.objectType = 4;
    this.moveDirection = 0;
  }

  init(detail, motionSpeed) {
    this.speed = motionSpeed;

    let [position, pattern] = detail;
    let [x, y, z] = position;
    this.facePattern = pattern;
    for (let i = 0; i < 3; i++) {
      let cubeOb = new CubeObject();
      cubeOb.init([x, i * -100 + y, z], "gold", 0, 4, 60);
      this.CubeArray.push(cubeOb);
    }
    this.initPosition();
  }

  moveUpdate() {
    for (let cubeOb of this.CubeArray) {
      //console.log(cubeOb.position);
      let [x, y, z] = cubeOb.position;
      this.changeDirection(x);
      if (this.moveDirection === 0) {
        cubeOb.updatePosition([x + this.speed, y, z]);
      } else {
        cubeOb.updatePosition([x - this.speed, y, z]);
      }
    }
    this.initPosition();
  }

  changeDirection(x) {
    if (x > 850) {
      this.moveDirection = 1;
    } else if (x < -670) {
      this.moveDirection = 0;
    }
  }
}
