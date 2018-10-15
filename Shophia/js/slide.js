imageList = document.getElementsByClassName("slider-list")[0];
bodyPart = document.getElementsByClassName("body-part")[0];
img = document.getElementsByClassName("slider-image")[0];
slide = document.getElementsByClassName("slider")[0];
currentIndex = 0;
var intervelRef;

function slider() {
  slide.style.height = img.clientHeight + "px";
  width = bodyPart.clientWidth;
  currentIndex = (currentIndex + 1) % 3;
  imageList.style.left = currentIndex * -1 * width - 5 + "px";
}

function createDotElement() {
  var boxContainer = document.getElementsByClassName("slider-boxes")[0];
  var dotElement = document.createElement("div");
  dotElement.setAttribute("class", "slider-dotElement");
  dotArray = [];

  for (var i = 0; i < 4; i++) {
    var dotItem = document.createElement("span");
    dotItem.setAttribute("class", "dot-item");
    dotItem.innerHTML = "&nbsp;";

    dotItem.onclick = (function(index) {
      return function() {
        clearInterval(intervelRef);
        currentIndex = index;
        slider();
        setTimeout(startSlider, 3000);
      };
    })(i);

    dotArray.push(dotItem);
    dotElement.appendChild(dotItem);
  }

  boxContainer.appendChild(dotElement);
}

function startSlider() {
  intervelRef = setInterval(slider, 5000);
}

createDotElement();
slide.style.height = img.clientHeight + "px";

window.onresize = slider;
intervelRef = setInterval(slider, 5000);
