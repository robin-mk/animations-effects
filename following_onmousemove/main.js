const ball1 = document.getElementById("ball1");
const background = document.getElementById("background");

let width = window.innerWidth;
let height = window.innerHeight;

ball1.style.transition = "all 1s ease-out";

background.addEventListener("mousemove", function myScript(event) {
    let x = event.clientX - width / 2;     // Get the mouse horizontal coordinate centered
    let y = event.clientY - height / 2;     // Get the mouse vertical coordinate centered

    ball1.style.transform = "translate(" + x * 1.3 + "px," + y * 1.3 + "px)";
});

