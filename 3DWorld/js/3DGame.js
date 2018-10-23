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

  var gameMap = [
    [1, 1, 1, 1, 1, 0, 1],
    [-1, 0, 0, 0, 0, 0, -1],
    [1, 0, 1, 1, 1, 1, 1],
    [-1, 0, 0, 0, 0, 0, -1],
    [1, 1, 1, 1, 1, 0, 1],
    [-1, 0, 0, 0, 0, 0, -1],
    [1, 0, 1, 1, 1, 1, 1]
  ];

  //var gameMap = [[1]];

  var a = new CubeObject();
  a.init([100, -250, 0]);

  var colorType = ["gray", "gold", "blue", "purple", "brown", "pink"];
  var v = 10;

  this.init = function(canv) {
    setupCanvas(canv);

    cam = new camera();
    cam.init([100, -220, -250]);
    makeObjects();
    gameLoop();
  };

  function makeObjects() {
    //makeRoad();
    // makeWall();
    makeMaze();
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
    //drawTest();
  }

  function update() {
    if (!checkCollision()) {
      cam.updatePosition();
    }
    updateObjectPosition();
    sortCubes();
  }

  function checkCollision() {
    let currentPostion = cam.positon;
    let nearObjects = getNearObjects(currentPostion);
    let futurePosition = cam.getFutureLocation();

    let collided = false;
    for (ob of nearObjects) {
      collided = checkIntersection(ob, futurePosition);
      if (collided === true) {
        break;
      }
    }
    return collided;
  }

  function checkIntersection(object, camFuturePosition) {
    console.log(object.sidePoints);
    return false;
  }

  function getNearObjects(currentPostion) {
    let minDist = 800;
    let nearObject = [];
    for (ob of objects) {
      let objectPosition = ob.top;

      diffX = objectPosition[0] - currentPostion[0];
      // diffY = objectPosition[1] - currentPostion[1];
      diffZ = objectPosition[2] - currentPostion[2];
      if (
        diffX < minDist &&
        diffX > -minDist &&
        (diffZ < minDist && diffZ > -minDist)
      ) {
        nearObject.push(ob);
      }
    }
    return nearObject;
  }

  function updateObjectPosition() {
    //sorting the objects
    let [x1, y1, z1] = cam.positon;
    //distance calculation
    let distarray = [];
    let counter = 0;
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

  function sortCubes() {
    //sorting the cube
    for (ob of objects) {
      if (ob.rotated === false) {
        ob.sortCubes(cam.positon);
      }
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

  function drawCube(facesList, color, type, direction) {
    direction[3][2] = 100;
    for (j in facesList) {
      //calculate direction of camera
      //compare direction of camera and the direction of the cube faces
      let faceDirection = direction[j];
      //  console.log(j, faceDirection);

      if (faceDirection[2] < 0) {
        var face = facesList[j];
        ctx.beginPath();

        ctx.moveTo(face[0][0], face[0][1]);

        // Draw the vector2 vertices
        for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
          ctx.lineTo(face[k][0], face[k][1]);
        }

        // Close the path and draw the face
        ctx.closePath();
        if (type === 0) {
          ctx.stroke();
        }
        ctx.fillStyle = colorType[j];
        ctx.fill();
      }
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
        vertexList[vertex][2] < 5000
      ) {
        onscreen = true;
      } else {
        onscreen = false;
        break;
      }
    }

    return onscreen;
  }

  function calculateDirection(face, vertexList) {
    let vertex0 = vertexList[face[0]];
    let vertex1 = vertexList[face[1]];
    let vertex2 = vertexList[face[2]];
    let vertex3 = vertexList[face[3]];
    // console.log(vertex1, vertex2, vertex3, vertex4);

    let side1 = subtract(vertex2, vertex3);
    let side2 = subtract(vertex0, vertex3);
    var oriantationVector = cross(side1, side2);
    return oriantationVector;
  }

  function drawObjects() {
    for (ob of objects) {
      cubes = ob.getCube();
      for (var cubeObject of cubes) {
        let cube = cubeObject.verti;

        var vertexList = [];
        var screen_coords = [];

        for (var i of cube) {
          var [q, w, e] = i;
          [q, w, e] = TransformAndRotate(q, w, e);
          vertexList.push([q, w, e]);
          [q, w] = project(q, w, e);
          screen_coords.push([q + dx, w + dy]);
        }

        let facesList = [];
        let direction = [];
        let onscreen;

        for (face of cubeObject.cubeFace) {
          onscreen = false;
          onscreen = checkCubeOnScreen(face, screen_coords, vertexList);
          direction.push(calculateDirection(face, screen_coords));
          if (onscreen) {
            var coords = [];
            for (var i of face) {
              coords.push(screen_coords[i]);
            }
            facesList.push(coords);
          }
        }

        //drawCube(facesList, cubeObject.color, cubeObject.Type);
        drawCube(facesList, a.color, a.Type, direction);
      }
    }
  }

  function makeMaze() {
    for (let row in gameMap) {
      let mapRow = gameMap[row];
      for (let col in mapRow) {
        if (mapRow[col] === 1) {
          let detail = [
            col * 220 - 670,
            0,
            row * 300 + 700,
            200,
            400,
            0,
            "gray"
          ];
          makeWall(detail);
        } else if (mapRow[col] === -1) {
          let detail = [
            row * 220 - 900,
            0,
            col * 220 - 500,
            380,
            200,
            30,
            "gray"
          ];
          makeWall(detail);
        }
      }
    }
  }

  function makeWall(detail) {
    var wall = new Wall();
    wall.makeWall(detail);
    objects.push(wall);
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
    cam.keydownUpdate(event.code);
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

  function reset(event) {
    cam.resetDeltaPosition(event.code);
    cam.resetSpeed();
  }

  document.addEventListener("keydown", move);
  document.addEventListener("keyup", reset);
  document.addEventListener("mousedown", mousedown);
  document.addEventListener("mousemove", mouse);
  document.addEventListener("mouseup", mouseup);
}

// var game = new Game();
// game.init(document.getElementsByClassName("canvas")[0]);
