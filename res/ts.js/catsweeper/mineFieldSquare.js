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
var MineFieldSquare = /** @class */ (function (_super) {
    __extends(MineFieldSquare, _super);
    function MineFieldSquare(state, coord) {
        var _this = _super.call(this) || this;
        _this.state = state;
        _this.coord = coord;
        _this.adjacentCount = state == MineState.MINE ? -1 : 0;
        return _this;
    }
    MineFieldSquare.prototype.getState = function () {
        return this.state;
    };
    MineFieldSquare.prototype.getCoord = function () {
        return this.coord;
    };
    MineFieldSquare.prototype.isBlank = function () {
        return this.state == MineState.NONE;
    };
    /**
     * Returns the number of adjacent mines.
     * -1 if the if the square is a mine
     * @return
     */
    MineFieldSquare.prototype.getAdjacentCount = function () {
        return this.adjacentCount;
    };
    MineFieldSquare.prototype.increaseAdjacentCount = function () {
        if (this.state != MineState.MINE) {
            this.adjacentCount++;
            this.state = MineState.ADJACENT;
        }
    };
    MineFieldSquare.prototype.setState = function (state) {
        this.state = state;
        if (state == MineState.MINE) {
            this.adjacentCount = -1;
        }
    };
    return MineFieldSquare;
}(BoardSquare));
