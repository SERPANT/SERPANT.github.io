class CubeOverObject extends pyramidObject {
  init(pos = [0, 0, 0], pattern, theta = 0, objectType = 0, size = 10) {
    this.position = pos;
    this.Type = objectType;
    let c = size;
    let v = 80;
    this.cube = [
      [-c, -2 * c, -c], //top left front
      [c, -2 * c, -c], //top right front
      [c, c, -c], //bottom right front
      [-c, c, -c], //bottom left front
      [-c, -2 * c, c], //top left back
      [c, -2 * c, c], //top right back
      [c, c, c], //bottom right back
      [-c, c, c] //bottom left back
    ];
    this.angle = theta;
    this.initVertices(theta, pos);

    this.facePattern = pattern;
    this.cubeFace = this.makeFace(this.cubeFace);
  }

  rotateCenter(theta, position) {
    for (let vertex in this.cube) {
      let [x, y, z] = this.cube[vertex];
      let newX = x - 1;
      let newY = y + 50;
      let newZ = z - 1;
      let [rotatedX, rotatedY, rotatedZ] = this.rotateY(
        theta,
        newX,
        newY,
        newZ
      );

      this.cube[vertex] = [rotatedX + 1, rotatedY + 1, rotatedZ + 1];
    }

    this.updateVertices(this.angle, position);
  }
}
