//  VOIR DIGITAL GATE POUR LE SCROLL EVENT

let rotator = document.getElementById("rotator");
let intervalTimer = 5; // precision de l'interval et donc de la transform / ne pas changer sinon ça ne marche plus
let sentenceWidth = [];
let separatorWidth = [];
let indiceItem = 0;
let delta = 0;
let sentencesTimeArray = [];
let speed = [];
let sentence = [];
let itemToTranslate = [];
let sentenceInfinity = [];
let lengthArray = [];
let visibleOnScreen = [];
let tagNameInfinity;
const sentencesContainer = document.querySelectorAll('.infinity');
let parentElementInifinity = [];
let rotationParentElementInifinity = [];
let indiceInfinityItems = 0;
let reverse = -1;

// BROWSER
var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

// INIT POUR LE BON CALCUL DES WIDTH
window.onload = function initInfinity() {
  sentencesContainer.forEach(function (item) {
    // GET PARENT ROTATION
    // parentElementInifinity[indiceInfinityItems] = item.parentElement;
    // rotationParentElementInifinity[indiceInfinityItems] = getCurrentRotation(parentElementInifinity[indiceInfinityItems]);

    speed[indiceInfinityItems] = isFirefox ? +item.dataset.speed * 2.5 : +item.dataset.speed;
    inputInfinity = item.children[0];
    tagNameInfinity = inputInfinity.tagName;
    sentenceText = inputInfinity.textContent;
    item.innerHTML = ""; //delete current sentence
    sentence[indiceInfinityItems] = document.createElement(`${tagNameInfinity}`);
    sentence[indiceInfinityItems].textContent = sentenceText;
    sentence[indiceInfinityItems].className = "sentenceInfinity" + indiceInfinityItems + " sentenceInfinity itemToTranslate" + indiceInfinityItems;

    createDOMElements(sentence[indiceInfinityItems], indiceInfinityItems);

    indiceInfinityItems++;
  });
}

function createDOMElements(a, indiceInfinityItems) {
  sentencesContainer[indiceInfinityItems].appendChild(a);

  sentenceWidth[indiceInfinityItems] = a.getBoundingClientRect().width;
  console.log(sentenceWidth[indiceInfinityItems])
  // +2 pour dépasser de 1 à gauche et de 1 à droite
  // SI ROTATION
  // lengthArray[indiceInfinityItems] = (Math.ceil((rotationParentElementInifinity[indiceInfinityItems] + 1)*(window.innerWidth / sentenceWidth[indiceInfinityItems]))) + 2;
  lengthArray[indiceInfinityItems] = (Math.ceil(window.innerWidth / sentenceWidth[indiceInfinityItems])) + 2;

  // initialise une array de 0 de la bonne taille : stocke tous les temps pour la transform
  sentencesTimeArray[indiceInfinityItems] = new Array(lengthArray[indiceInfinityItems]).fill(0);

  // creation d'entite tant que l'ecran n'est pas rempli
  for (let i = 0; i < lengthArray[indiceInfinityItems] - 1; i++) {
    sentencesContainer[indiceInfinityItems].appendChild(a.cloneNode(true));
  }

  itemToTranslate[indiceInfinityItems] = document.querySelectorAll(`.itemToTranslate${indiceInfinityItems}`);
  sentenceInfinity[indiceInfinityItems] = document.querySelectorAll(`.sentenceInfinity${indiceInfinityItems}`);
}

// LANCEMENT DE LA BOUCLE ANIMATION
setInterval(timeCount, intervalTimer);



// requestAnimationFrame(timeCount);


// var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;




// ANIMATION PART
function timeCount() {
  // pour les phrases
  for (let j = 0; j < indiceInfinityItems; j++) {
    for (let i = 0; i < lengthArray[j]; i++) {

      sentencesTimeArray[j][i] +=  reverse * speed[j] + Math.sign(speed[j]) * delta;
      // replacement au debut si disparait a gauche
      if (sentencesTimeArray[j][i] > (sentenceWidth[j] * (i + 2))) {
        sentencesTimeArray[j][i] -= lengthArray[j] * sentenceWidth[j];

        // text plus à l'écran à gauche : invisible
        sentenceInfinity[j][i].style.opacity = 0;
        sentenceInfinity[j][i].style.transition = "none";
      }

      // le plus 3 parce que il est invisible à gauche à plus 2
      if (sentencesTimeArray[j][i] < (sentenceWidth[j] * (i + 3 - lengthArray[j]))) {
        // text à l'écran à droite : visible
        sentenceInfinity[j][i].style.opacity = 1;
        // sentenceInfinity[j][i].style.transition = "transform 0.2s ease-out";
      }

      // si delta negatif
      if (sentencesTimeArray[j][i] < (sentenceWidth[j] * (i + 2 - lengthArray[j]))) {
        sentencesTimeArray[j][i] += lengthArray[j] * sentenceWidth[j];
      }


      // TRANSFORM
      sentenceInfinity[j][i].style.transform = "translate3d(" + - sentencesTimeArray[j][i] + "px,0,0) rotate(0.1deg)";
      sentenceInfinity[j][i].style.webkitTransform = "translate3d(" + - sentencesTimeArray[j][i] + "px,0,0) rotate(0.1deg)";
      sentenceInfinity[j][i].style.MozTransform = "translate3d(" + - sentencesTimeArray[j][i] + "px,0,0) rotate(0.1deg)";
      sentenceInfinity[j][i].style.msTransform = "translate3d(" + - sentencesTimeArray[j][i] + "px,0,0) rotate(0.1deg)";
      sentenceInfinity[j][i].style.OTransform = "translate3d(" + - sentencesTimeArray[j][i] + "px,0,0) rotate(0.1deg)";

      // partie pour gerer la transition
      // visibleOnScreen[j][i] = sentenceInfinity[j][i];
      // if (sentenceInfinity[j][i].getBoundingClientRect().left > window.innerWidth || sentenceInfinity[j][i].getBoundingClientRect().right < 0) {
      //   visibleOnScreen[j][i] = false;
      //   sentenceInfinity[j][i].style.opacity = 0;
      // } if (sentenceInfinity[j][i].getBoundingClientRect().left < window.innerWidth || sentenceInfinity[j][i].getBoundingClientRect().right > 0) {
      //   sentenceInfinity[j][i].style.opacity = 1;
      // }
      // console.log(sentenceInfinity[j][i].getBoundingClientRect().left);

      // BOUCLEUR
      // requestAnimationFrame(timeCount);
    }
  }
}

// LISTEN SCROLL PART

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

    // vitesse initiale negative
    if (speed < 0) {
      delta = -delta;
    }
    return delta;
  };
})();

// listen to "scroll" event
window.onscroll = function () {
  let delta = checkScrollSpeed();
  if (delta < 0 ) reverse = -1;
  if (delta > 0 ) reverse = 1;
  console.log(reverse)
};

// GET ROTATION OF ELEMENT
// function getCurrentRotation(el){
//   var st = window.getComputedStyle(el, null);
//   var tm = st.getPropertyValue("-webkit-transform") ||
//            st.getPropertyValue("-moz-transform") ||
//            st.getPropertyValue("-ms-transform") ||
//            st.getPropertyValue("-o-transform") ||
//            st.getPropertyValue("transform") ||
//            "none";
//   if (tm != "none") {
//     var values = tm.split('(')[1].split(')')[0].split(',');
//     angle = (Math.atan2(values[1],values[0]));
//     return (Math.cos(angle));
//   }
//   return 0;
// }