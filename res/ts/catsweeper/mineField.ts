class MineField extends Board<MineFieldSquare> {

    public createArrayBoard(size: number): MineFieldSquare[][] {
        var field = [];
        for (var i = 0; i < size; i++) {
            field[i] =[];
            for (var j = 0; j < size; j++) {
                field[i][j] = new MineFieldSquare(MineState.NONE, new Point(j, i));
            }
        }
        return field;
    }

    public reset() {
        super.reset();
        MineUtils.generateMinesForField(this, MineUtils.NUM_MINES);
    }

}