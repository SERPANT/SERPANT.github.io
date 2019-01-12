/**
 *  Class of Sin Tree.
 */
class SinTree {
  /**
   * Constructor method.
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = canvas.getContext("2d");

    this.time = 0;
    this.period = 80;
    this.zPosition = 0;
    this.waveLength = 150;
    this.maxAmplitude = 100;
    this.offsetX = this.canvasWidth / 2;
  }

  run() {
    this.gameLoop();
  }
  /**
   * GameLoop that performs 2 operation :
   * 1. Update
   * 2. Render
   */
  gameLoop() {
    this.update();
    this.render();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * Update any position or value that is required to change.
   */
  update() {
    this.time = (this.time + 1) % 500;
  }

  /**
   * Render or draws on the canvas.
   */
  render() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawWave(this.sinGetX.bind(this), "red");
    this.drawWave(this.sinGetX.bind(this), "green", 700);
  }

  /**
   *
   * @param {function} equationFunction : Equation function of the wave to get the value of y.
   * @param {string} color : Color to draw the wave in.
   */
  drawWave(equationFunction, color, phase = 0) {
    for (let i = this.canvasHeight; i >= 0; i -= 2) {
      let x = equationFunction(i, phase);

      this.context.beginPath();
      this.context.moveTo(x + this.offsetX, i);
      this.context.lineTo(x + 2 + this.offsetX, i + 1);
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }

  /**
   *
   * @param {number} x
   */
  sinGetX(x, phase = 0) {
    return (
      this.maxAmplitude *
      Math.sin(
        ((2 * Math.PI) / this.waveLength) * x -
          ((2 * Math.PI) / this.period) * this.time +
          phase
      )
    );
  }
}

let sinTree = new SinTree(document.getElementsByClassName("canvas")[0]);
sinTree.run();
