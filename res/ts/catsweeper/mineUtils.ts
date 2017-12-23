class MineUtils {

    public static NUM_MINES = 10;
    public static FIELD_SIZE = 10;

    public static generateMinesForField(field: MineField, numMines: number) {
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
    }

    public static getAdjacentSquares(square: MineFieldSquare, field: MineField): MineFieldSquare[] {
        var size = field.getSize();
        var coord = square.getCoord();
        var x = coord.x;
        var y = coord.y;
        var canCheckLeft = x != 0;
        var canCheckAbove = y != 0;
        var canCheckRight = x != size - 1;
        var canCheckBelow = y != size - 1;
        var adjacentMap = {};
        var row: MineFieldSquare[];
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
                if (adjacentMap[key] !== null) {
                    adjacents.push(adjacentMap[key]);
                }
            }
        }
        return adjacents;
    }

    private static generateMines(size: number, numMines: number): Point[] {
        var minesMap = {};

        var i = numMines;

        while (i > 0) {
            var x = Math.floor(Math.random() * size);
            var y = Math.floor(Math.random() * size);

            var pt = new Point(x, y);
            while (minesMap[pt.getId()]) {
                y = Math.floor(Math.random() * size);;
                pt.y = y;
            }
            minesMap[pt.getId()]=pt;
            i--;
        }
        var mines = [];
        for (var key in minesMap) {
            if (minesMap.hasOwnProperty(key)) {
                mines.push(minesMap[key]);
            }
        }
        return mines;
    }

    private static getRangeSquares(
        row: MineFieldSquare[],
        x: number,
        canCheckLeft: boolean,
        canCheckRight: boolean,
        adjacentsMap : {}
    ) {
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
    }
}

enum MineState {
    NONE, ADJACENT, MINE
}

class Point {
    constructor(public x: number, public y: number) {

    }

    public getId() : string {
        return this.x + "_" + this.y;
    }
}