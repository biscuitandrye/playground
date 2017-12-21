var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MineField = /** @class */ (function (_super) {
    __extends(MineField, _super);
    function MineField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MineField.prototype.createArrayBoard = function (size) {
        var field = [];
        for (var i = 0; i < size; i++) {
            field[i] = [];
            for (var j = 0; j < size; j++) {
                field[i][j] = new MineFieldSquare(MineState.NONE, new Point(j, i));
            }
        }
        return field;
    };
    return MineField;
}(Board));
