var MoveInfo = /** @class */ (function () {
    function MoveInfo() {
        this.reset();
    }
    MoveInfo.prototype.isJammedBoard = function () {
        return this.jammedBoard;
    };
    MoveInfo.prototype.setJammedBoard = function (jammedBoard) {
        this.jammedBoard = jammedBoard;
    };
    MoveInfo.prototype.getMovePoints = function () {
        return this.movePoints;
    };
    MoveInfo.prototype.addMovePoints = function (newPoints) {
        this.movePoints = this.movePoints + newPoints;
    };
    MoveInfo.prototype.reset = function () {
        this.movePoints = 0;
        this.jammedBoard = true;
    };
    return MoveInfo;
}());
