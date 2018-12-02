class Population {
  constructor(maxPop, frames, startX, startY, mutationRate) {
    this.maxPop = maxPop;
    this.frames = frames;
    this.population = [];
    this.startX = startX;
    this.startY = startY;
    this.mutationRate = mutationRate;
    this.initPopulation();
  }

  initPopulation() {
    for (let i = 0; i < this.maxPop; i++) {
      let rocket = new Rocket(this.frames, this.startX, this.startY);
      rocket.setGene();
      this.population.push(rocket);
    }
  }

  getPopulation() {
    return this.population;
  }

  calFitness(targetPosition) {
    for (let element of this.population) {
      let disX = Math.pow(element.position[0] - targetPosition[0], 2);
      let disY = Math.pow(element.position[1] - targetPosition[1], 2);
      let dist = Math.pow(disX + disY, 1 / 2);
      let fitness = 1 / Math.pow(dist, 2);

      if (fitness > element.maxFitness) {
        element.fitness = fitness;
        element.maxFitness = fitness;
      }
      //  }
    }
  }

  newGeneration() {
    let fitnessSum = this.getFitnessSum();
    let probArray = this.percentageConversion(fitnessSum);

    for (let i in this.population) {
      if (!this.population[i].doneTraning) {
        let p1 = this.population[this.selectParent(probArray)];
        let p2 = this.population[this.selectParent(probArray)];
        let child = p1.crossOver(p2, this.startX, this.startY, this.frames);
        child.mutate(this.mutationRate);
        this.population[i] = child;
      } else {
        let child = new Rocket(this.frames, this.startX, this.startY);
        child.dna = this.population[i].dna;
        //   child.mutate(0.01);
        this.population[i] = child;
      }
    }
  }

  selectParent(probArray) {
    let rand = Math.random();
    let counter = -1;
    while (rand > 0) {
      counter++;
      rand -= probArray[counter];
    }

    return counter;
  }

  percentageConversion(total) {
    let probArray = this.population.map(element => {
      return element.fitness / total;
    });

    return probArray;
  }

  getFitnessSum() {
    let fitnessSum = 0;
    for (let element of this.population) {
      fitnessSum += element.fitness;
    }

    return fitnessSum;
  }

  evaluate() {}

  update(counter) {
    for (let element of this.population) {
      element.update(counter);
    }
  }

  reset() {
    this.population = [];
    this.initPopulation();
  }

  resetMaxFitness() {
    for (let element of this.population) {
      element.maxFitness = 0;
    }
  }
}
