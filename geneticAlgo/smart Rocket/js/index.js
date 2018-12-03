class Game {
  constructor(canvas) {
    this.maxPop = 20;
    this.frames = 150;
    this.endRectX = 0;
    this.endRectY = 0;
    this.counter = -1;
    this.down = false;
    this.obstacles = [];
    this.startRectX = 0;
    this.startRectY = 0;
    this.generation = 0;
    this.canvas = canvas;
    this.setTarget = false;
    this.mutationRate = 0.1;
    this.target = new Image();
    this.targetDimension = [50, 50];
    this.ctx = canvas.getContext("2d");
    this.target.src = "./images/ball.png";
    this.targetPosition = [100, 50];
    this.population = new Population(
      this.maxPop,
      this.frames,
      this.canvas.width / 2,
      this.canvas.height - 60,
      this.mutationRate
    );
  }

  startLoop() {
    this.gameLoop();
  }

  resetGame() {
    this.setTarget = false;
    this.population.reset();
  }

  gameLoop() {
    this.update();
    this.render();
    if (this.setTarget) {
      requestAnimationFrame(this.gameLoop.bind(this));
    }
  }

  update() {
    this.checkTargetCollision();
    this.checkObstacleCollision();
    let [a, b] = this.targetPosition;
    this.population.calFitness([
      a + this.targetDimension[0] / 2,
      b + this.targetDimension[1] / 2
    ]);
    if (this.counter < this.frames - 1) {
      this.counter++;
    } else {
      this.generation++;
      this.geneticUpdate();
      this.counter = 0;
    }
    this.population.update(this.counter);
  }

  checkObstacleCollision() {
    for (let element of this.population.getPopulation()) {
      for (let object of this.obstacles) {
        let rect1 = {
          x: element.position[0],
          y: element.position[1],
          width: element.width,
          height: element.height
        };

        var rect2 = {
          x: object.x1,
          y: object.y1,
          width: object.x2,
          height: object.y2
        };

        if (
          rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.height + rect1.y > rect2.y
        ) {
          element.collided = true;
        }
      }
    }
  }

  checkTargetCollision() {
    for (let element of this.population.getPopulation()) {
      let rect1 = {
        x: element.position[0],
        y: element.position[1],
        width: element.width,
        height: element.height
      };
      var rect2 = {
        x: this.targetPosition[0],
        y: this.targetPosition[1],
        width: this.targetDimension[0] / 2,
        height: this.targetDimension[1] / 2
      };

      if (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y
      ) {
        element.collided = true;
        element.doneTraning = true;
      }
    }
  }

  geneticUpdate() {
    let [a, b] = this.targetPosition;

    this.population.calFitness([
      a + this.targetDimension[0] / 2,
      b + this.targetDimension[1] / 2
    ]);
    this.population.newGeneration();

    this.population.calFitness([
      a + this.targetDimension[0] / 2,
      b + this.targetDimension[1] / 2
    ]);

    this.population.evaluate();
    this.population.resetMaxFitness();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderRockets();
    this.renderLife();
    this.ctx.drawImage(
      this.target,
      this.targetPosition[0],
      this.targetPosition[1],
      this.targetDimension[0],
      this.targetDimension[1]
    );

    this.ctx.fillStyle = "brown";
    this.ctx.fill();
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  }

  renderRockets() {
    for (let element of this.population.getPopulation()) {
      this.ctx.save();

      let yVector = element.velecity[1] * -1;
      let xVector = element.velecity[0];

      let rotate = (Math.atan2(xVector, yVector) * 180) / Math.PI;
      if (rotate < 0) {
        rotate = 360 + rotate;
      }

      this.ctx.translate(element.position[0] + 25, element.position[1] + 20);
      this.ctx.rotate((rotate * Math.PI) / 180);
      this.ctx.drawImage(element.rocket, 0, 0, element.width, element.height);
      this.ctx.restore();
    }
    //this.ctx.resetTransform();
  }

  renderLife() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "gold";
    this.ctx.fillText("Generation: " + this.generation, 10, 50);
  }

  mouseDown(event) {
    if (this.setTarget) {
      if (!this.down) {
        let rect = this.canvas.getBoundingClientRect();
        this.startRectX = event.clientX - rect.left;
        this.startRectY = event.clientY - rect.top;
      }
      this.down = true;
    } else if (!this.setTarget) {
      let rect = this.canvas.getBoundingClientRect();
      this.targetPosition = [
        event.clientX - rect.left,
        event.clientY - rect.top
      ];
      this.setTarget = true;
      this.startLoop();
    }
  }

  mouseMove(event) {
    if (this.down) {
      let rect = this.canvas.getBoundingClientRect();
      this.endRectX = event.clientX - rect.left;
      this.endRectY = event.clientY - rect.top;
    }
  }

  mouseUp() {
    if (this.setTarget) {
      this.down = false;

      this.ctx.rect(
        this.startRectX,
        this.startRectY,
        this.endRectX - this.startRectX,
        this.endRectY - this.startRectY
      );

      let x1 = this.startRectX;
      let y1 = this.startRectY;
      let x2 = this.endRectX - this.startRectX;
      let y2 = this.endRectY - this.startRectY;
      this.obstacles.push({ x1, y1, x2, y2 });
    }
  }
}

let canvas = document.getElementsByClassName("canvas")[0];
let game = new Game(canvas);

document.addEventListener("mousedown", event => {
  game.mouseDown(event);
});
document.addEventListener("mousemove", event => {
  game.mouseMove(event);
});

document.addEventListener("mouseup", () => {
  game.mouseUp();
});

document.addEventListener("keydown", () => {
  game.resetGame();
});
