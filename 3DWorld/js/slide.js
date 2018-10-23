var angle = 0;

var gameRunning = false;
function galleryspin(sign) {
  spinner = document.querySelector("#spinner");
  if (!sign) {
    angle = angle + 90;
  } else {
    angle = angle - 90;
  }
  spinner.setAttribute(
    "style",
    "-webkit-transform: rotateY(" +
      angle +
      "deg); -moz-transform: rotateY(" +
      angle +
      "deg); transform: rotateY(" +
      angle +
      "deg);"
  );
}

document.addEventListener("keydown", startGame);

function startGame(event) {
  if (gameRunning === false) {
    if (event.code === "Enter") {
      gameRunning = true;
      deleteAllElement();
      createCanvas();
    }
  }
}

function deleteAllElement() {
  let sliderContainer = document.getElementsByClassName("container")[0];
  document.body.removeChild(sliderContainer);
  document.body.style.background = "white";
}

function createCanvas() {
  container = document.createElement("div");
  container.classList.add("center");
  canvas = document.createElement("canvas");
  canvas.setAttribute("width", "1000");
  canvas.setAttribute("height", "1000");
  canvas.classList.add("canvas");

  container.appendChild(canvas);
  center = document.getElementById("center");
  center.appendChild(container);
  var game = new Game();
  game.init(document.getElementsByClassName("canvas")[0]);
}
