var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function () {
    function Game() {
        this.c = document.getElementById('myCanvas');
        this.context = this.c.getContext('2d');
    }
    return Game;
}());
var Tile = (function () {
    function Tile(image) {
        var _this = this;
        this.unit = 50;
        this.x = 0;
        this.y = 0;
        this.image = new Image();
        this.image.src = image;
        this.image.height = this.unit;
        this.image.width = this.unit;
        this.w = this.unit;
        this.h = this.unit;
        this.image.addEventListener('load', function () {
            _this.drawTile();
        });
    }
    Tile.prototype.drawTile = function () {
        this.clearTile();
        game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
    Tile.prototype.clearTile = function () {
        game.context.clearRect(this.x, this.y, this.w, this.h);
    };
    Tile.prototype.moveUp = function () {
        if (this.canMoveImage(this.image, 'up')) {
            this.y -= this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveDown = function () {
        if (this.canMoveImage(this.image, 'down')) {
            this.y += this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveLeft = function () {
        if (this.canMoveImage(this.image, 'left')) {
            this.x -= this.unit;
            this.drawTile();
        }
    };
    Tile.prototype.moveRight = function () {
        if (this.canMoveImage(this.image, 'right')) {
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
    function Zombie(image) {
        return _super.call(this, image) || this;
    }
    return Zombie;
}(Tile));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(image) {
        var _this = _super.call(this, image) || this;
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
        }, true);
    };
    return Player;
}(Tile));
var game = new Game();
var zombies = [
    new Zombie('zombie.gif'),
    new Zombie('zombie.gif')
];
var player = new Player('player.png');
//# sourceMappingURL=index.js.map