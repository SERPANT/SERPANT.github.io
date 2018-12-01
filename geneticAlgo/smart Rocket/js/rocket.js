class Rocket {
  constructor(length, posx, posy) {
    this.width = 55;
    this.height = 40;
    this.fitness = 0;
    this.acceleration = 0;
    this.velecity = [0, 0];
    this.dna = new DNA(length);
    this.position = [posx, posy];
    this.doneTraning = false;
    this.rocket = new Image();
    this.rocket.src = "./images/rocket.png";
  }

  update(counter) {
    this.velecity = this.newVelocity(counter);
    for (let i in this.velecity) {
      this.velecity[i] += this.acceleration;
      this.position[i] += this.velecity[i];
    }
  }

  newVelocity(counter) {
    return [
      this.velecity[0] + this.dna.genes[counter][0],
      this.velecity[1] + this.dna.genes[counter][1]
    ];
  }

  crossOver(p2, startX, startY, frames) {
    let dna1 = this.dna;
    let dna2 = p2.dna;
    let childDNA = dna1.crossOver(dna2);
    let child = new Rocket(frames, startX, startY);
    child.dna = childDNA;
    return child;
  }

  mutate(mutationRate) {
    this.dna.mutate(mutationRate);
  }
}
