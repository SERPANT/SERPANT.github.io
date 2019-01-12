/**
 * The main class that holds selective genetics.
 */
class SelectiveGenetics {
  /**
   *
   * @param {Object} canvas : Html canvas.
   */
  constructor(canvas) {
    this.size = 150;
    this.length = 4;
    this.generation = 1;
    this.characters = [];
    this.noOfCharacters = 9;
    this.mutationRate = 0.2;
    this.createNewGeneration = false;
    this.spaceBetweenCharacters = 17;

    this.canvas = canvas;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    this.context = canvas.getContext("2d");

    this.initCharacters();

    this.loop();
  }

  /**
   * A infinite loop for update and re-render.
   */
  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Update the various properties of the character.
   */
  update() {
    if (this.createNewGeneration) {
      this.generation++;
      const probabilityFitnessArray = this.calculateFitnessProbability();
      this.makeNewGeneration(probabilityFitnessArray);
      this.setCreateNewGeneration(false);
    }
  }

  makeNewGeneration(probabilityFitnessArray) {
    for (let i in this.characters) {
      const parent1 = this.selectParent(probabilityFitnessArray);
      const parent2 = this.selectParent(probabilityFitnessArray);

      const child = parent1.crossOver(parent2);
      child.mutate();
      this.characters[i] = child;
    }
  }

  /**
   * Calculate TotalFitness.
   *
   * @returns {number} totalFitness : The total fitness.
   */
  calculateTotalFitness() {
    let totalFitness = 0;

    for (let character of this.characters) {
      totalFitness += character.fitness;
    }

    return totalFitness;
  }

  /**
   *
   * @param {array} probabilityFitnessArray : An array with fitness probability that sum up to 1.
   *
   * @returns {object} : chosen character parent.
   */
  selectParent(probabilityFitnessArray) {
    let randNumber = Math.random();
    let index = -1;
    while (randNumber > 0) {
      index++;
      randNumber -= probabilityFitnessArray[index];
    }

    return this.characters[index];
  }

  /**
   * @returns : An array it fitness probability.
   */
  calculateFitnessProbability() {
    const totalFitness = this.calculateTotalFitness();
    const probabilityFitnessArray = [];

    for (let character of this.characters) {
      probabilityFitnessArray.push(character.fitness / totalFitness);
    }

    return probabilityFitnessArray;
  }

  /**
   * Simply draws the character on the screen and also clears the screen.
   */
  render() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let i = 0; i < this.noOfCharacters; i++) {
      const startPoint = i * this.size + i * this.spaceBetweenCharacters;
      this.drawCharacter(startPoint, this.characters[i]);
      this.drawFitness(startPoint, this.characters[i]);
    }
  }

  /**
   *
   * @param {number} startPoint : Start Point from where the character is drawn.
   * @param {object} character : The character whose fitness is to be drawn
   */
  drawFitness(startPoint, character) {
    this.context.font = "30px Arial";
    this.context.fillStyle = "white";
    this.context.fillText(
      character.fitness - 1,
      this.size / 3 + startPoint,
      this.size + 50
    );
  }

  /**
   *
   * @param {number} startPoint : The startPoint from where the character is drawn.
   * @param {object} character : The character object.
   */
  drawCharacter(startPoint, character) {
    this.drawShape(startPoint, character.shapeDNA);

    this.drawMouth(
      startPoint,
      character.mouthDNA,
      character.mouthPositionX,
      character.mouthPositionY
    );

    this.drawEyes(
      startPoint,
      character.eyeDNA,
      character.eyePositionX,
      character.eyePositionY
    );
  }

  /**
   *
   * @param {number} startPoint : Start point to draw.
   * @param {object} mouthDna : Mouth DNA object.
   * @param {number} shiftedByX : X value to be shifted by.
   * @param {number} shiftedByY : Y value to be shifted by.
   */
  drawMouth(startPoint, mouthDna, shiftedByX, shiftedByY) {
    const genes = mouthDna.gene;
    startPoint += shiftedByX;

    this.jointPoints(startPoint, genes, mouthDna.color, 0, shiftedByY);
  }

  /**
   *
   * @param {number} startPoint : Start point to draw.
   * @param {object} eyeDna : Mouth DNA object.
   * @param {number} shiftedByX : X value to be shifted by.
   * @param {number} shiftedByY : Y value to be shifted by.
   */
  drawEyes(startPoint, eyeDna, shiftedByX, shiftedByY) {
    startPoint += shiftedByX;
    const genes = eyeDna.gene;

    this.jointPoints(startPoint, genes, eyeDna.color, 0, shiftedByY);
    this.jointPoints(
      startPoint,
      genes,
      eyeDna.color,
      eyeDna.eyeGap,
      shiftedByY
    );
  }

  /**
   *
   * @param {number} startPoint : Start point to draw.
   * @param {object} shapeDna : Shape Dna object.
   */

  drawShape(startPoint, shapeDna) {
    const genes = shapeDna.gene;
    this.jointPoints(startPoint, genes, shapeDna.color);
  }

  /**
   *
   * @param {number} startPoint
   * @param {array} array
   * @param {string} fillStyle
   * @param {number} shiftedByX
   * @param {number} shiftedByY
   * @param {boolean} addStartPointToY
   */
  jointPoints(
    startPoint,
    array,
    fillStyle,
    shiftedByX = 0,
    shiftedByY = 0,
    addStartPointToY = false
  ) {
    if (!array.length) {
      return;
    }

    let [startX, startY] = array[0];
    startX = startX + shiftedByX + startPoint;

    if (addStartPointToY) {
      startY += startPoint + shiftedByY;
    }

    this.context.beginPath();
    this.context.moveTo(startX, startY);

    for (let element of array) {
      const [x, y] = element;
      this.context.lineTo(x + startPoint + shiftedByX, y + shiftedByY);
    }
    this.context.lineTo(startX, startY);
    this.context.fillStyle = fillStyle;
    this.context.fill();
  }

  /**
   * Sets Flag to create new generation.
   */
  setCreateNewGeneration(newState) {
    this.createNewGeneration = newState;
  }

  /**
   * Updates the fitness value of the character whose index has been entered
   *
   * @param {object} e : Event Object created by keyboard press down.
   */
  increaseScore(e) {
    try {
      const characterIndex = parseInt(e.key) - 1;
      this.characters[characterIndex].fitness++;
    } catch (err) {
      e.key === "Enter"
        ? this.setCreateNewGeneration(true)
        : alert("only number allowed!");
    }
  }

  /**
   * Initalizes the characters.
   */
  initCharacters() {
    for (let i = 0; i < this.noOfCharacters; i++) {
      const character = new Character(this.length, this.size);
      character.initCharacter();
      character.setEyesToSquare();
      character.setShapeToRectangle();
      character.setMouthToRectangle();
      this.characters.push(character);
    }
  }
}

let canvas = document.getElementsByClassName("canvas")[0];
let selective = new SelectiveGenetics(canvas);

document.addEventListener("keydown", selective.increaseScore.bind(selective));

function newGeneration() {
  selective.setCreateNewGeneration(true);
}
