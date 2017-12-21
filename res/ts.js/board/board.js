var Board = /** @class */ (function () {
    function Board(size) {
        this.size = size;
        this.blanks = [];
        this.reset();
    }
    Board.prototype.reset = function () {
        this.board = this.createArrayBoard(this.size);
        this.updateBlanks();
        this.collectColumns();
    };
    Board.prototype.updateBlanks = function () {
        this.blanks = [];
        for (var i = 0; i < this.size; i++) {
            var row = this.board[i];
            for (var j = 0; j < row.length; j++) {
                var square = row[j];
                if (square.isBlank()) {
                    this.blanks.push(square);
                }
            }
        }
    };
    Board.prototype.collectColumns = function () {
        this.columns = [];
        for (var col = 0; col < this.board.length; col++) {
            this.columns[col] = [];
            for (var row = 0; row < this.board.length; row++) {
                this.columns[col][row] = this.board[row][col];
            }
        }
    };
    Board.prototype.getBlanks = function () {
        this.updateBlanks();
        return this.blanks;
    };
    Board.prototype.hasBlanks = function () {
        this.updateBlanks();
        return this.blanks.length != 0;
    };
    Board.prototype.getRow = function (rowIndex) {
        return this.board[rowIndex];
    };
    Board.prototype.getColumn = function (colIndex) {
        return this.columns[colIndex];
    };
    Board.prototype.getSize = function () {
        return this.size;
    };
    return Board;
}());
