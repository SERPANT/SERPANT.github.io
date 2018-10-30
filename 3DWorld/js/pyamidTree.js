class pyramidTree extends pyramidObject {
  init(pos = [0, 0, 0], pattern, theta = 0, objectType = 0, size = 10) {
    this.position = pos;
    this.Type = objectType;
    let c = size;
    let v = 180;
    this.cube = [
      [1, 1, 1], //top left front
      [1, 1, 1], //top right front
      [c / 2, c + v, -c / 2], //bottom right front
      [-c / 2, c + v, -c / 2], //bottom left front
      [1, 1, 1], //top left back
      [1, 1, 1], //top right back
      [c / 2, c + v, c / 2], //bottom right back
      [-c / 2, c + v, c / 2] //bottom left back
    ];
    this.angle = theta;
    this.initVertices(theta, pos);

    this.facePattern = pattern;
    this.cubeFace = this.makeFace(this.cubeFace);
  }
}
