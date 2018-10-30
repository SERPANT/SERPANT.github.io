class Shape {
  constructor() {
    this.Type;
    this.angle;
    this.position;
    this.cube = [];
    this.front = 1;
    this.verti = [];
    this.dimension = 0;
    this.facePattern = [];
    this.directionArr = [];

    this.cubeFace = [
      [0, 4, 7, 3],
      [1, 5, 6, 2],
      [0, 1, 5, 4],
      [7, 6, 2, 3],
      [0, 1, 2, 3],
      [4, 5, 6, 7]
    ];
  }

  makeFace(cubeface) {
    let counter = 0;
    for (let face of cubeface) {
      let index = cubeface.indexOf(face);
      counter++;
      let vertex0 = this.cube[face[0]];
      let vertex2 = this.cube[face[2]];
      let vertex3 = this.cube[face[3]];

      let side1 = subtract(vertex0, vertex3);
      let side2 = subtract(vertex2, vertex3);
      let oriantationVector = cross(side1, side2);

      if (
        Math.sign(oriantationVector[this.dimension]) === Math.sign(this.front)
      ) {
        let temp = face[0];
        face[0] = face[2];
        face[2] = temp;
      }
      if (counter % 2 === 0) {
        this.dimension++;
      }

      if (this.front == 1) {
        this.front = -1;
      } else {
        this.front = 1;
      }

      cubeface[index] = face;
    }

    return cubeface;
  }

  initVertices(theta, pos) {
    let [s, d, f] = this.rotateSelf(theta, pos);

    for (let i in this.cube) {
      let [X, Y, Z] = this.cube[i];
      this.verti.push([s + X, d + Y, f + Z]);
    }
  }

  updateVertices(angle, position) {
    let [s, d, f] = this.rotateSelf(angle, position);
    this.verti = [];
    for (let i in this.cube) {
      let [X, Y, Z] = this.cube[i];
      this.verti.push([s + X, d + Y, f + Z]);
    }
  }

  rotateSelf(theta, position) {
    var [x, y, z] = position;
    var s = Math.cos(theta) * x - Math.sin(theta) * z;
    var d = y;
    var f = Math.sin(theta) * x + Math.cos(theta) * z;

    return [s, d, f];
  }

  updatePosition(newPosition) {
    this.position = newPosition;
    this.updateVertices(this.angle, this.position);
  }
}
