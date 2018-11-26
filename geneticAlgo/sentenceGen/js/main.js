class Main {
  constructor() {
    this.found = false;
    this.generation = 0;
    this.mutaionRate = 0.01;

    //disable button
    this.button = document.getElementsByClassName("start-button")[0];
    this.button.disabled = true;

    //get the phrase from textbox
    let inputBox = document.getElementsByClassName("input-box")[0];
    this.phrase = inputBox.value;

    //get maxpopulation
    this.maxPop = parseInt(
      document.getElementsByClassName("input-box-population")[0].value
    );

    //get the display panel for best gene
    this.displayPanel = {};
    this.displayPanel["currentBest"] = document.getElementsByClassName(
      "current-best-text"
    )[0];

    //display panel for generation
    this.displayPanel["currentGeneration"] = document.getElementsByClassName(
      "current-generation-text"
    )[0];

    //initialize done
    document.getElementsByClassName("done")[0].innerHTML = "";

    //create population for the phrase
    this.population = new Population(
      this.phrase,
      this.mutaionRate,
      this.maxPop
    );

    //loop till phrase is reproduced
    this.loopRef = setInterval(() => {
      if (this.found) {
        this.button.disabled = false;
        document.getElementsByClassName("done")[0].innerHTML = "done !";
        clearInterval(this.loopRef);
      } else {
        this.computationLoop();
      }
    }, 100);
  }

  /**
   * a loop that is continuous run until phrase is reproduced
   */
  computationLoop() {
    this.found = this.update();
    this.generation++;
    this.render(this.population.getBest());
  }

  update() {
    this.population.calFitness();
    this.population.naturalSelection();
    this.population.newGenerate();
    this.population.calFitness();

    return this.population.evalute();
  }

  /**
   *
   * @param {*} index the index of best gene in the population
   */
  render(index) {
    this.displayPanel["currentBest"].innerHTML = this.population.population[
      index
    ].genes.reduce((a, v) => {
      return a + v;
    });

    this.displayPanel["currentGeneration"].innerHTML = this.generation;
  }
}
