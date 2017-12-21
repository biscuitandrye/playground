var MineUtils = /** @class */ (function () {
    function MineUtils() {
    }
    MineUtils.generateMinesForField = function (field, numMines) {
        var size = field.getSize();
        var mines = MineUtils.generateMines(size, numMines);
        for (var i = 0; i < mines.length; i++) {
            var mine = mines[i];
            var x = mine.x;
            var y = mine.y;
            var mineSquare = field.getColumn(x)[y];
            mineSquare.setState(MineState.MINE);
            // now get the 8 adjacent squares and add 1
            var adjacentSquares = MineUtils.getAdjacentSquares(mineSquare, field);
            adjacentSquares.forEach(function (square) {
                square.increaseAdjacentCount();
            });
        }
    };
    MineUtils.getAdjacentSquares = function (square, field) {
        var size = field.getSize();
        var coord = square.getCoord();
        var x = coord.x;
        var y = coord.y;
        var canCheckLeft = x != 0;
        var canCheckAbove = y != 0;
        var canCheckRight = x != size - 1;
        var canCheckBelow = y != size - 1;
        var adjacentMap = {};
        var row;
        if (canCheckAbove) {
            row = field.getRow(y - 1);
            MineUtils.getRangeSquares(row, x, canCheckLeft, canCheckRight, adjacentMap);
        }
        row = field.getRow(y);
        MineUtils.getRangeSquares(row, x, canCheckLeft, canCheckRight, adjacentMap);
        // remove myself
        adjacentMap[square.getCoord().getId()] = null;
        if (canCheckBelow) {
            row = field.getRow(y + 1);
            MineUtils.getRangeSquares(row, x, canCheckLeft, canCheckRight, adjacentMap);
        }
        var adjacents = [];
        for (var key in adjacentMap) {
            if (adjacentMap.hasOwnProperty(key)) {
                adjacents.push(adjacentMap[key]);
            }
        }
        return adjacents;
    };
    MineUtils.generateMines = function (size, numMines) {
        var minesMap = {};
        var i = numMines;
        while (i > 0) {
            var x = Math.floor(Math.random() * size);
            var y = Math.floor(Math.random() * size);
            var pt = new Point(x, y);
            while (minesMap[pt.getId()]) {
                y = Math.floor(Math.random() * size);
                ;
                pt.y = y;
            }
            minesMap[pt.getId()] = pt;
            i--;
        }
        var mines = [];
        for (var key in minesMap) {
            if (minesMap.hasOwnProperty(key)) {
                mines.push(minesMap[key]);
            }
        }
        return mines;
    };
    MineUtils.getRangeSquares = function (row, x, canCheckLeft, canCheckRight, adjacentsMap) {
        if (canCheckLeft) {
            var square = row[x - 1];
            adjacentsMap[square.getCoord().getId()] = square;
        }
        var square = row[x];
        adjacentsMap[square.getCoord().getId()] = square;
        if (canCheckRight) {
            square = row[x + 1];
            adjacentsMap[square.getCoord().getId()] = square;
        }
    };
    MineUtils.NUM_MINES = 40;
    MineUtils.FIELD_SIZE = 20;
    return MineUtils;
}());
var MineState;
(function (MineState) {
    MineState[MineState["NONE"] = 0] = "NONE";
    MineState[MineState["ADJACENT"] = 1] = "ADJACENT";
    MineState[MineState["MINE"] = 2] = "MINE";
})(MineState || (MineState = {}));
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.getId = function () {
        return this.x + "_" + this.y;
    };
    return Point;
}());
