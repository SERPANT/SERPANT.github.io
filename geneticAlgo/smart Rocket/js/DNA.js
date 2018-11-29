class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0.0;
    this.length = length;
    this.initGene();
  }

  initGene() {
    for (let i = 0; i < this.length; i += 5) {
      let vector = this.random2DVector();
      this.genes[i] = vector;
      this.genes[i + 1] = vector;
      this.genes[i + 2] = vector;
      this.genes[i + 3] = vector;
      this.genes[i + 4] = vector;
    }
  }

  random2DVector() {
    return [Math.random() * 2 - 1, Math.random() * -0.2];
  }
}
