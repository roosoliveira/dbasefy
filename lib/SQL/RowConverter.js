"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowConverter = void 0;
var RowConverter = /** @class */ (function () {
    function RowConverter() {
    }
    RowConverter.prototype.convertTo = function (value) {
        var result = {};
        Object.keys(value).forEach(function (key) { return result[key] = value[key]; });
        return result;
    };
    return RowConverter;
}());
exports.RowConverter = RowConverter;
//# sourceMappingURL=RowConverter.js.map