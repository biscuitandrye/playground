class GameInfo {

    private totalScore: number = 0;
    private totalMoves: number = 0;

    public getTotalMoves(): number {
        return this.totalMoves;
    }

    public addMove() {
        this.totalMoves = this.totalMoves + 1;
    }

    public getTotalScore(): number {
        return this.totalScore;
    }

    public addToScore(addScore: number) {
        this.totalScore = addScore + this.totalScore;
    }

    public reset() {
        this.totalScore = 0;
        this.totalMoves = 0;
    }
}