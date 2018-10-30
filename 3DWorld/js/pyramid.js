class pyramidObject extends Shape {
  init(pos = [0, 0, 0], pattern, theta = 0, objectType = 0, size = 10) {
    this.position = pos;
    this.Type = objectType;
    let c = size;
    let v = 80;
    this.cube = [
      [1, 1, 1], //top left front
      [1, 1, 1], //top right front
      [c, c + v, -c], //bottom right front
      [-c, c + v, -c], //bottom left front
      [1, 1, 1], //top left back
      [1, 1, 1], //top right back
      [c, c + v, c], //bottom right back
      [-c, c + v, c] //bottom left back
    ];
    this.angle = theta;
    this.initVertices(theta, pos);

    this.facePattern = pattern;
    this.cubeFace = this.makeFace(this.cubeFace);
  }

  /**
   *
   * @param {*} theta angle of rotation in radian
   * @param {*} position current position of camera
   */
  rotateCenter(theta, position) {
    for (let vertex in this.cube) {
      let [x, y, z] = this.cube[vertex];
      let newX = x - 1;
      let newY = y - 1;
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

  /**
   *
   * @param {*} theta angle of rotation in radian
   * @param {*} x x coordinate of point to be rotated
   * @param {*} y y coordinate of point to be rotated
   * @param {*} z z coordinate of point to be rotated
   */
  rotateY(theta, x, y, z) {
    return [
      Math.cos(theta) * x - Math.sin(theta) * z,
      y,
      Math.sin(theta) * x + Math.cos(theta) * z
    ];
  }
}
