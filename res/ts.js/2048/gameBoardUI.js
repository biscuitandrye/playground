var GameBoardUI = /** @class */ (function () {
    function GameBoardUI($gameContent) {
        this.gridBoardModel = new GameBoard(4);
        var $gameWindow = $("<div class='game-2048-window container'></div");
        $gameContent.append($gameWindow);
        this.buildSummary($gameWindow);
        var $gameBoard = $("<div class='game-2048-board'></div>");
        $gameWindow.append($gameBoard);
        this.buildBoard($gameBoard);
        // add listeners
        this.addListeners();
        this.refreshBoard();
    }
    GameBoardUI.prototype.reset = function () {
        this.$move.text("0");
        this.$score.text("0");
    };
    GameBoardUI.prototype.addListeners = function () {
        var self = this;
        $(document).keyup(function (event) {
            // only respond to up, down, left, right
            var direction = null;
            switch (event.which) {
                case 37:
                    direction = Direction.LEFT;
                    break;
                case 38:
                    direction = Direction.UP;
                    break;
                case 39:
                    direction = Direction.RIGHT;
                    break;
                case 40:
                    direction = Direction.DOWN;
                    break;
            }
            if (direction !== null) {
                self.gridBoardModel.moveBoard(direction);
                self.refreshBoard();
            }
        }.bind(this));
    };
    GameBoardUI.prototype.buildSummary = function ($gameWindow) {
        var $gameSummary = $("<div class = 'game-2048-summary'></div>");
        $gameWindow.append($gameSummary);
        $gameSummary.append("<span class='scores-label'>Score: </span>");
        var $scoreSpan = $("<span>0</span>");
        this.$score = $scoreSpan;
        $gameSummary.append($scoreSpan);
        $gameSummary.append("<span class='moves-label'>Moves: </span>");
        var $movesSpan = $("<span>0</span>");
        this.$move = $movesSpan;
        $gameSummary.append($movesSpan);
        var $newGameButton = $("<button class='new-game-btn btn btn-sm'>New Game</button>");
        $gameSummary.append($newGameButton);
    };
    GameBoardUI.prototype.buildBoard = function ($gameBoardContainer) {
        this.$grid = [];
        var $gameTable = $("<div class='game-2048-table'></div>");
        $gameBoardContainer.append($gameTable);
        for (var i = 0; i < 4; i++) {
            this.$grid[i] = [];
            var $row = $("<div class='game-2048-table-row'></div>");
            for (var j = 0; j < 4; j++) {
                var $cell = $("<div class='game-2048-table-cell'></div>");
                $row.append($cell);
                this.$grid[i][j] = $cell;
            }
            $gameTable.append($row);
        }
        /*
        var $row = $("<div class='row'></div>");
        $gameBoardContainer.append($row);
        for (var i=0;i<4;i++){
            this.$grid[i]=[];
            for (var j=0;j<4;j++) {
                var $cell = $("<div class='col-xs-3 game-2048-table-cell'></div>");
                // var $img = $("<img/>");
                // $cell.append($img);
                $row.append($cell);
                this.$grid[i][j]=$cell;
            }
        }
        */
    };
    GameBoardUI.prototype.refreshBoard = function () {
        var board = this.gridBoardModel;
        for (var i = 0; i < board.getSize(); i++) {
            // var col = board.getColumn(i);
            var col = board.getRow(i);
            for (var j = 0; j < col.length; j++) {
                var square = col[j];
                var value = square.getValue();
                this.setElementOnCell(this.$grid[i][j], GameBoardUtils.getImagePath(value));
                // this.$grid[i][j].text(value ? value+'' : ' ');
            }
        }
        // refresh score
        this.$score.text(this.gridBoardModel.getGameInfo().getTotalScore() + '');
        this.$move.text(this.gridBoardModel.getGameInfo().getTotalMoves() + '');
    };
    GameBoardUI.prototype.setElementOnCell = function ($ele, imgPath) {
        $ele.empty();
        if (imgPath === "") {
            $ele.addClass('empty-cell');
            $ele.removeClass("thumbnail");
        }
        else {
            $ele.removeClass('empty-cell');
            $ele.addClass("thumbnail");
            var $img = $("<img/>");
            $img.attr('src', imgPath);
            $ele.append($img);
        }
    };
    return GameBoardUI;
}());
