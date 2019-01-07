/**
 * ShapeDna class
 */
class ShapeDna {
  /**
   *
   * @param {number} length : The length of the genes.
   * @param {number} size : The size of the character.
   */
  constructor(length, size) {
    this.fitness;
    this.gene = [];
    this.size = size;
    this.length = length;
    this.color = generateRandomColor();
  }

  /**
   * Initialize shape to random points.
   */
  initGene() {
    for (let i = 0; i < this.length; i++) {
      const x = Math.random() * this.size;
      const y = Math.random() * this.size;
      this.gene[i] = [x, y];
    }
  }

  /**
   * Initialize the shape to rectangle.
   */
  setRectangle() {
    this.gene = makeRectangle(this.size, this.size - 10);
  }

  /**
   * Initialize the shape to square.
   */
  setSquare() {
    this.gene = makeSquare(this.size - 10);
  }
}
