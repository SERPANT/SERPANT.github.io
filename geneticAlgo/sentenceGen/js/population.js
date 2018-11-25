class Population {
  constructor(phrase, mutationRate, maxPop) {
    this.population = [];
    this.phrase = phrase;
    this.mutationRate = mutationRate;
    this.initPopulation(maxPop);
  }

  /**
   *
   * @param {*} maxPop :maximum genes in a population
   */
  initPopulation(maxPop) {
    for (let i = 0; i < maxPop; i++) {
      this.population[i] = new DNA(this.phrase.length);
      this.population[i].initGene();
    }
  }

  /**
   * calculates fitness for each memeber in the population
   */
  calFitness() {
    for (let element of this.population) {
      element.calFitness(this.phrase);
    }
  }

  /**
   * return the index of best member in a population
   */
  getBest() {
    let maxScore = -1;
    let index;
    for (let i in this.population) {
      if (this.population[i].fitness > maxScore) {
        index = i;
        maxScore = this.population[i].fitness;
      }
    }

    return index;
  }

  /**
   * initilizes the matting pool for selection based on higher fitness
   */
  naturalSelection() {
    this.mattingPool = [];
    for (let element of this.population) {
      let fitness = element.fitness * 100;
      let n = Math.floor(fitness);
      for (let i = 0; i < n; i++) {
        this.mattingPool.push(element);
      }
    }
  }

  /**
   * initializes the population with new genes from current population
   */
  newGenerate() {
    for (let i in this.population) {
      let p1 = this.mattingPool[
        Math.floor(Math.random() * this.mattingPool.length)
      ];
      let p2 = this.mattingPool[
        Math.floor(Math.random() * this.mattingPool.length)
      ];

      let child = p1.crossOver(p2);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
  }

  /**
   * checks if the condition for completion has been met
   */
  evalute() {
    for (let i of this.population) {
      if (i.fitness === 1) {
        return true;
      }
    }
    return false;
  }
}
