class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0.0;
    this.length = length;
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
    return [Math.random() * 2 - 1, Math.random() * -0.1];
  }

  crossOver(partner) {
    let mid = Math.floor(Math.random() * this.genes.length);
    let child = new DNA(this.genes.length);

    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        child.genes[i] = this.genes[i];
      } else {
        child.genes[i] = partner.genes[i];
      }
    }

    return child;
  }

  mutate(mutationRate) {
    for (let i in this.genes) {
      if (Math.random() <= mutationRate) {
        this.genes[i] = this.random2DVector();
      }
    }
  }
}
