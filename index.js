var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        this.c = document.getElementById('myCanvas');
        this.context = this.c.getContext('2d');
        console.log(this);
        this.createHashTable();
    }
    Game.prototype.createHashTable = function () {
        var hMap = this.c.height / unit;
        var wMap = this.c.width / unit;
        var volume = hMap * wMap;
        for (var i = 0; i < volume; i++) {
        }
    };
    return Game;
}());
var Tile = (function () {
    function Tile(image, x, y) {
        var _this = this;
        this.unit = 50;
        this.image = new Image();
        this.image.src = image;
        this.image.height = this.unit;
        this.image.width = this.unit;
        this.w = this.unit;
        this.h = this.unit;
        this.x = x;
        this.y = y;
        this.image.addEventListener('load', function () {
            _this.drawTile();
        });
    }
    Tile.prototype.drawTile = function () {
        game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
    Tile.prototype.clearTile = function () {
        game.context.clearRect(this.x, this.y, this.w, this.h);
    };
    Tile.prototype.moveUp = function () {
        if (this.canMoveImage(this.image, 'up')) {
            this.clearTile();
            this.y -= this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveDown = function () {
        if (this.canMoveImage(this.image, 'down')) {
            this.clearTile();
            this.y += this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveLeft = function () {
        if (this.canMoveImage(this.image, 'left')) {
            this.clearTile();
            this.x -= this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveRight = function () {
        if (this.canMoveImage(this.image, 'right')) {
            this.clearTile();
            this.x += this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.canMoveImage = function (image, direction) {
        switch (direction) {
            case 'up':
                return this.y > 0;
            case 'down':
                return (this.y + this.h) < game.c.height;
            case 'left':
                return this.x > 0;
            case 'right':
                return (this.x + this.w) < game.c.width;
        }
    };
    return Tile;
}());
var Zombie = (function (_super) {
    __extends(Zombie, _super);
    function Zombie(image, x, y) {
        return _super.call(this, image, x, y) || this;
    }
    return Zombie;
}(Tile));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(image, x, y) {
        var _this = _super.call(this, image, x, y) || this;
        _this.createControls();
        return _this;
    }
    Player.prototype.createControls = function () {
        var _this = this;
        document.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    _this.moveUp();
                    break;
                case 'ArrowDown':
                    _this.moveDown();
                    break;
                case 'ArrowLeft':
                    _this.moveLeft();
                    break;
                case 'ArrowRight':
                    _this.moveRight();
                    break;
            }
        }, false);
    };
    return Player;
}(Tile));
var Wall = (function (_super) {
    __extends(Wall, _super);
    function Wall(image, x, y) {
        return _super.call(this, image, x, y) || this;
    }
    return Wall;
}(Tile));
var unit = 50;
var game = new Game();
var zombies = [
    new Zombie('zombie.gif', unit, unit),
    new Zombie('zombie.gif', unit, 0)
];
var walls = [
    new Wall('bricks.jpg', unit, unit * 2),
    new Wall('bricks.jpg', unit, unit * 3),
    new Wall('bricks.jpg', unit, unit * 4),
    new Wall('bricks.jpg', unit, unit * 5),
    new Wall('bricks.jpg', unit, unit * 6),
    new Wall('bricks.jpg', unit, unit * 7),
    new Wall('bricks.jpg', unit, unit * 8),
    new Wall('bricks.jpg', unit * 2, unit * 8),
    new Wall('bricks.jpg', unit * 3, unit * 8),
    new Wall('bricks.jpg', unit * 4, unit * 8),
    new Wall('bricks.jpg', unit * 5, unit * 8),
    new Wall('bricks.jpg', unit * 6, unit * 8),
    new Wall('bricks.jpg', unit * 7, unit * 8),
    new Wall('bricks.jpg', unit * 8, unit * 8),
    new Wall('bricks.jpg', unit * 8, unit * 7),
    new Wall('bricks.jpg', unit * 8, unit * 6),
    new Wall('bricks.jpg', unit * 8, unit * 5),
    new Wall('bricks.jpg', unit * 8, unit * 4),
    new Wall('bricks.jpg', unit * 8, unit * 3),
    new Wall('bricks.jpg', unit * 8, unit * 2),
    new Wall('bricks.jpg', unit * 8, unit * 1),
    new Wall('bricks.jpg', unit * 8, unit),
    new Wall('bricks.jpg', unit * 8, 0)
];
var player = new Player('player.png', 0, 0);
//# sourceMappingURL=index.js.map