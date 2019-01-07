/**
 *  EyeDna class.
 */
class EyeDna {
  /**
   *
   * @param {number} length :  The length of the genes.
   */
  constructor(length) {
    this.fitness;
    this.gene = [];
    this.length = length;
    this.size = Math.random() * 10 + 20;
    this.eyeGap = Math.random() * 20 + 15;
    this.color = generateRandomColor();
  }

  /**
   *  Initializes eye dna to random points.
   */
  initGene() {
    for (let i = 0; i < this.length; i++) {
      const x = Math.random() * 10;
      const y = Math.random() * 10;
      this.gene[i] = [x, y];
    }
  }

  /**
   *  Initializes eye dna as a square
   */
  setSquare() {
    this.gene = makeSquare(this.size - 10);
  }
}
