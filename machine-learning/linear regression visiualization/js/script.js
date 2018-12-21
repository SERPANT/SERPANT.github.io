class LinearModel {
  constructor(canvas) {
    this.canvas = canvas;
    this.isTraning = false;
    this.imageWidth = 16;
    this.imageHeight = 16;
    this.alpha = 0.0000001;
    this.canWidth = canvas.width;
    this.canHeight = canvas.height;

    this.theta0 = 0; //bias
    this.theta1 = 0;

    this.redDot = new Image();
    this.redDot.src = "./images/red.png";

    this.clickedPoint = [];
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
    this.renderDots();
    this.renderLine();
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
    for (let coor of this.clickedPoint) {
      let [x, y] = coor;

      this.ctx.drawImage(
        this.redDot,
        x - this.imageWidth / 2 + this.canWidth / 6,
        this.canHeight - 70 - y - this.imageHeight / 2,
        this.imageWidth,
        this.imageHeight
      );
    }
  }

  renderLine() {
    let point1 = -this.canWidth * this.theta0 + this.theta1 * -1000;
    let point2 = -this.canWidth * this.theta0 + this.theta1 * 1000;

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
}

let canvas = document.getElementsByClassName("canvas")[0];
let model = new LinearModel(canvas);

function startTraning() {
  model.isTraning = true;
}

//_----------------------------------------------------------quardartic

// class QuardarticModel {
//   constructor(canvas) {
//     this.canvas = canvas;
//     this.isTraning = false;
//     this.theta0 = 0; //bias
//     this.theta1 = 0;
//     this.imageWidth = 16;
//     this.imageHeight = 16;
//     this.alpha = 0.0000001;
//     this.canWidth = canvas.width;
//     this.canHeight = canvas.height;

//     this.redDot = new Image();
//     this.redDot.src = "./images/red.png";

//     this.ctx = canvas.getContext("2d");
//     this.clickedPoint = [];

//     this.canvas.onclick = e => {
//       this.addPoint(e);
//     };
//     this.gameLoop();
//   }

//   addPoint(e) {
//     let rect = this.canvas.getBoundingClientRect();
//     let x = e.clientX - rect.left;
//     let y = e.clientY - rect.top;
//     x = x - this.canWidth / 6;
//     y = this.canHeight - 70 - y;

//     this.clickedPoint.push([x, y]);
//   }
//   gameLoop() {
//     if (this.isTraning) {
//       this.update();
//     }

//     this.render();
//     requestAnimationFrame(() => {
//       this.gameLoop();
//     });
//   }

//   render() {
//     this.ctx.clearRect(0, 0, this.canWidth, this.canHeight);
//     this.renderGrid();
//     this.renderDots();
//     this.renderLine();
//   }

//   renderGrid() {
//     this.ctx.beginPath();

//     this.ctx.moveTo(this.canWidth / 6, 0);
//     this.ctx.lineTo(this.canWidth / 6, this.canHeight);

//     this.ctx.moveTo(0, this.canHeight - 70);
//     this.ctx.lineTo(this.canWidth, this.canHeight - 70);

//     this.ctx.strokeStyle = "black";
//     this.ctx.stroke();
//   }

//   renderDots() {
//     for (let coor of this.clickedPoint) {
//       let [x, y] = coor;

//       this.ctx.drawImage(
//         this.redDot,
//         x - this.imageWidth / 2 + this.canWidth / 6,
//         this.canHeight - 70 - y - this.imageHeight / 2,
//         this.imageWidth,
//         this.imageHeight
//       );
//     }
//   }

//   renderLine() {
//     let point1 =
//       -this.canWidth * this.theta0 +
//       this.theta1 * -1000 +
//       this.theta2 * Math.pow(-1000, 2);
//     let point2 =
//       -this.canWidth * this.theta0 +
//       this.theta1 * 1000 +
//       this.theta2 * Math.pow(1000, 2);

//     this.ctx.beginPath();
//     this.ctx.moveTo(this.canWidth / 6 - 1000, this.canHeight - 70 - point1);
//     this.ctx.lineTo(this.canWidth / 6 + 1000, this.canHeight - 70 - point2);
//     this.ctx.strokeStyle = "red";
//     this.ctx.stroke();
//   }

//   calculateError(h, y) {
//     return h - y;
//   }

//   calculateError2(h, y) {
//     return Math.pow(h - y, 2);
//   }

//   calDerivative1() {
//     let totalError = 0;
//     for (let point of this.clickedPoint) {
//       let [x, y] = point;
//       let hypothesis =
//         this.theta0 + this.theta1 * x + this.theta2 * Math.pow(x, 2);
//       totalError += this.calculateError(hypothesis, y);
//     }

//     // return Math.pow(totalError, 2);
//     return totalError;
//   }

//   calDerivative2() {
//     let totalError = 0;
//     for (let point of this.clickedPoint) {
//       let [x, y] = point;
//       let hypothesis =
//         this.theta0 + this.theta1 * x + this.theta2 * Math.pow(x, 2);
//       totalError += this.calculateError(hypothesis, y) * x;
//     }

//     return totalError;
//   }

//   calTotalErrorSquare() {
//     let totalError = 0;
//     for (let point of this.clickedPoint) {
//       let [x, y] = point;
//       let hypothesis =
//         this.theta0 + this.theta1 * x + this.theta2 * Math.pow(x, 2);
//       totalError += this.calculateError2(hypothesis, y);
//     }

//     return totalError;
//   }

//   trainModel() {
//     let cost = this.calTotalErrorSquare() / (2 * this.clickedPoint.length);
//     console.log("cost", cost);

//     if (Math.abs(cost) < 1) {
//       this.isTraning = false;
//       return;
//     }

//     let cost1 = this.calDerivative1();
//     let cost2 = this.calDerivative2();

//     let newTheta0 = this.theta0 + this.alpha * cost1;
//     let newTheta1 = this.theta1 - this.alpha * cost2;

//     this.theta0 = newTheta0;
//     this.theta1 = newTheta1;
//   }

//   update() {
//     this.trainModel();
//   }
// }

// let canvas = document.getElementsByClassName("canvas")[0];
// let model = new LinearModel(canvas);

// function startTraning() {
//   model.isTraning = true;
// }
