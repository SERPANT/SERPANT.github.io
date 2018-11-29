class Population {
  constructor(maxPop, frames, startX, startY) {
    this.maxPop = maxPop;
    this.frames = frames;
    this.population = [];
    this.startX = startX;
    this.startY = startY;
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

  calFitness() {
    for (let element in this.population) {
      console.log("calculate fitness for each");
    }
  }

  newGeneration() {
    console.log("create new Generation");
  }

  evaluate() {
    console.log("evalute");
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
