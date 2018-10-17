var camera = function() {
  //assuming y axis is top and bottom movement
  //assuming x axis is left and right movement
  //assuming any forward and backward movement is z axis movement

  this.mousedown = false;
  this.s = 20;
  var diveRef;
  var standupRef;
  this.directionMovement = [0, 0, 1];
  this.positiony;

  //here rotation[0]---this is the rotation of x axis
  //then rotation[1]---this is the rotation of y axis

  this.init = function(positon = [0, 0, 0], rotation = [0, 0]) {
    this.positon = positon;
    this.rotation = rotation;
    this.positiony = positon[1];
  };

  this.resetSpeed = function() {
    this.s = 20;
  };

  this.update = function(key) {
    if (this.s < 40) {
      this.s += 0.3;
    }

    if (key === "KeyE") {
      this.positon[1] -= this.s;
    }
    if (key === "KeyQ") {
      this.positon[1] += this.s;
    }

    //this is the movement required so as the insure the correct rotation
    //this is rotation 1 as we are taking the x axis for transformation
    x = this.s * Math.sin(this.rotation[1]);
    y = this.s * Math.cos(this.rotation[1]); //this y is for z axis

    //this works as we are still working with increasing the distance and not anything else
    if (key === "KeyW") {
      this.positon[0] += x;
      this.positon[2] += y;
      this.directionMovement = [0, 0, 1];
    }
    if (key === "KeyS") {
      this.positon[0] -= x;
      this.positon[2] -= y;
      this.directionMovement = [0, 0, -1];
    }
    if (key === "KeyA") {
      this.positon[0] -= y;
      this.positon[2] += x;
      this.directionMovement = [-1, 0, 0];
    }
    if (key === "KeyD") {
      this.positon[0] += y;
      this.positon[2] -= x;
      this.directionMovement = [1, 0, 0];
    }

    if (key === "KeyC") {
      this.rotation[0] += 1 / 500;
    }

    //dive functionality to be modified
    if (key === "Space") {
      diveRef = setInterval(dive.bind(this), 1);
    }

    // if(key==="KeyW") {  this.positon[2]+=s; }
    // if(key==="KeyS") {  this.positon[2]-=s; }
    // if(key==="KeyA") { this.positon[0]-=s; }
    // if(key==="KeyD") { this.positon[0]+=s;  }
    // console.log(this.directionMovement);
  };

  function dive() {
    // this.positon[1] += 20;
    // this.positon[2] *= this.s / 100;

    if (this.positon[1] < this.positiony + 100) {
      var DashVector = scale(this.directionMovement, this.s);
      DashVector[1] += 14;
      this.positon = add(this.positon, DashVector);
    } else {
      clearDive();
    }
    // console.log(this.positon[2]);
  }

  function add(vector1, vector2) {
    return [
      vector1[0] + vector2[0],
      vector1[1] + vector2[1],
      vector1[2] + vector2[2]
    ];
  }

  function scale(vector, scale) {
    return [vector[0] * scale, vector[1] * scale, vector[2] * scale];
  }

  function clearDive() {
    clearInterval(diveRef);
    //standupRef = setInterval(standup.bind(this));
  }

  function standup() {
    if (this.positon[1] > this.positionyy) {
      this.positon[1] -= 14;
    } else {
      clearStandup();
    }
  }

  function clearStandup() {
    clearInterval(standupRef);
  }

  this.rotate = function(event, oldmousex, oldmousey) {
    if (this.mousedown) {
      x = oldmousex - event.clientX;
      y = oldmousey - event.clientY;

      //controlling the sensativity so that rotation does not happen very fast
      x /= 1000;
      y /= 1000;

      this.rotation[0] += y; //rotation arround x axis

      // this.rotation[0] = (this.rotation[0] + y) % 2;
      this.rotation[1] += x; //rotation arround y axis
    }
  };
};
