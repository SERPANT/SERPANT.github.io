class LinearModel {
  constructor(canvas) {
    this.theta0 = 0; //bias
    this.theta1 = 0;
    this.canvas = canvas;
    this.imageWidth = 20;
    this.imageHeight = 20;
    this.isTraning = false;
    this.alpha = 0.0000001;
    this.canWidth = canvas.width;
    this.canHeight = canvas.height;

    this.redDot = new Image();
    this.redDot.src = "./images/red.png";

    this.greenDot = new Image();
    this.greenDot.src = "./images/green.png";

    this.clickedPoint = [];
    this.evaluatePoint = [];
    this.ctx = canvas.getContext("2d");

    this.canvas.onclick = e => {
      this.addPoint(e);
    };
    this.gameLoop();
  }

  addPoint(e) {
    let rect = this.canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    x = x - this.canWidth / 6;
    y = this.canHeight - 70 - y;

    this.clickedPoint.push([x, y]);
  }

  gameLoop() {
    if (this.isTraning) {
      this.update();
    }

    this.render();
    requestAnimationFrame(() => {
      this.gameLoop();
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.canWidth, this.canHeight);
    this.renderGrid();
    this.renderLine();
    this.renderDots();
  }

  renderGrid() {
    this.ctx.beginPath();

    this.ctx.moveTo(this.canWidth / 6, 0);
    this.ctx.lineTo(this.canWidth / 6, this.canHeight);

    this.ctx.moveTo(0, this.canHeight - 70);
    this.ctx.lineTo(this.canWidth, this.canHeight - 70);

    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  }

  renderDots() {
    this.ctx.font = "15px Arial";
    this.renderGivenPoint(this.clickedPoint, this.redDot, false);
    this.renderGivenPoint(this.evaluatePoint, this.greenDot, true);
  }

  renderGivenPoint(arrayOfPoints, image, isEvaluationData) {
    for (let coor of arrayOfPoints) {
      let [x, y] = coor;

      this.ctx.drawImage(
        image,
        x - this.imageWidth / 2 + this.canWidth / 6,
        this.canHeight - 70 - y - this.imageHeight / 2,
        this.imageWidth,
        this.imageHeight
      );

      this.ctx.fillText(
        `${x},${parseFloat(y).toFixed(2)}`,
        x - this.imageWidth / 2 + this.canWidth / 6 - 5,
        this.canHeight - 70 - y - this.imageHeight / 2 - 5
      );

      if (isEvaluationData) {
        let point = [x + this.canWidth / 6, this.canHeight - 70 - y];
        let xAxispoint = [this.canWidth / 6, this.canHeight - 70 - y];
        let yAxispoint = [x + this.canWidth / 6, this.canHeight - 70];

        this.ctx.drawImage(
          image,
          this.canWidth / 6 - this.imageWidth / 2,
          this.canHeight - 70 - y - this.imageHeight / 2,
          this.imageWidth,
          this.imageHeight
        );

        this.ctx.drawImage(
          image,
          x - this.imageWidth / 2 + this.canWidth / 6,
          this.canHeight - 70 - this.imageHeight / 2,
          this.imageWidth,
          this.imageHeight
        );

        this.makeLine(xAxispoint, point);
        this.makeLine(yAxispoint, point);
      }
    }
  }

  makeLine(start, end) {
    this.ctx.beginPath();
    this.ctx.moveTo(start[0], start[1]);
    this.ctx.lineTo(end[0], end[1]);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  renderLine() {
    let point1 = (-this.canWidth / 6) * this.theta0 + this.theta1 * -1000;
    let point2 = (-this.canWidth / 6) * this.theta0 + this.theta1 * 1000;

    this.ctx.beginPath();
    this.ctx.moveTo(this.canWidth / 6 - 1000, this.canHeight - 70 - point1);
    this.ctx.lineTo(this.canWidth / 6 + 1000, this.canHeight - 70 - point2);
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  calculateError(h, y) {
    return h - y;
  }

  calculateError2(h, y) {
    return Math.pow(h - y, 2);
  }

  calDerivative1() {
    let totalError = 0;
    for (let point of this.clickedPoint) {
      let [x, y] = point;
      let hypothesis = this.theta0 + this.theta1 * x;
      totalError += this.calculateError(hypothesis, y);
    }

    // return Math.pow(totalError, 2);
    return totalError;
  }

  calDerivative2() {
    let totalError = 0;
    for (let point of this.clickedPoint) {
      let [x, y] = point;
      let hypothesis = this.theta0 + this.theta1 * x;
      totalError += this.calculateError(hypothesis, y) * x;
    }

    return totalError;
  }

  calTotalErrorSquare() {
    let totalError = 0;
    for (let point of this.clickedPoint) {
      let [x, y] = point;
      let hypothesis = this.theta0 + this.theta1 * x;
      totalError += this.calculateError2(hypothesis, y);
    }

    return totalError;
  }

  trainModel() {
    let cost = this.calTotalErrorSquare() / (2 * this.clickedPoint.length);

    if (Math.abs(cost) < 1) {
      this.isTraning = false;
      return;
    }

    let cost1 = this.calDerivative1();
    let cost2 = this.calDerivative2();

    let newTheta0 = this.theta0 + this.alpha * cost1;
    let newTheta1 = this.theta1 - this.alpha * cost2;
    this.theta0 = newTheta0;
    this.theta1 = newTheta1;
  }

  update() {
    this.trainModel();
  }

  evaluteForY(xValue) {
    let yValue = this.theta0 + this.theta1 * xValue;
    this.evaluatePoint.push([xValue, yValue]);
  }
}

let canvas = document.getElementsByClassName("canvas")[0];
let model = new LinearModel(canvas);

function startTraning() {
  model.isTraning = true;
}

function findY() {
  let XValueTextBox = document.getElementsByClassName("x-value")[0];
  let xValue = XValueTextBox.value;
  if (xValue !== "") {
    model.evaluteForY(parseInt(xValue));
  }
}
