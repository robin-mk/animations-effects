//  PROBLEME AVEC LE HARD RELOAD IL Y A BESOIN D UN SOFT RELOAD, PK ?

let rotator = document.getElementById("rotator");
let intervalTimer = 5; // precision de l'interval et donc de la transform / ne pas changer sinon ça ne marche plus
let sentenceWidth;
let separatorWidth;
let indiceItem = 0;
let delta = 0;
let sentencesTimeArray = [];
let separatorsTimeArray = [];
let speed = [];
let sentence = [];
let separator = [];
let itemToTranslate = [];
let sentenceInfinity = [];
let separatorInfinity = [];
let lengthArray;
let interval = [];

// const sentencesContainer = document.querySelector('.infinity');
const sentencesContainer = document.querySelectorAll('.infinity');
let indiceInfinityItems = 0;
sentencesContainer.forEach(function (item) {
  speed[indiceInfinityItems] = +item.dataset.speed;
  sentenceText = item.dataset.text;
  separatorText = item.dataset.separator;

  sentence[indiceInfinityItems] = document.createElement('div');
  sentence[indiceInfinityItems].textContent = sentenceText;
  sentence[indiceInfinityItems].className = "sentenceInfinity" + indiceInfinityItems + " sentenceInfinity itemToTranslate" + indiceInfinityItems;
  separator[indiceInfinityItems] = document.createElement('div');
  separator[indiceInfinityItems].textContent = separatorText;
  separator[indiceInfinityItems].className = "separatorInfinity" + indiceInfinityItems + " separatorInfinity itemToTranslate" + indiceInfinityItems;


  createDOMElements(sentence[indiceInfinityItems], separator[indiceInfinityItems], indiceInfinityItems);

  indiceInfinityItems++;

});

function createDOMElements(a, b, indiceInfinityItems) {
  sentencesContainer[indiceInfinityItems].appendChild(a);
  sentencesContainer[indiceInfinityItems].appendChild(b);


  sentenceWidth = a.getBoundingClientRect().width;
  separatorWidth = b.getBoundingClientRect().width;
  // +2 pour dépasser de 1 à gauche et de 1 à droite
  lengthArray = (Math.ceil(window.innerWidth / (sentenceWidth + separatorWidth))) + 2;

  // initialise une array de 0 de la bonne taille : stocke tous les temps pour chaque transform
  sentencesTimeArray = new Array(2).fill().map(() => Array(lengthArray).fill(0));
  separatorsTimeArray = new Array(2).fill().map(() => Array(lengthArray).fill(0));

  // creation d'entite tant que l'ecran n'est pas rempli
  for (let i = 0; i < lengthArray; i++) {
    sentencesContainer[indiceInfinityItems].appendChild(a.cloneNode(true));
    sentencesContainer[indiceInfinityItems].appendChild(b.cloneNode(true));
  }

  itemToTranslate[indiceInfinityItems] = document.querySelectorAll(`.itemToTranslate${indiceInfinityItems}`);
  sentenceInfinity[indiceInfinityItems] = document.querySelectorAll(`.sentenceInfinity${indiceInfinityItems}`);
  separatorInfinity[indiceInfinityItems] = document.querySelectorAll(`.separatorInfinity${indiceInfinityItems}`);
}

// initiate();

// function initiate(sentence, separator, indiceInfinityItems) {
setInterval(timeCount, intervalTimer);
console.log(lengthArray)
// }

// ANIMATION PART
function timeCount() {
  // pour les phrases
  for (let j = 0; j < indiceInfinityItems; j++) {
    for (let i = 0; i < (lengthArray * 2); i++) {
      sentencesTimeArray[j][i] += speed[j] + delta;
      // replacement au debut si disparait a gauche
      if (sentencesTimeArray[j][i] > (sentenceWidth * (i + 2) + separatorWidth * (i + 2))) {
        sentencesTimeArray[j][i] -= lengthArray * sentenceWidth + lengthArray * separatorWidth;

        // text plus à l'écran à gauche : invisible
        sentenceInfinity[j][i].style.opacity = 0;

        // partie pour gerer la transition
        // sentenceInfinity[i].style.transition = "transform 0s linear";
        // sentenceInfinity[i].style.opacity = 0;
        // setTimeout(() => {
        //   sentenceInfinity[i].style.transition = "transform 0.2s ease-out";
        //   sentenceInfinity[i].style.opacity = 1;
        // }, 20)
      }

      // le plus 3 parce que il est invisible à gauche à plus 2
      if (sentencesTimeArray[j][i] < (sentenceWidth * (i + 3 - lengthArray) + separatorWidth * (i + 3 - lengthArray))) {
        // text à l'écran à droite : visible
        sentenceInfinity[j][i].style.opacity = 1;
      }

      // si delta negatif
      if (sentencesTimeArray[j][i] < (sentenceWidth * (i + 2 - lengthArray) + separatorWidth * (i + 2 - lengthArray))) {
        sentencesTimeArray[j][i] += lengthArray * sentenceWidth + lengthArray * separatorWidth;
      }

      // TRANSFORM

      itemToTranslate[j][i].style.transform = "translateX(" + - sentencesTimeArray[j][i] + "px)";

      // console.log(sentencesTimeArray[0][7], itemToTranslate[0][10])

      // /////////////////////////////////////////////////////////////////////
      // PEUT ETRE NE PAS SEPARER LES SEPARATEURS DES SENTENCES ??????????????
      // /////////////////////////////////////////////////////////////////////


    }
    // pour les separateurs
    for (let i = 0; i < lengthArray; i++) {
      separatorsTimeArray[j][i] += speed + delta;
      // replacement au debut si disparait a gauche
      if (separatorsTimeArray[j][i] > (sentenceWidth * (i + 1) + separatorWidth * (i + 1))) {
        separatorsTimeArray[j][i] -= lengthArray * sentenceWidth + lengthArray * separatorWidth;

        // text plus à l'écran à gauche : invisible
        separatorInfinity[j][i].style.opacity = 0;

        // partie pour gerer la transition
        // separatorInfinity[i].style.transition = "transform 0s linear";
        // separatorInfinity[i].style.opacity = 0;
        // setTimeout(() => {
        //   separatorInfinity[i].style.transition = "transform 0.2s ease-out";
        //   separatorInfinity[i].style.opacity = 1;
        // }, 20)
      }

      // le plus 3 parce que il est invisible à gauche à plus 2
      if (separatorsTimeArray[j][i] < (sentenceWidth * (i + 3 - lengthArray) + separatorWidth * (i + 3 - lengthArray))) {
        // text à l'écran à droite : visible
        separatorInfinity[j][i].style.opacity = 1;
      }

      // si delta negatif
      if (separatorsTimeArray[j][i] < (sentenceWidth * (i + 2 - lengthArray) + separatorWidth * (i + 2 - lengthArray))) {
        separatorsTimeArray[j][i] += lengthArray * sentenceWidth + lengthArray * separatorWidth;
      }

      // TRANSFORM

      itemToTranslate[j][i].style.transform = "translateX(" + - separatorsTimeArray[j][i] + "px)";



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




  // if (time < - texteWidth / speed) { // si on revient en arrière alors que le texte est déplacé à droite
  //   time = 20 + texteWidth / speed;
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