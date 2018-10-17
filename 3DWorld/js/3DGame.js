function Game(canv) {
  var canvas;
  var ctx;
  var canvasWidth;
  var canvasHeight;
  const dx = 500;
  const dy = 500;
  var cam;
  var cw = 1000;
  var ch = 1000;
  var oldmousex = 0;
  var oldmousey = 0;
  var objects = [];
  var limitRendering = 400;

  // var map = [
  //   [150, 0, 720, 50, 150, 0, "pink"],
  //   [-150, 0, 680, 200, 150, 0, "red"],
  //   [-150, 0, 520, 50, 150, 0, "gold"],
  //   [-150, 0, 320, 50, 40, 0, "blue"],
  //   [50, 20, 220, 50, 40, 0, "green"],
  //   [150, 0, 720, 50, 150, 0, "pink"],
  //   [-600, 0, 135, 200, 150, 30, "red"],
  //   [-150, 0, 520, 50, 150, 80, "gold"],
  //   [-150, 0, 320, 50, 40, 10, "blue"],
  //   [50, 20, 220, 50, 40, 15, "green"]
  // ];

  // var map = [
  //   [150, 0, 720, 50, 150, 0, "red"],
  //   [-150, 0, 680, 200, 150, 0, "red"],
  //   [-150, 0, 520, 50, 150, 0, "red"],
  //   [-150, 0, 320, 50, 40, 0, "red"],
  //   [50, 20, 220, 50, 40, 0, "red"],
  //   [150, 0, 720, 50, 150, 0, "red"],
  //   [-600, 0, 135, 200, 150, 30, "red"],
  //   [-150, 0, 520, 50, 150, 80, "red"],
  //   [-150, 0, 320, 50, 40, 10, "red"],
  //   [50, 20, 220, 50, 40, 15, "red"]
  // ];

  var map = [
    [-600, 0, 465, 200, 150, 30, "red"],
    [150, 0, 890, 200, 150, 0, "red"],
    [-60, 0, 890, 200, 150, 0, "red"],
    [-60, 0, 790, 200, 150, 0, "purple"],
    [-280, 0, 890, 200, 150, 0, "red"],
    [-490, 0, 890, 200, 150, 0, "red"],
    [-670, 0, 890, 200, 150, 0, "red"]
  ];

  // var map = [
  //   [-600, 0, 465, 200, 150, 30, "red"],
  //   [150, 0, 890, 200, 150, 0, "red"]
  // ];

  var v = 10;

  this.init = function(canv) {
    setupCanvas(canv);

    cam = new camera();
    cam.init([0, -220, -250]);

    //objects = Object.assign([], makeRoad(0));
    // cubeOb = new CubeObject();
    //cubeOb.init([0, 0, -100]);
    //objects.push(cubeOb);
    makeObjects();
    gameLoop();
  };

  function makeObjects() {
    //makeRoad();
    makeWall();
    //makeBuilding();
  }

  function makeBuilding() {
    var building = new SplitBuilding();
    building.makeBuilding();
    objects.push(building);
  }

  function makeRoad() {
    var road = new Road();
    road.makeRoad(cw / 2);
    objects.push(road);
  }

  function gameLoop() {
    update();
    draw();

    requestAnimationFrame(gameLoop);
  }

  function draw() {
    ctx.clearRect(0, 0, 2 * canvasWidth, 2 * canvasHeight);
    drawGround();
    drawObjects();
  }

  function update() {
    updateObjectPosition();
  }

  function updateObjectPosition() {
    //sorting the cube
    var [x1, y1, z1] = cam.positon;
    //distance calculation
    var distarray = [];
    var counter = 0;
    for (ob of objects) {
      var [x2, y2, z2] = ob.top;
      var xdis = Math.pow(x2 - x1, 2);
      var ydis = Math.pow(y2 - y1, 2);
      var zdis = Math.pow(z2 - z1, 2);
      var dist = xdis + ydis + zdis;

      distarray.push([dist, counter]);
      counter++;
    }
    distarray.sort(sortFunction);
    distarray.reverse();
    var newObjectArr = [];

    //console.log(distarray);
    for (i of distarray) {
      newObjectArr.push(objects[i[1]]);
    }
    objects = Object.assign([], newObjectArr);
  }

  function sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
  }

  function setupCanvas(canv) {
    canvas = canv;
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width / 2;
    canvasHeight = canvas.height / 2;
  }

  //adding camera
  function rotate2D(pos, rad) {
    var [x, y] = pos;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    return [x * c - y * s, y * c + x * s];
  }

  function TransformAndRotate(q, w, e) {
    //finding the position of the point with respective to  the camera as the origin
    q -= cam.positon[0];
    w -= cam.positon[1];
    e -= cam.positon[2];

    [v, d] = rotate2D([q, e], cam.rotation[1]);
    q = v;
    e = d;

    // [v, d] = rotate2D([w, e], cam.rotation[0]);
    // w = v;
    // e = d;

    return [q, w, e];
  }

  function project(q, w, e) {
    f = 200 / (e / 3);
    q = q * f;
    w = w * f;
    return [q, w];
  }

  function drawCube(facesList, color, type) {
    for (j in facesList) {
      var face = facesList[j];
      ctx.beginPath();

      ctx.moveTo(face[0][0], face[0][1]);

      // Draw the other vertices
      for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
        ctx.lineTo(face[k][0], face[k][1]);
      }

      // Close the path and draw the face
      ctx.closePath();
      if (type === 0) {
        ctx.stroke();
      }
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function checkCubeOnScreen(face, screen_coords, vertexList) {
    for (vertex of face) {
      var [x, y] = screen_coords[vertex];
      if (
        vertexList[vertex][2] > -100 &&
        x > -limitRendering &&
        x < cw + limitRendering &&
        y > -limitRendering &&
        y < ch + limitRendering &&
        vertexList[vertex][2] < 2000
      ) {
        onscreen = true;
      } else {
        onscreen = false;
        break;
      }
    }

    return onscreen;
  }

  function drawObjects() {
    for (ob of objects) {
      cubes = ob.getCube();
      for (var cubeObject of cubes) {
        cube = cubeObject.verti;

        var vertexList = [];
        var screen_coords = [];

        for (var i of cube) {
          var [q, w, e] = i;
          [q, w, e] = TransformAndRotate(q, w, e);
          vertexList.push([q, w, e]);
          [q, w] = project(q, w, e);
          screen_coords.push([q + dx, w + dy]);
        }

        facesList = [];
        var onscreen;

        for (face of cubeObject.cubeFace) {
          onscreen = false;
          onscreen = checkCubeOnScreen(face, screen_coords, vertexList);
          if (onscreen) {
            var coords = [];
            for (var i of face) {
              coords.push(screen_coords[i]);
            }
            facesList.push(coords);
          }
        }

        drawCube(facesList, cubeObject.color, cubeObject.Type);
      }
    }
  }

  function makeWall() {
    for (vertex of map) {
      var wall = new Wall();
      wall.makeWall(vertex);
      // console.log(wall);
      // Object.assign(objects, wall.getCube());
      // // objects.concat(wall.getCube());
      // //   objects = objects + wall.getCube();
      // console.log(objects.length);
      objects.push(wall);
    }
  }

  function drawGround() {
    var ground = [[0, 500], [0, 1000], [1000, 1000], [1000, 500]];
    ctx.beginPath();
    ctx.moveTo(ground[0][0], ground[0][1]);

    for (var i = 1; i < ground.length; i++) {
      ctx.lineTo(ground[i][0], ground[i][1]);
    }

    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.stroke();
  }

  function move(event) {
    cam.update(event.code);
  }

  function mouse(event) {
    cam.rotate(event, oldmousex, oldmousey);
  }

  function mousedown(event) {
    cam.mousedown = true;
    oldmousex = event.clientX;
    oldmousey = event.clientY;
  }

  function mouseup() {
    cam.mousedown = false;
  }

  function reset() {
    cam.resetSpeed();
  }

  document.addEventListener("keydown", move);
  document.addEventListener("keyup", reset);
  document.addEventListener("mousedown", mousedown);
  document.addEventListener("mousemove", mouse);
  document.addEventListener("mouseup", mouseup);
}

var game = new Game();
game.init(document.getElementsByClassName("canvas")[0]);
