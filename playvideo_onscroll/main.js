var frameNumber = 0, // start video at frame 0
  // lower numbers = faster playback
  playbackConst = 200,
  // get page height from video duration
  setHeight = document.getElementById("set-height"),
  // select video element         
  vid = document.getElementById('v0');
// var vid = $('#v0')[0]; // jquery option

// dynamically set the page height according to video length
vid.addEventListener('loadedmetadata', function () {
  setHeight.style.height = Math.floor(vid.duration) * playbackConst * 10 + "px";
});

var newTime = 0;
var intervalSet;
var timeoutSet;

// Use requestAnimationFrame for smooth playback
function scrollPlay() {
  // var frameNumber = window.pageYOffset / playbackConst;

  intervalSet = setInterval(() => {
    console.log(newTime)
    if (delta < 0) {
      newTime -= 0.1;
    } else {
      newTime += 0.1;
    }
    vid.currentTime = newTime / 10;
    console.log(newTime)
  }, 1);

  timeoutSet = setTimeout(() => {
    console.log("YAAAAAAAAAAAAAAA")
    clearInterval(intervalSet);
  }, 10);

  // window.requestAnimationFrame(scrollPlay);
}

// window.requestAnimationFrame(scrollPlay);

// window.addEventListener('scroll', scrollPlay);


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
  clearInterval(intervalSet);
  // clearTimeout(timeoutSet);
  checkScrollSpeed();
  // setTimeout(() => {
    scrollPlay();
    return false
  // }, 20);

};