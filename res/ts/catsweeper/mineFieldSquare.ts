class MineFieldSquare extends BoardSquare {

    private state: MineState;
    private coord: Point;
    private adjacentCount: number;

    constructor (state: MineState, coord: Point) {
        super();
        this.state = state;
        this.coord = coord;
        this.adjacentCount = state == MineState.MINE ? -1 : 0;
    }

    public getState(): MineState {
        return this.state;
    }

    public getCoord(): Point {
        return this.coord;
    }

    public isBlank(): boolean {
        return this.state == MineState.NONE;
    }

	/**
	 * Returns the number of adjacent mines.
	 * -1 if the if the square is a mine
	 * @return
	 */
    public getAdjacentCount(): number {
        return this.adjacentCount;
    }

    public increaseAdjacentCount() {
        if (this.state != MineState.MINE) {
            this.adjacentCount++;
            this.state = MineState.ADJACENT;
        }
    }

    public setState(state: MineState) {
        this.state = state;
        if (state == MineState.MINE) {
            this.adjacentCount = -1;
        }
    }
}