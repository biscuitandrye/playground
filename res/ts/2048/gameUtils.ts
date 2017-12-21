class GameUtils {
    /*
	 * These are the randomly generated numbers 
	 * and the probability of one or the other.
	 */
    public static GEN_NUM_1: number = 2;
    public static GEN_NUM_2: number = 4;
    public static GEN_NUM_1_PROB: number = 0.9;

    public static isGameOver(board: GameBoard): boolean {
        // game is over when there are no more blanks and when there are no more squares to be merged
        var over = !board.hasBlanks();
        if (over) {
            for (var i = 0; i < board.getSize(); i++) {
                var row = board.getRow(i);
                var col = board.getColumn(i);
                for (var j = 0; j < row.length - 1; j++) {
                    var current = row[j];
                    var next = row[j + 1];
                    if (current.getValue() == next.getValue()) {
                        return false;
                    }
                    current = col[j];
                    next = col[j + 1];
                    if (current.getValue() == next.getValue()) {
                        return false;
                    }
                }
            }
        }
        return over;
    }
}