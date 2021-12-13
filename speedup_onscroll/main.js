

let texte = document.getElementById("loading");
let rotator = document.getElementById("rotator");
var time = 0;
var interval = setInterval(timeCount, 10);
var initialSpeed = 1;


// ANIMATION PART
function timeCount() {
  time += initialSpeed + delta;
  if (time > window.innerWidth) {
    time = - window.innerWidth;
  }
  texte.style.transform = "translateX(" + - time + "px)";
  texte.style.transition = "all 0.4s ease-out";
  rotator.style.transform = "rotate(" + time / 5 + "deg)";
  rotator.style.transition = "all 0.4s ease-out";
}



// LISTEN SCROLL PART
var delta;

var checkScrollSpeed = (function (settings) {
  settings = settings || {};

  var lastPos, newPos, timer,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function () {
    newPos = window.scrollY;
    if (lastPos != null) { // && newPos < maxScroll 
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

// listen to "scroll" event
window.onscroll = function () {
  checkScrollSpeed();
};