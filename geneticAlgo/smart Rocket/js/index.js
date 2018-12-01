class Game {
  constructor(canvas) {
    this.setTarget = false;
    this.startRectX = 0;
    this.startRectY = 0;
    this.endRectX = 0;
    this.endRectY = 0;
    this.down = false;
    this.maxPop = 20;
    this.frames = 130;
    this.counter = -1;
    this.generation = 0;
    this.canvas = canvas;
    this.mutationRate = 0.01;
    this.target = new Image();
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
    if (this.counter < this.frames - 1) {
      this.counter++;
    } else {
      this.generation++;
      this.geneticUpdate();
      this.counter = 0;
    }
    this.population.update(this.counter);
  }

  geneticUpdate() {
    let [a, b] = this.targetPosition;
    this.population.calFitness([a + 25, b + 25]);
    this.population.newGeneration();
    let [x, y] = this.targetPosition;
    this.population.calFitness([x + 25, y + 25]);
    this.population.evaluate();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderRockets();
    this.renderLife();
    this.ctx.drawImage(
      this.target,
      this.targetPosition[0],
      this.targetPosition[1],
      50,
      50
    );

    this.ctx.fillStyle = "black";
    this.ctx.fill();
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
  }

  renderLife() {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("Generation: " + this.generation, 10, 50);
  }

  mouseDown(event) {
    if (this.setTarget) {
      if (!this.down) {
        this.startRectX = event.clientX;
        this.startRectY = event.clientY;
      }
      this.down = true;
    } else if (!this.setTarget) {
      this.targetPosition = [event.clientX, event.clientY];
      this.setTarget = true;
      this.startLoop();
    }
  }
  mouseMove(event) {
    if (this.down) {
      this.endRectX = event.clientX;
      this.endRectY = event.clientY;
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
