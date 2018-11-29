class Game {
  constructor(canvas) {
    this.maxPop = 20;
    this.frames = 100;
    this.counter = -1;
    this.canvas = canvas;
    this.target = new Image();
    this.ctx = canvas.getContext("2d");
    this.target.src = "./images/ball.png";
    this.population = new Population(
      this.maxPop,
      this.frames,
      this.canvas.width / 2,
      this.canvas.height - 60
    );

    this.gameLoop();
  }

  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update() {
    if (this.counter < 99) {
      this.counter++;
    } else {
      this.population.reset();
      this.counter = 0;
    }
    this.population.update(this.counter);
  }

  geneticUpdate() {
    this.population.calFitness();
    this.population.newGeneration();
    this.population.calFitness();
    this.population.evaluate();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.renderRockets();
    this.renderLife();
    this.ctx.drawImage(this.target, this.canvas.width / 2 - 50, 20, 50, 50);
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
    this.ctx.fillText(this.counter, 10, 50);
  }
}

let canvas = document.getElementsByClassName("canvas")[0];
let game = new Game(canvas);
