var c = <HTMLCanvasElement>document.getElementById('myCanvas');
let context = c.getContext('2d');
let img = new Image();
var zX = 0;
var zY = 0;
img.onload = animate;
img.src = "zombie.gif";
img.addEventListener('load', () => {
  context.drawImage(img, zX, zY);
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

function animate() {
  context.clearRect(0, 0, c.width, c.height);  // clear canvas
  context.drawImage(img, zX, zY);
}

function moveUp() {
  zY -= 10;
  animate();
}

function moveDown() {
  zY += 10;
  animate();
}

function moveLeft() {
  zX -= 10;
  animate();
}

function moveRight() {
  zX += 10;
  animate();
}
