class MoveUtils {
    /**
     * Moves the board pieces in the direction specified
     * @param board
     * @param direction
     * @return the total number of points earned
     */
    public static move(board: Game2048Board, direction: Direction, moveInfo: MoveInfo) {
        if (direction == Direction.UP || direction == Direction.DOWN) {
            // want COLUMNS
            for (var i = 0; i < board.getSize(); i++) {
                var col = board.getColumn(i);
                MoveUtils.moveDirection(col, direction == Direction.UP, moveInfo);
            }
        } else if (direction == Direction.LEFT || direction == Direction.RIGHT) {
            // want ROWS
            for (var i = 0; i < board.getSize(); i++) {
                var row = board.getRow(i);
                MoveUtils.moveDirection(row, direction == Direction.LEFT, moveInfo);
            }
        }
    }

    // TODO make private after updating test cases
    public static moveDirection(squares: BlockSquare[], up: boolean, moveInfo: MoveInfo) {
        // condense all blank squares in that direction
        MoveUtils.condenseBlanks(squares, up, moveInfo);
        if (up) {
            // want to move numbers up, start from top and check bottom that is merging with it
            for (var i = 0; i < squares.length - 1; i++) {
                var currentSquare = squares[i];
                var belowSquare = squares[i + 1];
                if (currentSquare.getValue() != 0 && currentSquare.getValue() == belowSquare.getValue()) {
                    currentSquare.setValue(currentSquare.getValue() * 2);
                    moveInfo.setJammedBoard(false);
                    moveInfo.addMovePoints(currentSquare.getValue());
                    belowSquare.setValue(0);
                    MoveUtils.moveAll(squares.slice(i + 1, squares.length), up);
                }
            }
        } else {
            // want to move numbers down, start from bottom and check top that is merging with it
            for (var i = squares.length - 1; i > 0; i--) {
                var currentSquare = squares[i];
                var topSquare = squares[i - 1];
                if (currentSquare.getValue() != 0 && currentSquare.getValue() == topSquare.getValue()) {
                    currentSquare.setValue(currentSquare.getValue() * 2);
                    moveInfo.setJammedBoard(false);
                    moveInfo.addMovePoints(currentSquare.getValue());
                    topSquare.setValue(0);
                    MoveUtils.moveAll(squares.slice(0, i), up);
                }
            }
        }
    }

    public static condenseBlanks(squares: BlockSquare[], up: boolean, moveInfo: MoveInfo) {
        if (squares.length > 1) {
            if (up) {
                var prevSquareIndex: number = -1;
                for (var i = 0; i < squares.length; i++) {
                    // move each square farthest up that you can
                    var currentSquare = squares[i];
                    while (prevSquareIndex != -1 && squares[prevSquareIndex].getValue() == 0) {
                        // previous square is blank, move up
                        if (currentSquare.getValue() != 0) {
                            // only counts as a relevant shift if youre moving a non zero block
                            moveInfo.setJammedBoard(false);
                        }
                        squares[prevSquareIndex].setValue(currentSquare.getValue());
                        currentSquare.setValue(0);
                        // update where your current square is, and move the previous index up one
                        currentSquare = squares[prevSquareIndex];
                        prevSquareIndex = prevSquareIndex - 1;
                    }
                    prevSquareIndex = i; // update previous square index
                }
            } else {
                // down
                var prevSquareIndex = squares.length;
                for (var i = squares.length - 1; i >= 0; i--) {
                    // move each square farthest down that you can
                    var currentSquare = squares[i];
                    while (prevSquareIndex != squares.length && squares[prevSquareIndex].getValue() == 0) {
                        // previous square is blank, move down
                        if (currentSquare.getValue() != 0) {
                            // only counts as a relevant shift if youre moving a non zero block
                            moveInfo.setJammedBoard(false);
                        }
                        squares[prevSquareIndex].setValue(currentSquare.getValue());
                        currentSquare.setValue(0);
                        // update where your current square is, and move the previous index down one
                        currentSquare = squares[prevSquareIndex];
                        prevSquareIndex = prevSquareIndex + 1;
                    }
                    prevSquareIndex = i; // update previous square index
                }
            }
        }
    }


    private static moveAll(squares: BlockSquare[], up: boolean) {
        if (up) {
            // start from top
            var firstSquare = squares[0];
            if (firstSquare.getValue() == 0) {
                for (var i = 0; i < squares.length - 1; i++) {
                    var currentSquare = squares[i];
                    var bottomSquare = squares[i + 1];
                    currentSquare.setValue(bottomSquare.getValue());
                    bottomSquare.setValue(0);
                }
            }
        } else {
            // start from bottom
            var bottomSquare = squares[squares.length - 1];
            if (bottomSquare.getValue() == 0) {
                for (var i = squares.length - 1; i > 0; i--) {
                    var currentSquare = squares[i];
                    var topSquare = squares[i - 1];
                    currentSquare.setValue(topSquare.getValue());
                    topSquare.setValue(0);
                }
            }
        }
    }
}