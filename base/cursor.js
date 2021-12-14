const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
});


const closingZoneLeft = document.querySelector('#closingZoneLeft');
const menu = document.querySelector('#menu');
let menuItem = document.querySelectorAll('.menuItem');
let menuClose = true;



menu.addEventListener('click', (e) => {
    if (menuClose) {
        menu.classList.add('active');
        menuItem.forEach(element => {
            element.style.display = "initial";
        });
        menuClose = false;
    } else {
        menuClose = true;
    }
});

closingZoneLeft.addEventListener('click', (e) => {
    menu.classList.remove('active');
    menuItem.forEach(element => {
        element.style.display = "none";
    });
});