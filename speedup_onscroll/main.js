

let texte = document.getElementById("loading");
let texte2 = document.getElementById("loading2");
let rotator = document.getElementById("rotator");
let time = 0;
let time2 = 0;
let intervalTimer = 5; // precision de l'interval et donc de la transform
let interval = setInterval(timeCount, intervalTimer);
let initialSpeed = 1; // 0 ou 1
let speed = 0.2;

let texteWidth = texte.getBoundingClientRect().width;
let texte2Width = texte2.getBoundingClientRect().width;


// VERSION CREATE DIV
// ****************

let sentenceText = "MY NAME IS ROBIN";
let separatorText = "|";
const sentencesContainer = document.querySelector('#sentencesContainer');
const sentence = document.createElement('div');
sentence.textContent = sentenceText;
sentence.className = "sentence itemToTranslate";
const separator = document.createElement('div');
separator.textContent = separatorText;
separator.className = "separator itemToTranslate";

initiate();

async function initiate() {
  await createDOMElements();
  setInterval(timeCount2, intervalTimer);
}

async function createDOMElements() {
  sentencesContainer.appendChild(sentence);
  sentencesContainer.appendChild(separator);

  let sentenceWidth = sentence.getBoundingClientRect().width;
  let separatorWidth = separator.getBoundingClientRect().width;

  console.log(sentenceWidth, separatorWidth, window.innerWidth)
  console.log(Math.ceil(window.innerWidth / (sentenceWidth + separatorWidth)))

  // creation d'entite tant que l'ecran n'est pas rempli

  for (let i = 0; i < Math.ceil(window.innerWidth / (sentenceWidth + separatorWidth)); i++) {
    sentencesContainer.appendChild(sentence.cloneNode(true));
    sentencesContainer.appendChild(separator.cloneNode(true));
  }

  // return (sentencesContainer);

}

// ANIMATION PART
function timeCount2() {
  time += initialSpeed + delta;
  let itemToTranslate = document.querySelectorAll(".itemToTranslate");
  let i = 0;

  // IL FAUT CREER UN ARRAY AVEC UN TIME DIFFERENT POUR CHAQUE ITEM

  itemToTranslate.forEach(function (item) {
    i++;
    item.style.transform = "translateX(" + - time * i * speed + "px)";
  });

  if (time > 20 + texteWidth / speed) { // text1 plus à l'écran à gauche : invisible
    texte.style.opacity = 0;
    time = -texteWidth / speed;
  }
  if (time > -texteWidth / speed) { // text1 bien arrivé à droite : passer visible
    texte.style.opacity = 1;
  }
  if (time < - texteWidth / speed) { // si on revient en arrière alors que le texte est déplacé à droite
    time = 20 + texteWidth / speed;
  }
}

// sentencesContainer.appendChild(sentence);
// ****************



// ANIMATION PART
function timeCount() {
  time += initialSpeed + delta;
  time2 += initialSpeed + delta;
  // console.log(time2, texte2Width)
  if (time > 20 + texteWidth / speed) { // text1 plus à l'écran à gauche : invisible
    texte.style.opacity = 0;
    time = -texteWidth / speed;
  }
  if (time > -texteWidth / speed) { // text1 bien arrivé à droite : passer visible
    texte.style.opacity = 1;
  }
  if (time < - texteWidth / speed) { // si on revient en arrière alors que le texte est déplacé à droite
    time = 20 + texteWidth / speed;
  }
  if (time2 > 20 + texte2Width / speed + texteWidth / speed) { // text2 plus à l'écran à gauche : invisible
    texte2.style.opacity = 0;
    time2 = 0;
  }
  if (time > -texte2Width / speed) { // text2 bien arrivé à droite : passer visible
    texte2.style.opacity = 1;
  }
  if (time2 < 0) { // si on revient en arrière alors que le texte2 est déplacé à droite
    time2 = texte2Width / speed + texteWidth / speed;
  }
  // texte.style.transform = "translateX(" + - time * speed + "px)";
  // texte.style.transition = "transform 0.4s ease-out";
  // texte2.style.transform = "translateX(" + - time2 * speed + "px)";
  // texte2.style.transition = "transform 0.4s ease-out";
  // rotator.style.transform = "rotate(" + time / 5 + "deg)";
  // rotator.style.transition = "transform 0.4s ease-out";
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