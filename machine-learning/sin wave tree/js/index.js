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
    this.maxAmplitude = 0;
    this.offsetY = 120;
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
    //  this.time = (this.time + 1) % 500;
    this.time++;
  }

  /**
   * Render or draws on the canvas.
   */
  render() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawWave(this.sinGetX.bind(this), "#ff0000");
    this.drawWave(this.sinGetX.bind(this), "#440000", -0.3);
    this.drawWave(this.sinGetX.bind(this), "green", 10);
    this.drawWave(this.sinGetX.bind(this), "#004400", 9.7);
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
      this.context.moveTo(x + this.offsetX, i - this.offsetY);
      this.context.lineTo(x + 3 + this.offsetX, i + 1 - this.offsetY);
      this.context.strokeStyle = color;
      this.context.stroke();
    }
  }

  /**
   *
   * @param {number} x
   */
  sinGetX(y, phase = 0) {
    return (
      (this.maxAmplitude - y / 4) *
      Math.sin(
        ((2 * Math.PI) / this.waveLength) * y -
          ((2 * Math.PI) / this.period) * this.time +
          phase
      )
    );
  }
}

let sinTree = new SinTree(document.getElementsByClassName("canvas")[0]);
sinTree.run();
