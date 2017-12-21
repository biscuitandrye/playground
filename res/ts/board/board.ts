abstract class Board <T extends BoardSquare>{

    private board : T[][];
    private columns : T[][];
    private blanks : T[];
    
    constructor (private size : number) {
        this.blanks = [];
        this.reset(size);
    }

    protected reset (size : number) {
        this.board = this.createArrayBoard(size);
        this.updateBlanks();
        this.collectColumns();
    }

    protected updateBlanks () {
        this.blanks = [];
        for (var i = 0; i < this.size; i++) {
            var row = this.board[i];
            for (var j = 0; j < row.length; j++) {
                var square = row[j];
                if (square.isBlank()) {
                    this.blanks.push(square);
                }
            }
        }
    }

    private collectColumns () {
        this.columns = [];
        for (var col = 0; col < this.board.length; col++) {
            this.columns[col]=[];
            for (var row = 0; row < this.board.length; row++) {
                this.columns[col][row] = this.board[row][col];
            }
        }
    }

    abstract createArrayBoard(size: number) : T[][];

    protected getBlanks()  : T[]{
        this.updateBlanks();
        return this.blanks;
    }
    
    public hasBlanks() : boolean{
        this.updateBlanks();
        return this.blanks.length != 0;
    }

    public getRow(rowIndex : number) : T[] {
        return this.board[rowIndex];
    }

    public getColumn(colIndex: number) : T[] {
        return this.columns[colIndex];
    }

    public getSize () : number {
        return this.size;
    }

}