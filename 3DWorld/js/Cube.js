class CubeObject extends Shape {
  init(pos = [0, 0, 0], pattern, theta = 0, objectType = 0, size = 10) {
    this.position = pos;
    this.Type = objectType;
    let c = size;

    this.cube = [
      [-c, -c, -c], //top left front
      [c, -c, -c], //top right front
      [c, c, -c], //bottom right front
      [-c, c, -c], //bottom left front
      [-c, -c, c], //top left back
      [c, -c, c], //top right back
      [c, c, c], //bottom right back
      [-c, c, c] //bottom left back
    ];

    this.angle = theta;
    this.initVertices(theta, pos);
    this.facePattern = pattern;
    this.cubeFace = this.makeFace(this.cubeFace);
  }
}
