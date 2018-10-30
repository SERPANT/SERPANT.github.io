class Tree extends GameObject {
  constructor() {
    super();
    this.objectType = 6;
  }

  makeTree(details) {
    let [position, pattern, patternTree] = details;
    let [x, y, z] = position;

    for (let i = 0; i < 5; i++) {
      let cubeOb = new CubeObject();
      cubeOb.init([x, i * -65 + y, z], pattern, 0, 6, 30);
      this.CubeArray.push(cubeOb);
    }

    let cubeOb = new pyramidTree();
    cubeOb.init([x, 5 * -136 + y, z], patternTree, 0, 6, 200);
    this.CubeArray.push(cubeOb);

    this.initPosition();
  }
}
