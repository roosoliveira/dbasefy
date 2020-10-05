"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTable = void 0;
var SQL_1 = require("../SQL");
var MockTable = /** @class */ (function (_super) {
    __extends(MockTable, _super);
    function MockTable(provider) {
        var _this = _super.call(this, provider) || this;
        _this.ID = null;
        _this.TEXT = null;
        return _this;
    }
    MockTable.prototype.getTableName = function () {
        return 'MOCK_TABLE';
    };
    return MockTable;
}(SQL_1.Table));
exports.MockTable = MockTable;
