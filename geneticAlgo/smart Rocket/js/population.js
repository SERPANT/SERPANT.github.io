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
      this.population.push(new Rocket(this.frames, this.startX, this.startY));
    }
  }

  getPopulation() {
    return this.population;
  }

  calFitness(targetPosition) {
    let maxFitness = 0;
    for (let element of this.population) {
      if (!element.doneTraning) {
        let disX = Math.pow(element.position[0] - targetPosition[0], 2);
        let disY = Math.pow(element.position[1] - targetPosition[1], 2);
        let dist = Math.pow(disX + disY, 1 / 2);
        let fitness = 1 / dist;
        // console.log(fitness);
        if (fitness > maxFitness) {
          maxFitness = fitness;
        }
        element.fitness = fitness;
      }
    }

    for (let element of this.population) {
      element.fitness /= maxFitness;
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

  evaluate() {
    // console.log(Object.assign({}, this.population));
    for (let element of this.population) {
      if (element.fitness === 1) {
        //  element.doneTraning = true;
        //console.log("one");
      }
    }
  }

  update(counter) {
    for (let element of this.population) {
      element.update(counter);
    }
  }

  reset() {
    this.population = [];
    this.initPopulation();
  }
}
