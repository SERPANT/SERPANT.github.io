var CubeObject = function() {
  var c = 10;
  this.verti = [];
  this.Type;

  // var cube = [
  //   [-c, -c, -c],
  //   [c, -c, -c],
  //   [c, c, -c],
  //   [-c, c, -c],
  //   [-c, -c, c],
  //   [c, -c, c],
  //   [c, c, c],
  //   [-c, c, c]
  // ];

  var cube = [];

  this.cubeFace = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [0, 1, 5, 4],
    [2, 3, 7, 6],
    [0, 3, 7, 4],
    [1, 2, 6, 5]
  ];

  this.color;

  this.init = function(
    pos = [0, 0, 0],
    color = "red",
    theta = 0,
    objectType = 0,
    size = 10
  ) {
    this.Type = objectType;
    c = size;

    cube = [
      [-c, -c, -c],
      [c, -c, -c],
      [c, c, -c],
      [-c, c, -c],
      [-c, -c, c],
      [c, -c, c],
      [c, c, c],
      [-c, c, c]
    ];

    var [x, y, z] = pos;

    for (i in cube) {
      var [X, Y, Z] = cube[i];

      var s = Math.cos(theta) * x - Math.sin(theta) * z;
      var d = y;
      var f = Math.sin(theta) * x + Math.cos(theta) * z;

      //  this.verti.push([x + X, y + Y, z + Z]);
      this.verti.push([s + X, d + Y, f + Z]);
    }
    this.color = color;
  };

  // this.selfRotate = function(center, theta = 360) {
  //   for (point in cube) {
  //     var [x, y, z] = cube[point];

  //     x = x;
  //     y = y + center[1];
  //     z = z + center[2];

  //     var s = x;
  //     var d = Math.cos(theta) * y - Math.sin(theta) * z - center[1];
  //     var f = Math.sin(theta) * y + Math.cos(theta) * z - center[2];

  //     cube[point] = [s, d, f];
  //   }
  //   // console.log(cube);
  // };
};
