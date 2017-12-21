var GameFieldUI = /** @class */ (function () {
    function GameFieldUI($gameContent) {
        var $gameGrid = $("<div class='gameFieldGrid'></div>");
        $gameContent.append($gameGrid);
        $gameGrid.addClass('canvas container');
        this.mineField = new MineField(MineUtils.FIELD_SIZE);
        this.buildField($gameGrid);
    }
    GameFieldUI.prototype.buildField = function ($gameGrid) {
        var self = this;
        // var canvas = $('div.canvas');
        var canvas = $gameGrid;
        var backgroundImage = canvas.css('background-image');
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
                cell.data('coordinate', new Point(j, i));
                cell.find('.back')
                    .css('background', backgroundImage)
                    .css('background-size', '350px 350px')
                    .css('background-position', -(j * colWidth) + 'px ' + -(i * rowHeight) + 'px');
                //register click handler for the cell
                cell.click(function () {
                    if ($(this).css('opacity') !== '0.5') {
                        $(this).toggleClass('flipped');
                        $(this).css('opacity', '0.5');
                        self.handleClick();
                    }
                });
            }
        }
    };
    GameFieldUI.prototype.handleClick = function (square) {
        showButton(squareButton);
        if (square.getState() == MineState.NONE) {
            var adjacentSquares = MineUtils.getAdjacentSquares(square, this.mineField);
            var adjacentStack = adjacentSquares.slice(0, adjacentSquares.length);
            while (adjacentStack.length != 0) {
                var pop = adjacentStack.pop();
                Button;
                popButton = squareToButton.get(pop);
                if (popButton.isEnabled()) {
                    if (popButton.getImage() == null) {
                        showButton(popButton);
                        if (pop.getState() == MineState.NONE) {
                            // this square's adjacents also need to get checked
                            adjacentStack = adjacentStack.concat(MineUtils.getAdjacentSquares(pop, this.mineField));
                        }
                    }
                }
            }
        }
        else if (square.getState() == MineState.MINE) {
            gameOver();
        }
    };
    return GameFieldUI;
}());
