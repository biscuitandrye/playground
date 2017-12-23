var MineFieldUI = /** @class */ (function () {
    function MineFieldUI($gameContent) {
        this.moves = 0;
        this.mineField = new MineField(MineUtils.FIELD_SIZE);
        var $gameWindow = $("<div class='game-mousesweeper-window container'></div");
        $gameContent.append($gameWindow);
        this.buildSummary($gameWindow);
        var $gameGrid = $("<div class='gameFieldGrid'></div>");
        $gameGrid.css('width', MineFieldUI.CANVAS_SIZE + 'px');
        $gameGrid.css('height', MineFieldUI.CANVAS_SIZE + 'px');
        $gameWindow.append($gameGrid);
        $gameGrid.addClass('canvas');
        this.buildField($gameGrid);
        this.addListeners();
    }
    MineFieldUI.prototype.addListeners = function () {
        var self = this;
        this.$button.click(function (event) {
            self.mineField.reset();
            self.resetFieldUI(self.getBackgroundImage());
        });
    };
    MineFieldUI.prototype.buildSummary = function ($gameWindow) {
        var $gameSummary = $("<div class = 'game-mousesweeper-summary summary'></div>");
        $gameWindow.append($gameSummary);
        $gameSummary.append("<span class='moves-label'>Moves: </span>");
        var $movesSpan = $("<span>0</span>");
        this.$move = $movesSpan;
        $gameSummary.append($movesSpan);
        var $newGameButton = $("<button class='new-game-btn btn btn-sm'>New Game</button>");
        $gameSummary.append($newGameButton);
        this.$button = $newGameButton;
    };
    MineFieldUI.prototype.getBackgroundImage = function () {
        // generate num 0-11 and get img 
        var num = Math.floor(Math.random() * 11);
        return "url('" + PlaygroundUtils.IMAGE_PATHS[num] + "')";
    };
    MineFieldUI.prototype.buildField = function ($gameGrid) {
        var self = this;
        // $gameGrid.empty();
        var backgroundImage = this.getBackgroundImage();
        var canvas = $gameGrid;
        //remove the background from canvas
        canvas.css('background-image', 'none');
        //number of columns and rows
        var col = MineUtils.FIELD_SIZE;
        var row = MineUtils.FIELD_SIZE;
        var colWidth = canvas.width() / col;
        var rowHeight = canvas.height() / row;
        //loop through the cells
        this.$mineGrid = [];
        for (var i = 0; i < row; i++) {
            this.$mineGrid[i] = [];
            for (var j = 0; j < col; j++) {
                //append new cell to canvas
                var cell = $("<div class='cell flipped'><div class='back'></div><div class='front'></div></div>")
                    .width(colWidth).height(rowHeight).appendTo(canvas);
                this.$mineGrid[i][j] = cell;
                var point = new Point(j, i);
                cell.data('coordinate', point);
                cell.attr('id', point.getId());
                cell.find('.back')
                    .css('background-image', backgroundImage)
                    .css('background-size', MineFieldUI.CANVAS_SIZE + "px " + MineFieldUI.CANVAS_SIZE + "px")
                    .css('background-position', -(j * colWidth) + 'px ' + -(i * rowHeight) + 'px');
                //register click handler for the cell
                cell.click(function () {
                    if (!self.isRevealed($(this))) {
                        $(this).toggleClass('flipped');
                        self.moves++;
                        self.$move.text(self.moves + '');
                        self.handleClick($(this));
                    }
                });
            }
        }
    };
    MineFieldUI.prototype.resetFieldUI = function (backgroundImage) {
        var cellSize = MineFieldUI.CANVAS_SIZE / MineUtils.FIELD_SIZE;
        for (var i = 0; i < this.$mineGrid.length; i++) {
            var cols = this.$mineGrid[i];
            for (var j = 0; j < cols.length; j++) {
                var $element = this.$mineGrid[i][j];
                $element.find('.back')
                    .css('background-image', backgroundImage)
                    .css('background-size', MineFieldUI.CANVAS_SIZE + "px " + MineFieldUI.CANVAS_SIZE + "px")
                    .css('background-position', -(j * cellSize) + 'px ' + -(i * cellSize) + 'px')
                    .css('opacity', '1.0');
                // flip all cells on their back and reset opacity 
                $element.removeClass('flipped').addClass('flipped');
                $element.find('.front').text('');
                $element.data(MineFieldUI.REVEALED_KEY, false);
            }
        }
    };
    MineFieldUI.prototype.handleClick = function ($square) {
        this.decorateCell($square);
        var coord = $square.data('coordinate');
        var square = this.getSquare($square);
        if (square.getState() == MineState.NONE) {
            var adjacentSquares = MineUtils.getAdjacentSquares(square, this.mineField);
            var adjacentStack = adjacentSquares.slice(0, adjacentSquares.length);
            while (adjacentStack.length != 0) {
                var pop = adjacentStack.pop();
                var adjCoord = pop.getCoord();
                var $adjCell = this.$mineGrid[adjCoord.y][adjCoord.x];
                // if (popButton.isEnabled()) {
                if (!this.isRevealed($adjCell)) {
                    this.decorateCell($adjCell);
                    if (pop.getState() == MineState.NONE) {
                        // this square's adjacents also need to get checked
                        adjacentStack = adjacentStack.concat(MineUtils.getAdjacentSquares(pop, this.mineField));
                    }
                }
                // }
            }
        }
        else if (square.getState() == MineState.MINE) {
            this.gameOver();
        }
    };
    MineFieldUI.prototype.gameOver = function () {
        var self = this;
        this.$mineGrid.forEach(function (column) {
            column.forEach(function ($element) {
                self.decorateCell($element);
            });
        });
    };
    MineFieldUI.prototype.isRevealed = function ($cell) {
        return $cell.data(MineFieldUI.REVEALED_KEY);
    };
    MineFieldUI.prototype.getSquare = function ($cell) {
        var coord = $cell.data('coordinate');
        return this.mineField.getColumn(coord.x)[coord.y];
    };
    MineFieldUI.prototype.decorateCell = function ($cell) {
        var square = this.getSquare($cell);
        if (square.getState() == MineState.MINE) {
            $cell.find('.back').css('background', 'url("res/images/mouse.jpg")')
                .css('background-size', MineFieldUI.CANVAS_SIZE / MineUtils.FIELD_SIZE + "px " + MineFieldUI.CANVAS_SIZE / MineUtils.FIELD_SIZE + "px")
                .css('opacity', '1.0');
        }
        else {
            // TODO if has image, need to put 'X' on it, means it was wrong
            if (square.getState() !== MineState.NONE) {
                $cell.find('.front').text(square.getAdjacentCount() + '');
            }
            $cell.find('.back').css('opacity', MineFieldUI.OPACITY);
        }
        $cell.data(MineFieldUI.REVEALED_KEY, true);
    };
    MineFieldUI.OPACITY = 0.4 + '';
    MineFieldUI.CANVAS_SIZE = 350;
    MineFieldUI.REVEALED_KEY = "revealed";
    return MineFieldUI;
}());
