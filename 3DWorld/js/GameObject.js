class GameObject {
  constructor() {
    this.objectType = -5;
    this.CubeArray = [];
    this.rotated = false;
    this.facePattern = [];
    this.position = [0, 0, 0];
  }

  initPosition() {
    var final = this.CubeArray[this.CubeArray.length - 1];
    this.position = final.verti[Math.floor((final.verti.length - 1) / 2)];
  }

  /** returns a array of cube object that make the object */
  getCube() {
    return this.CubeArray;
  }

  /**
   *
   * @param {*} camPositon : the current position of camera
   */
  sortCubes(camPositon) {
    this.CubeArray = sortByDistance(this.CubeArray, camPositon);
  }

  getObjectType() {
    return this.objectType;
  }
}
