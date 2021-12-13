const ball1 = document.getElementById("ball1");
const background = document.getElementById("background");


background.addEventListener("mousemove", function myScript(event) {
    var x = event.clientX;     // Get the mouse horizontal coordinate
    var y = event.clientY;     // Get the mouse vertical coordinate
    console.log(x,y)
    ball1.style.transform = "translate(" + x + offsetXBall1 + "px," + y + offsetYBall1 + "px)";
} );

