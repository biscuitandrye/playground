class Game2048BoardUtils {
    public static getImagePath (value : number) : string {
        if (typeof value === "undefined" || value == 0) {
            return "res/images/gray.jpg";
            // return "";
        }
        value = Math.log(value)/Math.log(2);
        return PlaygroundUtils.IMAGE_PATHS[value-1];
    }
}