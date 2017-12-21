class MoveInfo {
    private jammedBoard : boolean;
    private movePoints : number;

    constructor() {
        this.reset();
    }

    public isJammedBoard(): boolean {
        return this.jammedBoard;
    }

    public setJammedBoard(jammedBoard : boolean) {
        this.jammedBoard = jammedBoard;
    }
    
    public getMovePoints() : number{
        return this.movePoints;
    }

	public addMovePoints(newPoints : number) {
        this.movePoints = this.movePoints + newPoints;
    }
	
	public reset(){
        this.movePoints = 0;
        this.jammedBoard = true;
    }
}