var GameInfo = /** @class */ (function () {
    function GameInfo() {
        this.totalScore = 0;
        this.totalMoves = 0;
    }
    GameInfo.prototype.getTotalMoves = function () {
        return this.totalMoves;
    };
    GameInfo.prototype.addMove = function () {
        this.totalMoves = this.totalMoves + 1;
    };
    GameInfo.prototype.getTotalScore = function () {
        return this.totalScore;
    };
    GameInfo.prototype.addToScore = function (addScore) {
        this.totalScore = addScore + this.totalScore;
    };
    GameInfo.prototype.reset = function () {
        this.totalScore = 0;
        this.totalMoves = 0;
    };
    return GameInfo;
}());
