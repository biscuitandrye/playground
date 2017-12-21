class GameBoard extends Board<BlockSquare>{

    private moveInfo: MoveInfo;
    private gameInfo: GameInfo;

    constructor (size: number) {
        super(size);
        this.moveInfo = new MoveInfo();
        this.gameInfo = new GameInfo();
    }
    /**
         * Moves the board in the direction desired and returns information about the move
         * @param direction
         * @return
         */
    public moveBoard(direction: Direction): MoveInfo {
        // move board and add random new one
        this.moveInfo.reset();
        MoveUtils.move(this, direction, this.moveInfo);
        if (!this.moveInfo.isJammedBoard()) {
            this.genNew(true);
            this.gameInfo.addMove();
        }
        this.gameInfo.addToScore(this.moveInfo.getMovePoints());
        return this.moveInfo;
    }

    /**
     * Generates 2 random squares
     */
    public reset() {
        super.reset();
        if (this.gameInfo != null) {
            this.gameInfo.reset();
        }
        this.genNew(false);
        this.genNew(false);
    }

    public getGameInfo(): GameInfo {
        return this.gameInfo;
    }

	/**
	 * Generates a new number on the board and places it in a blank location. 
	 * The new number is random (tied to a probability of it being one number over another) and location is random.
	 */
    public genNew(useProb: boolean) {
        // go through current blanks and pick one to add the gen number
        this.updateBlanks();
        if (this.getBlanks().length != 0) {
            var lengthBlanks = this.getBlanks().length;
            var fillIndex = Math.floor(Math.random() * lengthBlanks);
            var randSquare = this.getBlanks()[fillIndex];
            randSquare.setValue((Math.random() > GameUtils.GEN_NUM_1_PROB && useProb) ? GameUtils.GEN_NUM_2 : GameUtils.GEN_NUM_1);
            this.updateBlanks();
        }
    }


    public createArrayBoard(size: number): BlockSquare[][] {
        var board = [];
        for (var i = 0; i < size; i++) {
            board[i] = [];
            for (var j = 0; j < size; j++) {
                var newSquare = new BlockSquare();
                board[i][j] = newSquare;
            }
        }
        return board;
    }

}