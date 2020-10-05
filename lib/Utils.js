"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.delay = function (time) {
        if (time === void 0) { time = 10; }
        return new Promise(function (resolve) {
            setTimeout(resolve, time);
        });
    };
    return Util;
}());
exports.default = Util;
