//TODO measuring units in a grid
//TODO generate random maze
//TODO detect boundaries for user
//TODO detect boundaries for zombies
//TODO logic for zombie wandering
//TODO end game on zombie contact
//TODO OPTIONAL retrieving tincutures or cures or vaccines
//TODO OPTIONAL refactor to class

var unit = 50;
var c = <HTMLCanvasElement>document.getElementById('myCanvas');
let context = c.getContext('2d');
let playerOne = <HTMLImageElement> new Image();
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
playerOne.addEventListener('load', () => {
  context.drawImage(playerOne, zX, zY, zW, zH);
  makeAWall();
});

document.addEventListener('keydown', (event) => {
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
  //TODO PASS IN CONFIG INSTEAD OF ONE THING
  //EVERYTHING GETS REDRAWN?
  context.clearRect(0, 0, c.width, c.height);  // clear canvas
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

function canMoveImage(image:HTMLImageElement, direction:string) {
  switch(direction) {
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
  let img = new Image();
  img.src = 'bricks.jpg';
  img.addEventListener('load', () => {
    context.drawImage(img, bX, bY, bW, bH);
  });
}
