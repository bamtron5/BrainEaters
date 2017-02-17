//TODO measuring units in a grid
//TODO generate random maze
//TODO detect boundaries for user
//TODO detect boundaries for zombies
//TODO logic for zombie wandering
//TODO end game on zombie contact
//TODO OPTIONAL retrieving tincutures or cures or vaccines

interface IGame {
  c:HTMLCanvasElement;
  context:CanvasRenderingContext2D;
}

interface ITile {
  unit:number;
  image:HTMLImageElement,
  x:number,
  y:number,
  w:number,
  h:number
}

class Game implements IGame{
  c:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
  context:CanvasRenderingContext2D = this.c.getContext('2d');
}

class Tile implements ITile{
  unit:number = 50;
  image:HTMLImageElement;
  x:number=0;
  y:number=0;
  w:number;
  h:number;
  constructor(
    image:string
  ) {
    this.image = new Image();
    this.image.src = image;
    this.image.height = this.unit;
    this.image.width = this.unit;
    this.w = this.unit;
    this.h = this.unit;
    this.image.addEventListener('load', () => {
      this.drawTile();
    });
  }

  drawTile() {
    this.clearTile();
    game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  clearTile() {
    game.context.clearRect(this.x, this.y, this.w, this.h);
  }

  moveUp() {
    if (this.canMoveImage(this.image, 'up')) {
      this.y -= this.unit;
      this.drawTile();
    }
  }

  moveDown() {
    if (this.canMoveImage(this.image, 'down')) {
      this.y += this.unit;
      this.drawTile();
    }
  }

  moveLeft() {
    if (this.canMoveImage(this.image, 'left')) {
      this.x -= this.unit;
      this.drawTile();
    }
  }

  moveRight() {
    if (this.canMoveImage(this.image, 'right')) {
      this.x += this.unit;
      this.drawTile();
    }
  }

  canMoveImage(image:HTMLImageElement, direction:string) {
    switch(direction) {
      case 'up':
        return this.y > 0;
      case 'down':
        return (this.y + this.h) < game.c.height;
      case 'left':
        return this.x > 0;
      case 'right':
        return (this.x + this.w) < game.c.width;
    }
  }
}

class Zombie extends Tile{
  public image:HTMLImageElement
  constructor(
    image:string
  ) {
    super(image);
  }
}

class Player extends Tile{
  constructor(
    image:string
  ) {
    super(image);
    this.createControls();
  }

  createControls() {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.moveUp();
          break;
        case 'ArrowDown':
          this.moveDown();
          break;
        case 'ArrowLeft':
          this.moveLeft();
          break;
        case 'ArrowRight':
          this.moveRight();
          break;
      }
    }, true);
  }
}

let game:IGame = new Game();
let zombies:Array<ITile> = [
  new Zombie('zombie.gif'),
  new Zombie('zombie.gif')
];
let player:ITile = new Player('player.png');
