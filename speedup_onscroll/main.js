

let texte = document.getElementById("loading");
var time = 0;
var interval = setInterval(timeCount, 50);

function timeCount() {
  time += 1;
  // console.log(time)
  texte.style.transform = "translateX(" + time + "px)";
  if (time > 1500) {
    time = 0;
  }
}


// WITH HOVER
// texte.addEventListener("mouseover", function( event ) {
//   clearInterval(interval);
//   interval = setInterval(timeCount, 1);
// })

// texte.addEventListener("mouseout", function( event ) {
//   clearInterval(interval);
//   interval = setInterval(timeCount, 10);
// })


// WITH SCROLL// Setup isScrolling variable
var isScrolling;
var animOrNot = false;

window.addEventListener('scroll', function () {

  // Clear our timeout throughout the scroll
  window.clearTimeout(isScrolling);
  animOrNot = true;

  // Set a timeout to run after scrolling ends
  isScrolling = setTimeout(function () {

    animOrNot = false;

    if (animOrNot) {
      clearInterval(interval);
    } else {
      clearInterval(interval);
      interval = setInterval(timeCount, 50);
    }

  }, 200);

  animationScrolling();

}, false)

function animationScrolling(value) {

  clearInterval(interval);
  interval = setInterval(timeCount, 10);
  // var scroll = window.scrollY;
  // if (scroll >= 0) {
  // } else {
  // }
}

// Accelerator
var x = 0,
  int = 200,
  valueStop = 200;

function increase() {
  setTimeout(function () {
    // console.log(x++);
    console.log(int);
    if (int <= (0.2 * valueStop)) {
      int += 10;
      decrease(int);
      return false;
      if (int == 1000) {
      }
    } else {
      int -= 10;
    }
    increase();
  }, int);
}

increase();

function decrease() {
  setTimeout(function () {
    // console.log(x++);
    console.log(int);
    if (int <= (valueStop)) {
      int += 10;
      decrease(int);
      return false;
    } else {
      return false;
    }
    decrease();
  }, int);
}