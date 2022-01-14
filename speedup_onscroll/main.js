//  PROBLEME AVEC LE HARD RELOAD IL Y A BESOIN D UN SOFT RELOAD, PK ?

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


const sentencesContainer = document.querySelectorAll('.infinity');
let indiceInfinityItems = 0;
sentencesContainer.forEach(function (item) {
  speed[indiceInfinityItems] = +item.dataset.speed;
  sentenceText = item.dataset.text;
  separatorText = item.dataset.separator;

  sentence[indiceInfinityItems] = document.createElement('div');
  sentence[indiceInfinityItems].textContent = sentenceText;
  sentence[indiceInfinityItems].className = "sentenceInfinity" + indiceInfinityItems + " sentenceInfinity itemToTranslate" + indiceInfinityItems;
  console.log(sentence[indiceInfinityItems].getBoundingClientRect().width)

  createDOMElements(sentence[indiceInfinityItems], indiceInfinityItems);

  indiceInfinityItems++;

});

// function createDOMElements(a, b, indiceInfinityItems) {
function createDOMElements(a, indiceInfinityItems) {
  // const child = await funtion
  sentencesContainer[indiceInfinityItems].appendChild(a);

  setTimeout(() => {

    sentenceWidth[indiceInfinityItems] = a.getBoundingClientRect().width;
    console.log(sentenceWidth[indiceInfinityItems])
    // +2 pour dépasser de 1 à gauche et de 1 à droite
    lengthArray[indiceInfinityItems] = (Math.ceil(window.innerWidth / sentenceWidth[indiceInfinityItems])) + 2;

    // initialise une array de 0 de la bonne taille : stocke tous les temps pour la transform
    sentencesTimeArray[indiceInfinityItems] = new Array(lengthArray[indiceInfinityItems]).fill(0);

    // creation d'entite tant que l'ecran n'est pas rempli
    for (let i = 0; i < lengthArray[indiceInfinityItems] - 1; i++) {
      sentencesContainer[indiceInfinityItems].appendChild(a.cloneNode(true));
    }

    itemToTranslate[indiceInfinityItems] = document.querySelectorAll(`.itemToTranslate${indiceInfinityItems}`);
    sentenceInfinity[indiceInfinityItems] = document.querySelectorAll(`.sentenceInfinity${indiceInfinityItems}`);
  }, 1000)
}

// initiate();

// function initiate(sentence, separator, indiceInfinityItems) {
setInterval(timeCount, intervalTimer);
// }

// ANIMATION PART
function timeCount() {
  // pour les phrases
  for (let j = 0; j < indiceInfinityItems; j++) {
    for (let i = 0; i < lengthArray[j]; i++) {

      sentencesTimeArray[j][i] += speed[j] + Math.sign(speed[j]) * delta;
      // replacement au debut si disparait a gauche
      if (sentencesTimeArray[j][i] > (sentenceWidth[j] * (i + 2))) {
        sentencesTimeArray[j][i] -= lengthArray[j] * sentenceWidth[j];

        // text plus à l'écran à gauche : invisible
        sentenceInfinity[j][i].style.opacity = 0;

        // partie pour gerer la transition
        // sentenceInfinity[j][i].style.transition = "transform 0s linear";
        // sentenceInfinity[j][i].style.opacity = 0;
        // setTimeout(() => {
        //   sentenceInfinity[j][i].style.transition = "transform 0.2s ease-out";
        //   sentenceInfinity[j][i].style.opacity = 1;
        // }, 20)



      }

      // le plus 3 parce que il est invisible à gauche à plus 2
      if (sentencesTimeArray[j][i] < (sentenceWidth[j] * (i + 3 - lengthArray[j]))) {
        // text à l'écran à droite : visible
        sentenceInfinity[j][i].style.opacity = 1;
      }

      // si delta negatif
      if (sentencesTimeArray[j][i] < (sentenceWidth[j] * (i + 2 - lengthArray[j]))) {
        sentencesTimeArray[j][i] += lengthArray[j] * sentenceWidth[j];
      }

      // TRANSFORM
      sentenceInfinity[j][i].style.transform = "translateX(" + - sentencesTimeArray[j][i] + "px)";




      // visibleOnScreen[j][i] = sentenceInfinity[j][i];
      if (sentenceInfinity[j][i].getBoundingClientRect().left > window.innerWidth || sentenceInfinity[j][i].getBoundingClientRect().right < 0) {
        sentenceInfinity[j][i].style.opacity = 0;
      } else {
        sentenceInfinity[j][i].style.opacity = 1;
      }
      console.log(sentenceInfinity[j][i].getBoundingClientRect().left);


    }
  }

  // BONNE METHODE POUR GERER LA TRANSITION INVISIBLE

  // if (time > 20 + texteWidth / speed) { // text1 plus à l'écran à gauche : invisible
  //   texte.style.opacity = 0;
  //   time = -texteWidth / speed;
  // }
  // if (time > -texteWidth / speed) { // text1 bien arrivé à droite : passer visible
  //   texte.style.opacity = 1;
  // }
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
  checkScrollSpeed();
};