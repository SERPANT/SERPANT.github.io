class Enemy extends GameObject {
  constructor() {
    super();
    this.speed;
    this.objectType = 4;
    this.jawUp = 0;
    this.jawSpeed = 3;
    this.copyY;
    this.moveDirection = 0;
  }

  init(detail, motionSpeed) {
    this.speed = motionSpeed;

    let [position, pattern] = detail;
    let [x, y, z] = position;
    this.copyY = y;

    for (let i = 0; i < 2; i++) {
      let cubeOb = new CubeObject();
      cubeOb.init([x, i * -100 + y, z], pattern, 0, 4, 60);
      this.CubeArray.push(cubeOb);
    }

    let cubeOb = new CubeObject();
    cubeOb.init([x, 2 * -127 + y, z], pattern, 0, 4, 60);
    this.CubeArray.push(cubeOb);

    this.initPosition();
  }

  moveUpdate() {
    for (let cubeOb in this.CubeArray) {
      let [x, y, z] = this.CubeArray[cubeOb].position;
      this.changeDirection(x);

      if (this.moveDirection === 0) {
        if (parseInt(cubeOb) === this.CubeArray.length - 1) {
          this.toggleUpDown(y);
          if (this.jawUp === 0) {
            this.CubeArray[cubeOb].updatePosition([
              x + this.speed,
              y + this.jawSpeed,
              z
            ]);
          } else {
            this.CubeArray[cubeOb].updatePosition([
              x + this.speed,
              y - this.jawSpeed,
              z
            ]);
          }
        } else {
          this.CubeArray[cubeOb].updatePosition([x + this.speed, y, z]);
        }
      } else {
        if (parseInt(cubeOb) === this.CubeArray.length - 1) {
          this.toggleUpDown(y);
          if (this.jawUp === 0) {
            this.CubeArray[cubeOb].updatePosition([
              x - this.speed,
              y + this.jawSpeed,
              z
            ]);
          } else {
            this.CubeArray[cubeOb].updatePosition([
              x - this.speed,
              y - this.jawSpeed,
              z
            ]);
          }
        } else {
          this.CubeArray[cubeOb].updatePosition([x - this.speed, y, z]);
        }
      }
    }

    this.initPosition();
  }

  changeDirection(x) {
    if (x > 1070) {
      this.moveDirection = 1;
    } else if (x < -450) {
      this.moveDirection = 0;
    }
  }

  toggleUpDown(y) {
    if (y >= 2 * -110 + this.copyY) {
      this.jawUp = 1;
    } else if (y <= 2 * -129 + this.copyY) {
      this.jawUp = 0;
    }
  }
}
