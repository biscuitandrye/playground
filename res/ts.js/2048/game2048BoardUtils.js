var Game2048BoardUtils = /** @class */ (function () {
    function Game2048BoardUtils() {
    }
    Game2048BoardUtils.getImagePath = function (value) {
        if (typeof value === "undefined" || value == 0) {
            return "res/images/gray.jpg";
            // return "";
        }
        value = Math.log(value) / Math.log(2);
        return PlaygroundUtils.IMAGE_PATHS[value - 1];
    };
    return Game2048BoardUtils;
}());
