var unit = 50;
var c = document.getElementById('myCanvas');
var context = c.getContext('2d');
var playerOne = new Image();
var zW = unit;
var zH = unit;
var zX = 0;
var zY = 0;
var bW = unit;
var bH = unit;
var bX = c.width - bW;
var bY = c.height - bH;
playerOne.src = "zombie.gif";
playerOne.width = zW;
playerOne.height = zH;
playerOne.addEventListener('load', function () {
    context.drawImage(playerOne, zX, zY, zW, zH);
    makeAWall();
});
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
}, true);
function animate(content) {
    context.clearRect(0, 0, c.width, c.height);
    context.drawImage(content, zX, zY, zW, zH);
}
function moveUp() {
    if (canMoveImage(playerOne, 'up')) {
        zY -= unit;
        animate(playerOne);
    }
}
function moveDown() {
    if (canMoveImage(playerOne, 'down')) {
        zY += unit;
        animate(playerOne);
    }
}
function moveLeft() {
    if (canMoveImage(playerOne, 'left')) {
        zX -= unit;
        animate(playerOne);
    }
}
function moveRight() {
    if (canMoveImage(playerOne, 'right')) {
        zX += unit;
        animate(playerOne);
    }
}
function canMoveImage(image, direction) {
    switch (direction) {
        case 'up':
            return zY > 0;
        case 'down':
            return (zY + zH) < c.height;
        case 'left':
            return zX > 0;
        case 'right':
            return (zX + zW) < c.width;
    }
}
function makeAWall() {
    var img = new Image();
    img.src = 'bricks.jpg';
    img.addEventListener('load', function () {
        context.drawImage(img, bX, bY, bW, bH);
    });
}
//# sourceMappingURL=index.js.map