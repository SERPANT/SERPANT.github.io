class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0.0;
    this.length = length;
    this.initGene();
  }

  initGene() {
    for (let i = 0; i < this.length; i += 5) {
      this.genes[i] = this.random2DVector();
      this.genes[i + 1] = this.genes[i];
      this.genes[i + 2] = this.genes[i];
      this.genes[i + 3] = this.genes[i];
      this.genes[i + 4] = this.genes[i];
    }
  }

  random2DVector() {
    return [Math.random() * 2 - 1, Math.random() * -0.2];
  }
}
