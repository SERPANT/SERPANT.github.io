class DNA {
  constructor(length) {
    this.genes = [];
    this.fitness = 0.0;
    this.length = length;
  }

  /**
   * initializes the gene
   */
  initGene() {
    for (let i = 0; i < this.length; i++) {
      this.genes.push(this.getRandomChar());
    }
  }

  /**
   * generates a random character and returns it
   */
  getRandomChar() {
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ";
    let letter = possible.charAt(Math.random() * possible.length);
    return letter;
  }

  /**
   *
   * @param {*} phrase :the phrase to compare with
   */
  calFitness(phrase) {
    let score = 0;
    for (let gene in this.genes) {
      if (this.genes[gene] === phrase.charAt(gene)) {
        score++;
      }
    }

    this.fitness = Math.pow(score / phrase.length, 2);
  }

  /**
   *
   * @param {*} partner : the partner with which this object breads with to return a child
   */
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

  /**
   *
   * @param {*} mutationRate : the rate of mutation
   */
  mutate(mutationRate) {
    for (let i in this.genes) {
      if (Math.random() < mutationRate) {
        this.genes[i] = this.getRandomChar();
      }
    }
  }
}
