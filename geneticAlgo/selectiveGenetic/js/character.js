/**
 * Character class that holds the eyeDna,shapeDna,mouthDna.
 */
class Character {
  /**
   *
   * @param {number} length : The length of the genes
   * @param {number} size : The size that a character is allowed to occupy
   * @param {number} mutationRate : the chance that a newly formed character is mutated
   */
  constructor(length, size, mutationRate) {
    this.fitness = 1;
    this.size = size;
    this.length = length;
    this.mutationRate = mutationRate;

    this.shapes = ["rectangle", "square"];

    this.eyeDNA = new EyeDna(length);
    this.mouthDNA = new MouthDna(length);
    this.shapeDNA = new ShapeDna(length, size);
  }
  randomise() {}

  initCharacter() {
    this.eyePositionY = Math.random() * (this.size - 20);
    this.eyePositionX = Math.random() * (this.size - 30);

    this.mouthPositionY = Math.random() * (this.size - 20);
    this.mouthPositionX = Math.random() * (this.size - 30);
  }

  /**
   * Initialize all dna randomly.
   */
  initGene() {
    this.shapeDNA.initGene();
  }

  /**
   * Inialize shapedna as rectangle.
   */
  setShapeToRectangle() {
    this.shapeDNA.setRectangle();
  }

  /**
   * Initialize shapeDna as square.
   */
  setShapeToSquare() {
    this.shapeDNA.setSquare();
  }

  /**
   * Initialize eyeDna to square.
   */
  setEyesToSquare() {
    this.eyeDNA.setSquare();
  }

  /**
   * Initialize mouthDna to square.
   */
  setMouthToSquare() {
    this.mouthDNA.setSquare();
  }

  /**
   * initialize mouthDna to rectangle.
   */
  setMouthToRectangle() {
    this.mouthDNA.setRectangle();
  }

  setMouthTriangle() {
    this.mouthDNA.setTraiangle();
  }

  /**
   * @returns {object} : A new character.
   */
  crossOver(partner) {
    const character = new Character(this.length, this.size, this.mutationRate);
    let random = Math.random();
    character.shapeDNA = random < 0.5 ? this.shapeDNA : partner.shapeDNA;
    random = Math.random();
    character.eyeDNA = random < 0.5 ? this.eyeDNA : partner.eyeDNA;
    random = Math.random();
    character.mouthDNA = random < 0.5 ? this.mouthDNA : partner.mouthDNA;
    random = Math.random();
    character.eyePositionX =
      random < 0.5 ? this.eyePositionX : partner.eyePositionX;

    random = Math.random();
    character.eyePositionY =
      random < 0.5 ? this.eyePositionY : partner.eyePositionY;

    random = Math.random();
    character.mouthPositionX =
      random < 0.5 ? this.mouthPositionX : partner.mouthPositionX;

    random = Math.random();
    character.mouthPositionY =
      random < 0.5 ? this.mouthPositionY : partner.mouthPositionY;

    return character;
  }

  /**
   * Mutates the character by mutation rate.
   */
  mutate() {
    let random = Math.random();

    if (random <= this.mutationRate) {
      const shape = new ShapeDna(this.length, this.size);
      shape.setSquare();
      this.shapeDNA = shape;
    } else {
      this.shapeDNA = this.shapeDNA;
    }

    random = Math.random();
    this.eyeDNA =
      random <= this.mutationRate ? this.eyeDNA.setEyesToSquare() : this.eyeDNA;
    random = Math.random();
    this.mouthDNA =
      random <= this.mutationRate
        ? this.mouthDNA.setMouthToRectangle()
        : this.mouthDNA;
    random = Math.random();
    if (random < -this.mutationRate) {
      this.initCharacter();
    }
  }
}
