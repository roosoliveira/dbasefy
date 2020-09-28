"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WhereSqlStatement_1 = __importDefault(require("./WhereSqlStatement"));
var SelectSqlStatement = /** @class */ (function () {
    function SelectSqlStatement(builder) {
        this.$provider = builder;
        this.$where = new WhereSqlStatement_1.default(this.$provider, this);
        this.$fields = [];
    }
    Object.defineProperty(SelectSqlStatement.prototype, "where", {
        get: function () {
            return this.$where;
        },
        set: function (value) {
            value.setStatementBuilder(this);
            this.$where = value;
        },
        enumerable: false,
        configurable: true
    });
    SelectSqlStatement.prototype.field = function (field) {
        this.$fields.push(field);
        return this;
    };
    SelectSqlStatement.prototype.from = function (tableName) {
        this.$tableName = tableName;
        return this;
    };
    SelectSqlStatement.prototype.toStatement = function () {
        return this.$provider.select(this.$tableName, this.$fields);
    };
    return SelectSqlStatement;
}());
exports.default = SelectSqlStatement;
//# sourceMappingURL=SelectSqlStatement.js.map