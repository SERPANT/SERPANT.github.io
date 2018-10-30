class Game {
  constructor() {
    this.ctx;
    this.cam;
    this.canvas;
    this.dx = 500;
    this.dy = 500;
    this.Footstep;
    this.score = 0;
    this.pointSound;
    this.won = false;
    this.that = this;
    this.canvasWidth;
    this.canvasHeight;
    this.objects = [];
    this.pattern = [];
    this.lifeTImer = 0;
    this.oldmousey = 0;
    this.running = true;
    this.oldmousex = 735;
    this.totalStarCount = 0;
    this.scoreLifeValue = 10;
    this.limitRendering = 400;
    this.skyBox = new Image();
    this.pinkBar = new Image();
    this.blueBar = new Image();
    this.healthDecreaseInterval;
    this.brownBar = new Image();
    this.healthBar = new Image();
    this.scoreTriangleImage = new Image();
    this.enemySpeed = [20, 40, 35, 25, 35];
    this.colorType2 = ["gold", "gold", "gold", "gold", "gold", "gold"];
    this.colorType3 = ["green", "green", "green", "green", "green", "green"];
    this.colorType4 = [
      "#663333",
      "#663333",
      "#663333",
      "#663333",
      "#663333",
      "#663333"
    ];

    this.gameMap = [
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 4, 0, 0, 0, 0, 0, 0, 5, 6],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [6, 0, 0, 5, 0, 4, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 5, 0, 4, 0, 0, 0, 0, 0, 6],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
      [0, 5, 5, 5, 5, 5, 5, 5, 5, 0]
    ];

    this.colorType = [
      "brown",
      "brown",
      "#ff6633",
      "#ff3333",
      "brown",
      "#cc6600"
    ];
  }

  /**
   *
   * @param {*} canv : the canvas object that is all the game is drawn on
   */
  init(canv) {
    this.setupCanvas(canv);
    this.loadImage();

    this.cam = new Camera();
    this.cam.init([100, -340, -250]);

    this.makeObjects();
    this.initAudio();

    this.healthDecreaseInterval = setInterval(
      this.decreaseHealth.bind(this),
      1000
    );

    this.gameLoop();
  }

  decreaseHealth() {
    this.cam.health = this.cam.health - 2;
  }

  loadImage() {
    let texture1 = new Image();
    texture1.src = "images/texture1.jpg";
    let texture2 = new Image();
    texture2.src = "images/texture2.jpg";
    let texture3 = new Image();
    texture3.src = "images/texture3.jpg";
    let texture4 = new Image();
    texture4.src = "images/texture4.jpg";
    let texture5 = new Image();
    texture5.src = "images/texture7.jpg";
    let texture6 = new Image();
    texture6.src = "images/texture6.jpg";
    this.scoreTriangleImage.src = "images/star2.png";
    this.skyBox.src = "images/background10.png";
    this.healthBar.src = "images/heart2.png";
    this.pinkBar.src = "images/pinkbar.png";
    this.blueBar.src = "images/bluebar.png";
    this.brownBar.src = "images/brownbar.png";

    // texture1.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture1, "repeat"));
    // };
    // texture2.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture2, "repeat"));
    // };
    // texture3.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture3, "repeat"));
    // };
    // texture4.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture4, "repeat"));
    // };
    // texture5.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture5, "repeat"));
    // };
    // texture6.onload = function() {
    //   this.pattern.push(this.ctx.createPattern(texture6, "repeat"));
    // };
  }

  initAudio() {
    this.Footstep = new Audio();
    this.Footstep.src = "audio/1step.mp3";

    this.pointSound = new Audio();
    this.pointSound.src = "audio/point.ogg";
  }

  makeObjects() {
    this.makeMaze();
    // makeSingleCube();
  }

  // function makeSingleCube() {
  //   pir = new pyramidObject();

  //   pir.init([-670, 0, 700], "red", 0, 5, 100);
  //   objects.push(pir);
  //   // console.log(objects);
  // }

  gameLoop() {
    //   if (this.running === true) {
    this.update();
    // }
    // } else {
    //   // this.ctx.clearRect(0, 0, 2 * this.canvasWidth, 2 * this.canvasHeight);
    //   if (this.won === true) {
    //     console.log("won");
    //   } else {
    //     console.log("failed");
    //   }
    // }
    this.draw();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  draw() {
    this.ctx.clearRect(0, 0, 2 * this.canvasWidth, 2 * this.canvasHeight);
    this.drawBackground();
    this.drawGround();
    this.drawObjects();
    if (this.running === true) {
      this.drawStaticStuff();
    }
  }

  drawBackground() {
    //  void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

    // this.ctx.drawImage(
    //   this.skyBox,
    //   this.cam.backgroundStart,
    //   0,
    //   1300,
    //   900,
    //   0,
    //   0,
    //   1000,
    //   750
    // );

    this.ctx.drawImage(
      this.skyBox,
      this.cam.backgroundStart,
      100,
      2500,
      1080,
      0,
      0,
      1000,
      820
    );
  }

  drawStaticStuff() {
    this.drawScore();
    this.drawHealth();
    // this.drawTarget();
  }

  drawHealth() {
    this.ctx.drawImage(this.brownBar, 728, 33, 86, 28);
    this.ctx.drawImage(this.pinkBar, 728, 33, this.cam.health, 28);
    this.ctx.drawImage(this.healthBar, 700, 20, 120, 55);
  }

  drawScore() {
    this.ctx.drawImage(this.brownBar, 880, 33, 86, 28);
    this.ctx.drawImage(this.blueBar, 880, 34, this.score * 7.818181, 26);
    this.ctx.drawImage(this.scoreTriangleImage, 850, 20, 120, 55);
  }

  update() {
    let collisionArray = this.checkCollision();
    if (!collisionArray[0]) {
      this.cam.updatePosition();
    } else {
      this.collisionHandler(collisionArray);
    }
    this.updateObjectPosition();
    this.sortCubes();
    this.updateEnemyPosition();
    this.checkHealth();
  }

  checkHealth() {
    if (this.cam.health <= 0) {
      this.clearGame();
    }
  }

  clearHealthDecrease() {
    clearInterval(this.healthDecreaseInterval);
  }

  /**
   *
   * @param {*} collisionArray : a array [collided=true,object collisioned with]
   */
  collisionHandler(collisionArray) {
    let objectType = collisionArray[1].objectType;
    if (objectType !== 1 && objectType !== 6) {
      if (objectType === 4) {
        let healthLeft = this.cam.health - 1;
        this.cam.health = healthLeft;
        if (healthLeft <= 0) {
          this.clearGame();
        }
      } else if (objectType === 5) {
        this.score++;
        if (this.score === this.totalStarCount) {
          this.won = true;
          this.clearGame();
        }
        if (this.cam.health <= this.cam.maxHealth - 10) {
          this.cam.health = this.cam.health + this.scoreLifeValue;
        } else {
          this.cam.health = this.cam.maxHealth;
        }
        this.pointSound.play();
        let index = this.objects.indexOf(collisionArray[1]);
        this.objects.splice(index, 1);
      }

      this.cam.updatePosition();
    }
  }

  updateEnemyPosition() {
    for (let ob of this.objects) {
      if (ob.objectType === 4 || ob.objectType === 5) {
        ob.moveUpdate();
      }
    }
  }

  clearGame() {
    this.objects = [];
    this.running = false;
    this.clearHealthDecrease();
    let detail = [[100, -200, 800], this.colorType2];
    this.makeGameOverCube(detail);
  }

  checkCollision() {
    let currentPostion = this.cam.positon;
    let futurePosition = this.cam.getFutureLocation();
    let nearObjects = this.getNearObjects(currentPostion);

    let collidedObject;
    let collided = false;

    for (let ob of nearObjects) {
      collided = this.checkIntersection(ob, futurePosition);
      if (collided) {
        collidedObject = ob;
        break;
      }
    }

    return [collided, collidedObject];
  }

  /**
   *
   * @param {*} object : the object to check collision with
   * @param {*} camFuturePosition : presentposition + delta
   */
  checkIntersection(object, camFuturePosition) {
    let extend = 100;
    let extendSide = 30;
    let extendHeight = 400;
    for (let cube of object.getCube()) {
      if (
        camFuturePosition[0] >= cube.verti[0][0] - extendSide &&
        camFuturePosition[0] <= cube.verti[1][0] + extendSide &&
        camFuturePosition[1] >= cube.verti[0][1] - extendHeight &&
        camFuturePosition[1] <= cube.verti[3][1] &&
        camFuturePosition[2] >= cube.verti[3][2] - extend &&
        camFuturePosition[2] <= cube.verti[7][2] + extend
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param {*} currentPostion : current position of camera
   */
  getNearObjects(currentPostion) {
    let minDist = 800;
    let nearObject = [];
    for (let ob of this.objects) {
      let objectPosition = ob.position;
      let diffX = objectPosition[0] - currentPostion[0];
      let diffZ = objectPosition[2] - currentPostion[2];

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

  updateObjectPosition() {
    // //sorting the objects
    let newObjectArray = sortByDistance(this.objects, this.cam.positon);
    this.objects = Object.assign([], newObjectArray);
  }

  sortCubes() {
    //sorting the cube
    for (let ob of this.objects) {
      if (ob.rotated === false) {
        ob.sortCubes(this.cam.positon);
      }
    }
  }

  /**
   *
   * @param {*} canv canvas object
   */
  setupCanvas(canv) {
    this.canvas = canv;
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
  }

  /**
   *
   * @param {*} pos position in 2d
   * @param {*} rad angle in radian
   */
  rotate2D(pos, rad) {
    var [x, y] = pos;
    var s = Math.sin(rad);
    var c = Math.cos(rad);
    return [x * c - y * s, y * c + x * s];
  }

  /**
   *
   * @param {*} q :x coordinate
   * @param {*} w :y coordinate
   * @param {*} e :z coordinate
   */
  TransformAndRotate(q, w, e) {
    //finding the position of the point with respective to  the camera as the origin
    q -= this.cam.positon[0];
    w -= this.cam.positon[1];
    e -= this.cam.positon[2];

    let [v, d] = this.rotate2D([q, e], this.cam.rotation[1]);
    q = v;
    e = d;

    // [v, d] = rotate2D([w, e], cam.rotation[0]);
    // w = v;
    // e = d;

    return [q, w, e];
  }

  project(q, w, e) {
    let f = 200 / (e / 3);
    q = q * f;
    w = w * f;
    return [q, w];
  }

  /**
   *
   * @param {*} facesList : list of faces to be drawn
   * @param {*} color : a array with color for each face of cube
   * @param {*} type :type of object
   * @param {*} direction : a array of vectore cross product
   */
  drawCube(facesList, color, type, direction, bottomHide) {
    if (bottomHide) {
      direction[3][2] = 100;
    }
    for (let j in facesList) {
      //calculate direction of camera
      //compare direction of camera and the direction of the cube faces
      let faceDirection = direction[j];

      if (faceDirection[2] < 0) {
        let face = facesList[j];
        this.ctx.beginPath();
        this.ctx.moveTo(face[0][0], face[0][1]);

        // Draw the vector2 vertices
        for (let k = 1, n_vertices = face.length; k < n_vertices; ++k) {
          this.ctx.lineTo(face[k][0], face[k][1]);
        }

        // Close the path and draw the face
        this.ctx.closePath();
        if (type === 0 || type === 5 || type === 6) {
          this.ctx.strokeWidth = 4;
          this.ctx.strokeStyle = "black";
          this.ctx.stroke();
        }
        this.ctx.fillStyle = color[j];
        this.ctx.fill();
      }
    }
  }

  /**
   *
   * @param {*} face : a list of faces of a cube
   * @param {*} screen_coords : projected 2D coordinate of the vertex
   * @param {*} vertexList : 3D coordinate of the vertex
   */
  checkCubeOnScreen(face, screen_coords, vertexList) {
    let onscreen;
    for (let vertex of face) {
      let [x, y] = screen_coords[vertex];
      if (
        vertexList[vertex][2] > -100 &&
        x > -this.limitRendering &&
        x < this.canvasWidth + this.limitRendering &&
        y > -this.limitRendering &&
        y < this.canvasHeight + this.limitRendering &&
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

  /**
   *
   * @param {*} face :face list of a cube
   * @param {*} vertexList : 3D coordinate of the vertex
   */
  calculateDirection(face, vertexList) {
    let vertex0 = vertexList[face[0]];
    let vertex2 = vertexList[face[2]];
    let vertex3 = vertexList[face[3]];

    let side1 = subtract(vertex0, vertex3);
    let side2 = subtract(vertex2, vertex3);
    var oriantationVector = cross(side1, side2);

    return oriantationVector;
  }

  drawObjects() {
    for (let ob of this.objects) {
      let cubes = ob.getCube();
      for (let cubeObject of cubes) {
        let cube = cubeObject.verti;
        let vertexList = [];
        let screen_coords = [];

        for (let vertex of cube) {
          let [q, w, e] = vertex;
          [q, w, e] = this.TransformAndRotate(q, w, e);
          vertexList.push([q, w, e]);
          [q, w] = this.project(q, w, e);
          screen_coords.push([q + this.dx, w + this.dy, e]);
        }

        let onscreen;
        let facesList = [];
        let direction = [];

        for (let face of cubeObject.cubeFace) {
          onscreen = false;
          onscreen = this.checkCubeOnScreen(face, screen_coords, vertexList);
          direction.push(this.calculateDirection(face, screen_coords));
          if (onscreen) {
            var coords = [];
            for (var i of face) {
              coords.push(screen_coords[i]);
            }
            facesList.push(coords);
          }
        }
        let bottomHide = true;
        if (ob.objectType === 6) {
          bottomHide = false;
        }
        this.drawCube(
          facesList,
          cubeObject.facePattern,
          cubeObject.Type,
          direction,
          bottomHide
        );
      }
    }
  }

  // function drawObjects() {
  //   for (var cubeObject of objects) {
  //     let cube = cubeObject.verti;
  //     // console.log(cube);
  //     var vertexList = [];
  //     var screen_coords = [];

  //     for (var i of cube) {
  //       var [q, w, e] = i;
  //       [q, w, e] = TransformAndRotate(q, w, e);
  //       vertexList.push([q, w, e]);
  //       [q, w] = project(q, w, e);
  //       screen_coords.push([q + dx, w + dy, e]);
  //     }

  //     let facesList = [];
  //     let direction = [];
  //     let onscreen;

  //     for (face of cubeObject.cubeFace) {
  //       onscreen = false;
  //       onscreen = checkCubeOnScreen(face, screen_coords, vertexList);
  //       direction.push(calculateDirection(face, screen_coords));
  //       if (onscreen) {
  //         var coords = [];
  //         for (var i of face) {
  //           coords.push(screen_coords[i]);
  //         }
  //         facesList.push(coords);
  //       }
  //     }

  //     console.log(direction);
  //     drawCube(facesList, colorType, cubeObject.Type, direction, false);
  //   }
  // }

  makeMaze() {
    for (let row in this.gameMap) {
      let mapRow = this.gameMap[row];
      for (let col in mapRow) {
        if (mapRow[col] === 1) {
          let detail = [
            col * 220 - 670,
            0,
            row * 300 + 700,
            200,
            400,
            0,
            // pattern
            this.colorType
          ];

          this.makeWall(detail);
        } else if (mapRow[col] === -1) {
          let detail = [
            row * 220 - 900,
            0,
            col * 220 - 500,
            380,
            200,
            30,
            this.pattern
          ];
          this.makeWall(detail);
        } else if (mapRow[col] === 4) {
          let detail = [
            [col * 220 - 670, 0, row * 300 + 700],
            shuffle(this.colorType)
          ];

          this.makeEnemy(detail);
        } else if (mapRow[col] === 5) {
          let detail = [
            [col * 220 - 670, -300, row * 300 + 700],
            this.colorType2
          ];
          this.makeStar(detail);
          this.totalStarCount++;
        } else if (mapRow[col] === 6) {
          let detail = [
            [col * 220 - 670, 0, row * 300 + 700],
            this.colorType4,
            this.colorType3
          ];
          this.makeTree(detail);
        }
      }
    }
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  makeStar(detail) {
    let star = new Star();
    star.init(detail);
    this.objects.push(star);
  }

  makeGameOverCube(detail) {
    let cube = new overCube();
    cube.init(detail);
    this.objects.push(cube);
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  makeWall(detail) {
    let wall = new Wall();
    wall.makeWall(detail);
    this.objects.push(wall);
  }

  makeTree(detail) {
    let tree = new Tree();
    tree.makeTree(detail);
    this.objects.push(tree);
  }

  /**
   *
   * @param {*} detail :array specifing [x, y, z, wallWeight, wallHeight, angle of rotation , color, pattern to be drawn]
   */
  makeEnemy(detail) {
    let enemy = new Enemy();
    enemy.init(detail, this.enemySpeed[getRandom(0, 5)]);
    this.objects.push(enemy);
  }

  drawGround() {
    let ground = [[0, 550], [0, 1000], [1000, 1000], [1000, 550]];
    this.ctx.beginPath();
    this.ctx.moveTo(ground[0][0], ground[0][1]);

    for (let i = 1; i < ground.length; i++) {
      this.ctx.lineTo(ground[i][0], ground[i][1]);
    }

    this.ctx.closePath();

    this.ctx.fillStyle = "#82D65F";
    this.ctx.fill();
  }

  /**
   *
   * @param {*} event :event object passed by js
   */
  move(event) {
    let rightKey = this.cam.keydownUpdate("Key" + event.key.toUpperCase());
    if (rightKey) {
      this.Footstep.play();
    }
  }

  /**
   *
   * @param {*} event :event object passed by js
   */
  mouse(event) {
    let tempOldX = this.oldmousex;
    let tempOldY = this.oldmousey;
    this.cam.rotate(event, tempOldX, tempOldY);
    this.oldmousex = event.clientX;
    this.oldmousey = event.clientY;
  }

  /**
   *
   * @param {*} event :event object passed by js
   */
  reset(event) {
    this.cam.resetDeltaPosition(event.code);
    this.cam.resetSpeed();
  }
}

var game = new Game();

document.addEventListener("keypress", game.move.bind(game.that));
document.addEventListener("keyup", game.reset.bind(game.that));
document.addEventListener("mousemove", game.mouse.bind(game.that));

game.init(document.getElementsByClassName("canvas")[0]);
