var GameFieldUI = /** @class */ (function () {
    function GameFieldUI($gameContent) {
        var $gameGrid = $("<div class='gameFieldGrid'></div>");
        $gameContent.append($gameGrid);
        $gameGrid.addClass('canvas container');
        this.buildField($gameGrid);
    }
    GameFieldUI.prototype.buildField = function ($gameGrid) {
        // var canvas = $('div.canvas');
        var canvas = $gameGrid;
        var backgroundImage = canvas.css('background-image');
        //remove the background from canvas
        canvas.css('background-image', 'none');
        //number of columns and rows
        var col = 20;
        var row = 20;
        var colWidth = canvas.width() / col;
        var rowHeight = canvas.height() / row;
        //loop through the cells
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                //append new cell to canvas
                var cell = $("<div class='cell flipped'><div class='back'></div><div class='front'></div></div>")
                    .width(colWidth).height(rowHeight).appendTo(canvas);
                cell.find('.back')
                    .css('background', backgroundImage)
                    .css('background-size', '350px 350px')
                    .css('background-position', -(j * colWidth) + 'px ' + -(i * rowHeight) + 'px');
                //set the background for the cell
                //note that calculate the em unit for more flexible
                //font-size
                // cell.find('.front')
                //     .css('background', backgroundImage)
                //     .css('background-position', -(j * colWidth) + 'px ' + -(i * rowHeight) + 'px')
                //     .css('opacity', '0.5');
                //register click handler for the cell
                cell.click(function () {
                    if ($(this).css('opacity') !== '0.5') {
                        $(this).toggleClass('flipped');
                        $(this).css('opacity', '0.5');
                    }
                });
            }
        }
    };
    return GameFieldUI;
}());
