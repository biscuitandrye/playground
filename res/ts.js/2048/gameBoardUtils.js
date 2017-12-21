var Game2048BoardUtils = /** @class */ (function () {
    function Game2048BoardUtils() {
    }
    Game2048BoardUtils.getImagePath = function (value) {
        if (typeof value === "undefined" || value == 0) {
            return "res/images/gray.jpg";
            // return "";
        }
        value = Math.log(value) / Math.log(2);
        return Game2048BoardUtils.IMAGE_PATHS[value - 1];
    };
    Game2048BoardUtils.IMAGE_PATHS = [
        "res/images/alex_cat.jpg",
        "res/images/cat_play.jpg",
        "res/images/juju_slouch.jpg",
        "res/images/sleepy-cat.jpg",
        "res/images/astro_cat.jpg",
        "res/images/cats_bed.jpg",
        "res/images/cat_alex_head.jpg",
        "res/images/cat_grass.jpg",
        "res/images/cat_nap.jpg",
        "res/images/cat_beer.jpg",
        "res/images/cat_xmas.jpg"
    ];
    return Game2048BoardUtils;
}());
