"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WhereSqlStatement_1 = __importDefault(require("./WhereSqlStatement"));
var DeleteSqlStatement = /** @class */ (function () {
    function DeleteSqlStatement(provider) {
        this.$provider = provider;
        this.$where = new WhereSqlStatement_1.default(provider, this);
    }
    Object.defineProperty(DeleteSqlStatement.prototype, "where", {
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
    DeleteSqlStatement.prototype.from = function (tableName) {
        this.$tableName = tableName;
        return this;
    };
    DeleteSqlStatement.prototype.toStatement = function () {
        return this.$provider.delete(this.$tableName);
    };
    return DeleteSqlStatement;
}());
exports.default = DeleteSqlStatement;
//# sourceMappingURL=DeleteSqlStatement.js.map