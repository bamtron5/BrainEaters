//TODO measuring units in a grid
//TODO generate random maze
//TODO detect boundaries for user √
//TODO detect boundaries for zombies
//TODO logic for zombie wandering
//TODO end game on zombie contact
//TODO OPTIONAL retrieving tinctures or cures or vaccines
///<reference types="es6-shim" />


interface IPoint {
  x:number;
  y:number;
}

interface IGame {
  c:HTMLCanvasElement;
  context:CanvasRenderingContext2D;
  area:number;
  hashTable:Map<{},{}>;
}

interface ITile {
  unit:number;
  image:HTMLImageElement,
  x:number,
  y:number,
  w:number,
  h:number,
  pointer:number,
  type:string
}

class Point implements IPoint{
  x:number;
  y:number;
  constructor(
    x:number,
    y:number
  ) {
    this.x = x;
    this.y = y;
  }
}

class Game implements IGame {
  c:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('myCanvas');
  context:CanvasRenderingContext2D = this.c.getContext('2d');
  hashTable:Map<{},{}>;
  area:number;
  constructor() {
    this.area = (this.c.height / unit) * (this.c.width / unit);
    this.hashTable = new Map();
  }
}

class Tile implements ITile {
  unit:number = 50;
  image:HTMLImageElement;
  x:number;
  y:number;
  w:number;
  h:number;
  pointer:number;
  type:string;
  constructor(
    image:string,
    x:number,
    y:number
  ) {
    this.image = new Image();
    this.image.src = image;
    this.image.height = this.unit;
    this.image.width = this.unit;
    this.w = this.unit;
    this.h = this.unit;
    this.x = x;
    this.y = y;
    this.image.addEventListener('load', () => {
      this.drawTile();
    });
  }

  drawTile() {
    game.hashTable.set(JSON.stringify(new Point(this.x, this.y)), this);
    game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
  }

  clearTile() {
    game.hashTable.delete(JSON.stringify(new Point(this.x, this.y)));
    game.context.clearRect(this.x, this.y, this.w, this.h);
  }

  moveUp() {
    if (this.canMoveImage(this.image, 'up')) {
      this.clearTile();
      this.y -= this.unit;
      this.drawTile();
    }
  }

  moveDown() {
    if (this.canMoveImage(this.image, 'down')) {
      this.clearTile();
      this.y += this.unit;
      this.drawTile();
    }
  }

  moveLeft() {
    if (this.canMoveImage(this.image, 'left')) {
      this.clearTile();
      this.x -= this.unit;
      this.drawTile();
    }
  }

  moveRight() {
    if (this.canMoveImage(this.image, 'right')) {
      this.clearTile();
      this.x += this.unit;
      this.drawTile();
    }
  }

  canMoveImage(image:HTMLImageElement, direction:string) {
    switch(direction) {
      case 'up':
        let destUp = JSON.stringify(new Point(this.x, this.y - this.unit));
        return !game.hashTable.get(destUp) ? this.y > 0 : false;
      case 'down':
        let destDown = JSON.stringify(new Point(this.x, this.y + this.unit));
        return !game.hashTable.get(destDown) ? (this.y + this.h) < game.c.height : false;
      case 'left':
        let destLeft = JSON.stringify(new Point(this.x - this.unit, this.y));
        return !game.hashTable.get(destLeft) ? this.x > 0 : false;
      case 'right':
        let destRight = JSON.stringify(new Point(this.x + this.unit, this.y));
        return !game.hashTable.get(destRight) ? (this.x + this.w) < game.c.width : false;
    }
  }
}


class Player extends Tile {
  type:string = 'Player';
  constructor(
    image:string,
    x:number,
    y:number
  ) {
    super(image, x, y);
    this.createControls();
  }

  createControls() {
    document.addEventListener('keydown', (event) => {
      console.log(event.key);
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
    }, false);
  }
}

class Wall extends Tile {
  type:string = 'Wall';
}
class Zombie extends Tile {
  type:string = 'Zombie';
}

const unit = 50;

let game:IGame = new Game();

let zombies:Array<ITile> = [
  new Zombie('assets/zombie.gif', unit, unit),
  new Zombie('assets/zombie.gif', unit, 0)
];

let walls:Array<ITile> = [
  new Wall('assets/bricks.jpg', unit, unit*2),
  new Wall('assets/bricks.jpg', unit, unit*3),
  new Wall('assets/bricks.jpg', unit, unit*4),
  new Wall('assets/bricks.jpg', unit, unit*5),
  new Wall('assets/bricks.jpg', unit, unit*6),
  new Wall('assets/bricks.jpg', unit, unit*7),
  new Wall('assets/bricks.jpg', unit, unit*8),
  new Wall('assets/bricks.jpg', unit*2, unit*8),
  new Wall('assets/bricks.jpg', unit*3, unit*8),
  new Wall('assets/bricks.jpg', unit*4, unit*8),
  new Wall('assets/bricks.jpg', unit*5, unit*8),
  new Wall('assets/bricks.jpg', unit*6, unit*8),
  new Wall('assets/bricks.jpg', unit*7, unit*8),
  new Wall('assets/bricks.jpg', unit*8, unit*8),
  new Wall('assets/bricks.jpg', unit*8, unit*7),
  new Wall('assets/bricks.jpg', unit*8, unit*6),
  new Wall('assets/bricks.jpg', unit*8, unit*5),
  new Wall('assets/bricks.jpg', unit*8, unit*4),
  new Wall('assets/bricks.jpg', unit*8, unit*3),
  new Wall('assets/bricks.jpg', unit*8, unit*2),
  new Wall('assets/bricks.jpg', unit*8, unit*1),
  new Wall('assets/bricks.jpg', unit*8, unit),
  new Wall('assets/bricks.jpg', unit*8, 0)
];

let player:ITile = new Player('assets/player.png', 0, 0);
