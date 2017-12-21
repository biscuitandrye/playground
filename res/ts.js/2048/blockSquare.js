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
var BlockSquare = /** @class */ (function (_super) {
    __extends(BlockSquare, _super);
    function BlockSquare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.value = 0;
        return _this;
    }
    BlockSquare.prototype.setValue = function (newVal) {
        this.value = newVal;
    };
    BlockSquare.prototype.getValue = function () {
        return this.value;
    };
    BlockSquare.prototype.isBlank = function () {
        return this.value == 0 || this.value === undefined;
    };
    return BlockSquare;
}(BoardSquare));
