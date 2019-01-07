/**
 * MouthDna object.
 */
class MouthDna {
  /**
   *
   * @param {number} length : The length of the genes.
   */
  constructor(length) {
    this.fitness;
    this.gene = [];
    this.length = length;
    this.size = Math.random() * 15 + 35;
    this.color = generateRandomColor();
  }

  /**
   * Initialize the mouthdna to square shape.
   */
  setSquare() {
    this.gene = makeSquare(this.size - 20);
  }

  /**
   *
   */
  setTraiangle() {
    this.gene = makeTriangle(this.size, this.size);
  }

  /**
   * Initialize the mouthdna to rectangle shape.
   */
  setRectangle() {
    this.gene = makeRectangle(
      Math.random() * this.size,
      Math.random() * (this.size / 2) + 10
    );
  }
}
