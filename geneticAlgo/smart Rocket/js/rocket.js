class Rocket {
  constructor(length, posx, posy) {
    this.width = 55;
    this.height = 40;
    //this.counter = -1;
    this.rocket = new Image();
    this.rocket.src = "./images/rocket.png";
    // this.velecity = [
    //   Math.floor(Math.random() * 10 - 5),
    //   Math.floor(Math.random() * 4 + 1) * -1
    // ];
    this.velecity = [0, 0];
    this.acceleration = 0;
    this.dna = new DNA(length);
    this.position = [posx, posy];
  }

  update(counter) {
    this.velecity = this.newVelocity(counter);
    for (let i in this.velecity) {
      this.velecity[i] += this.acceleration;
      this.position[i] += this.velecity[i];
    }
  }

  newVelocity(counter) {
    // if (this.counter < 199) {
    //   this.counter++;
    // }

    return [
      this.velecity[0] + this.dna.genes[counter][0],
      this.velecity[1] + this.dna.genes[counter][1]
    ];
  }
}
