var GameBoardUtils = /** @class */ (function () {
    function GameBoardUtils() {
    }
    GameBoardUtils.getImagePath = function (value) {
        if (typeof value === "undefined" || value == 0) {
            return "res/images/gray.jpg";
        }
        value = Math.log(value) / Math.log(2);
        return GameBoardUtils.IMAGE_PATHS[value - 1];
    };
    GameBoardUtils.IMAGE_PATHS = [
        "res/images/alex_cat.jpg",
        "res/images/cat_play.jpg",
        "res/images/juju_slouch.jpg",
        "res/images/sleepy-cat.jpg",
        "res/images/cats_bed.jpg",
        "res/images/cat_beer.jpg",
        "res/images/juju_bed.jpg",
    ];
    return GameBoardUtils;
}());
