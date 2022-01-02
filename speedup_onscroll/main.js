//  PROBLEME AVEC LE HARD RELOAD IL Y A BESOIN D UN SOFT RELOAD, PK ?

let rotator = document.getElementById("rotator");
let intervalTimer = 5; // precision de l'interval et donc de la transform / ne pas changer sinon ça ne marche plus
let sentenceWidth;
let separatorWidth;
let indiceItem = 0;
let delta = 0;
let sentencesTimeArray;
let separatorsTimeArray;
let itemToTranslate;
let lengthArray;

// const sentencesContainer = document.querySelector('.infinity');
const sentencesContainer = document.querySelectorAll('.infinity');
// let speed;
let indiceInfinityItems = 0;
sentencesContainer.forEach(function (item) {
  speed = +item.dataset.speed;
  sentenceText = item.dataset.text;
  separatorText = item.dataset.separator;
// let speed = +sentencesContainer.dataset.speed;
// let sentenceText = sentencesContainer.dataset.text;
// let separatorText = sentencesContainer.dataset.separator;

  let sentence = document.createElement('div');
  sentence.textContent = sentenceText;
  sentence.className = "sentenceInfinity" + indiceInfinityItems + " sentenceInfinity itemToTranslate" + indiceInfinityItems;
  let separator = document.createElement('div');
  separator.textContent = separatorText;
  separator.className = "separatorInfinity" + indiceInfinityItems + " separatorInfinity itemToTranslate" + indiceInfinityItems;

  initiate(speed, sentence, separator, indiceInfinityItems);

  indiceInfinityItems++;

});

// const sentence = document.createElement('div');
// sentence.textContent = sentenceText;
// sentence.className = "sentenceInfinity itemToTranslate";
// const separator = document.createElement('div');
// separator.textContent = separatorText;
// separator.className = "separatorInfinity itemToTranslate";

// array length

// initiate();

async function initiate(speed, sentence, separator, indiceInfinityItems) {
  await createDOMElements(sentence, separator, indiceInfinityItems);
  setInterval("timeCount(speed)", intervalTimer);
}

async function createDOMElements(sentence, separator, indiceInfinityItems) {
  sentencesContainer[indiceInfinityItems].appendChild(sentence);
  sentencesContainer[indiceInfinityItems].appendChild(separator);
  // sentencesContainer.appendChild(sentence);
  // sentencesContainer.appendChild(separator);

  sentenceWidth = sentence.getBoundingClientRect().width;
  separatorWidth = separator.getBoundingClientRect().width;
  // +2 pour dépasser de 1 à gauche et de 1 à droite
  lengthArray = (Math.ceil(window.innerWidth / (sentenceWidth + separatorWidth))) + 2;

  // initialise une array de 0 de la bonne taille : stocke tous les temps pour chaque transform
  sentencesTimeArray = new Array(lengthArray).fill(0);
  separatorsTimeArray = new Array(lengthArray).fill(0);

  // creation d'entite tant que l'ecran n'est pas rempli
  for (let i = 0; i < lengthArray; i++) {
    sentencesContainer[indiceInfinityItems].appendChild(sentence.cloneNode(true));
    sentencesContainer[indiceInfinityItems].appendChild(separator.cloneNode(true));
    // sentencesContainer.appendChild(sentence.cloneNode(true));
    // sentencesContainer.appendChild(separator.cloneNode(true));
  }

  itemToTranslate = document.querySelectorAll(`.itemToTranslate${indiceInfinityItems}`);
  sentenceInfinity = document.querySelectorAll(`.sentenceInfinity${indiceInfinityItems}`);
  separatorInfinity = document.querySelectorAll(`.separatorInfinity${indiceInfinityItems}`);
}

// ANIMATION PART
function timeCount(speed) {
  console.log(lengthArray)
  // pour les phrases
  for (let i = 0; i < lengthArray; i++) {
    sentencesTimeArray[i] += speed + delta;
    // replacement au debut si disparait a gauche
    if (sentencesTimeArray[i] > (sentenceWidth * (i + 2) + separatorWidth * (i + 2))) {
      sentencesTimeArray[i] -= lengthArray * sentenceWidth + lengthArray * separatorWidth;

      // text plus à l'écran à gauche : invisible
      sentenceInfinity[i].style.opacity = 0;

      // partie pour gerer la transition
      // sentenceInfinity[i].style.transition = "transform 0s linear";
      // sentenceInfinity[i].style.opacity = 0;
      // setTimeout(() => {
      //   sentenceInfinity[i].style.transition = "transform 0.2s ease-out";
      //   sentenceInfinity[i].style.opacity = 1;
      // }, 20)
    }

    // le plus 3 parce que il est invisible à gauche à plus 2
    if (sentencesTimeArray[i] < (sentenceWidth * (i + 3 - lengthArray) + separatorWidth * (i + 3 - lengthArray))) {
      // text à l'écran à droite : visible
      sentenceInfinity[i].style.opacity = 1;
    }

    // si delta negatif
    if (sentencesTimeArray[i] < (sentenceWidth * (i + 2 - lengthArray) + separatorWidth * (i + 2 - lengthArray))) {
      sentencesTimeArray[i] += lengthArray * sentenceWidth + lengthArray * separatorWidth;
    }
  }
  // pour les separateurs
  for (let i = 0; i < lengthArray; i++) {
    separatorsTimeArray[i] += speed + delta;
    // replacement au debut si disparait a gauche
    if (separatorsTimeArray[i] > (sentenceWidth * (i + 1) + separatorWidth * (i + 1))) {
      separatorsTimeArray[i] -= lengthArray * sentenceWidth + lengthArray * separatorWidth;

      // text plus à l'écran à gauche : invisible
      separatorInfinity[i].style.opacity = 0;

      // partie pour gerer la transition
      // separatorInfinity[i].style.transition = "transform 0s linear";
      // separatorInfinity[i].style.opacity = 0;
      // setTimeout(() => {
      //   separatorInfinity[i].style.transition = "transform 0.2s ease-out";
      //   separatorInfinity[i].style.opacity = 1;
      // }, 20)
    }

    // le plus 3 parce que il est invisible à gauche à plus 2
    if (separatorsTimeArray[i] < (sentenceWidth * (i + 3 - lengthArray) + separatorWidth * (i + 3 - lengthArray))) {
      // text à l'écran à droite : visible
      separatorInfinity[i].style.opacity = 1;
    }

    // si delta negatif
    if (separatorsTimeArray[i] < (sentenceWidth * (i + 2 - lengthArray) + separatorWidth * (i + 2 - lengthArray))) {
      separatorsTimeArray[i] += lengthArray * sentenceWidth + lengthArray * separatorWidth;
    }
  }

  console.log(sentencesTimeArray)

  let indice = 0;

  itemToTranslate.forEach(function (item) {
    if ((indice % 2) === 0) { // is even
      item.style.transform = "translateX(" + - sentencesTimeArray[indice / 2] + "px)";
    }
    if (indice % 2 === 1 && indice < 2 * lengthArray) { // is odd
      item.style.transform = "translateX(" + - separatorsTimeArray[Math.floor(indice / 2)] + "px)";
    }
    indice++;
  });



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