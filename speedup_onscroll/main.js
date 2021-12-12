

let texte = document.getElementById("loading");
var time = 0;
var interval = setInterval(timeCount, 10);

function timeCount() {
  time += 1 + Math.abs(delta);
  // console.log(time)
  texte.style.transform = "translateX(" + time + "px)";
  texte.style.transition = "all 0.5s ease-out";
  if (time > 1200) {
    time = 0;
  }
}


var delta;

var checkScrollSpeed = (function(settings){
  settings = settings || {};

  var lastPos, newPos, timer, 
      delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function(){
    newPos = window.scrollY;
    if ( lastPos != null ){ // && newPos < maxScroll 
      delta = newPos -  lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

// listen to "scroll" event
window.onscroll = function(){
console.log( checkScrollSpeed() );
};