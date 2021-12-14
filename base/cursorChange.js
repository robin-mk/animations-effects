
function changeCursor (imgUrl) {
    cursor.style.backgroundImage = "url(" + imgUrl + ")";
    cursor.classList.toggle('active');
}

function initialCursor () {
    cursor.style.backgroundImage = "none";
    cursor.classList.toggle('active');
}


function closeCursor () {
    cursor.style.backgroundImage = "none";
    cursor.classList.add('close');
}
function noCloseCursor () {
    cursor.style.backgroundImage = "none";
    cursor.classList.remove('close');
}