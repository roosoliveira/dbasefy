"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InsertSqlStatement = /** @class */ (function () {
    function InsertSqlStatement(provider) {
        this.$provider = provider;
        this.$data = {};
    }
    InsertSqlStatement.prototype.into = function (tableName) {
        this.$tableName = tableName;
        return this;
    };
    InsertSqlStatement.prototype.value = function (field, value) {
        this.$data[field] = value;
        return this;
    };
    InsertSqlStatement.prototype.toStatement = function () {
        return this.$provider.insert(this.$tableName, this.$data);
    };
    return InsertSqlStatement;
}());
exports.default = InsertSqlStatement;
