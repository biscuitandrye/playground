var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game2048Board = /** @class */ (function (_super) {
    __extends(Game2048Board, _super);
    function Game2048Board(size) {
        var _this = _super.call(this, size) || this;
        _this.moveInfo = new MoveInfo();
        _this.gameInfo = new GameInfo();
        return _this;
    }
    /**
         * Moves the board in the direction desired and returns information about the move
         * @param direction
         * @return
         */
    Game2048Board.prototype.moveBoard = function (direction) {
        // move board and add random new one
        this.moveInfo.reset();
        MoveUtils.move(this, direction, this.moveInfo);
        if (!this.moveInfo.isJammedBoard()) {
            this.genNew(true);
            this.gameInfo.addMove();
        }
        this.gameInfo.addToScore(this.moveInfo.getMovePoints());
        return this.moveInfo;
    };
    /**
     * Generates 2 random squares
     */
    Game2048Board.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (this.gameInfo != null) {
            this.gameInfo.reset();
        }
        this.genNew(false);
        this.genNew(false);
    };
    Game2048Board.prototype.getGameInfo = function () {
        return this.gameInfo;
    };
    /**
     * Generates a new number on the board and places it in a blank location.
     * The new number is random (tied to a probability of it being one number over another) and location is random.
     */
    Game2048Board.prototype.genNew = function (useProb) {
        // go through current blanks and pick one to add the gen number
        this.updateBlanks();
        if (this.getBlanks().length != 0) {
            var lengthBlanks = this.getBlanks().length;
            var fillIndex = Math.floor(Math.random() * lengthBlanks);
            var randSquare = this.getBlanks()[fillIndex];
            randSquare.setValue((Math.random() > Game2048Utils.GEN_NUM_1_PROB && useProb) ? Game2048Utils.GEN_NUM_2 : Game2048Utils.GEN_NUM_1);
            this.updateBlanks();
        }
    };
    Game2048Board.prototype.createArrayBoard = function (size) {
        var board = [];
        for (var i = 0; i < size; i++) {
            board[i] = [];
            for (var j = 0; j < size; j++) {
                var newSquare = new BlockSquare();
                board[i][j] = newSquare;
            }
        }
        return board;
    };
    return Game2048Board;
}(Board));
