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
    this.offsetY = 190;
    this.maxAmplitude = 0;
    this.offsetX = this.canvasWidth / 4 - 8;

    this.smokeWidth = 9;

    this.person = new Image();
    this.person.src = "./images/person.png";
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
    this.time = (this.time + 1) % 1884;
  }

  /**
   * Render or draws on the canvas.
   */
  render() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.drawPerson();
    this.drawWave(this.sinGetX.bind(this), "rgba(211, 211, 211");
    this.drawWave(this.sinGetX.bind(this), "rgba(211, 211, 211", 10);
    this.drawWave(this.sinGetX.bind(this), "rgba(211, 211, 211", 5.5);
    this.drawWave(this.sinGetX.bind(this), "rgba(211, 211, 211", 6.5);
    this.drawWave(this.sinGetX.bind(this), "rgba(200, 200, 200", 7.7);
  }

  drawPerson() {
    this.context.drawImage(this.person, 0, 310, 400, 418);
  }

  /**
   * Given a equation and phase Shift the graph is plotted in the specified color.
   *
   * @param {function} equationFunction : Equation function of the wave to get the value of y.
   * @param {string} color : Color to draw the wave in.
   * @param {number} phase : Phase shift of the given equation.
   */
  drawWave(equationFunction, color, phase = 0) {
    for (let i = this.canvasHeight; i >= 0; i -= 1) {
      const alphaValue = 0.75 - i / this.canvasHeight;
      if (alphaValue <= 0) continue;

      const x = equationFunction(i, phase, this.maxAmplitude);
      this.context.beginPath();
      this.context.moveTo(
        x + this.offsetX,
        this.canvasHeight - (i + this.offsetY)
      );
      this.context.lineTo(
        x + this.smokeWidth + this.offsetX,
        this.canvasHeight - (i + this.smokeWidth + this.offsetY)
      );
      this.context.strokeStyle = color + `,${alphaValue})`;
      this.context.stroke();
    }
  }

  /**
   * Given a value x the corresponding y value is returned by using sin wave function.
   *
   * @param {number} x
   */
  sinGetX(y, phase = 0, maxAmplitude) {
    //smoke
    return (
      (maxAmplitude - y / 4) *
      Math.sin(
        ((2 * Math.PI) / this.waveLength) * y -
          ((2 * Math.PI) / this.period) * this.time +
          phase
      )
    );

    // //twister
    // return (
    //   (maxAmplitude - y / 4) *
    //   Math.sin(
    //     ((2 * Math.PI) / this.waveLength + (100 - y)) * y -
    //       ((2 * Math.PI) / this.period) * this.time +
    //       phase
    //   )
    // );
  }
}

let sinTree = new SinTree(document.getElementsByClassName("canvas")[0]);
sinTree.run();
