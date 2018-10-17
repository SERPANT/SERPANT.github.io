var Road = function() {
  this.CubeArray = [];
  this.top = [8000, 8000, 8000];

  this.makeRoad = function(startx) {
    //  console.log(start);
    for (var x = -startx - 200; x < startx + 200; x += 20) {
      for (var z = -150; z < 1000; z += 20) {
        cubeOb = new CubeObject();
        // if (x > -5 && x < 160 && z > 30 && z < 220) {
        //   cubeOb.init([x, -100, z], "blue", 0, 2);
        // } else {
        cubeOb.init([x, -15, z], "green", 0, 2);
        // }
        this.CubeArray.push(cubeOb);
      }
    }
  };

  this.getCube = function() {
    return this.CubeArray;
  };
};
