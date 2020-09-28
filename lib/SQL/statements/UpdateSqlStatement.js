"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WhereSqlStatement_1 = __importDefault(require("./WhereSqlStatement"));
var UpdateSqlStatement = /** @class */ (function () {
    function UpdateSqlStatement(provider) {
        this.$provider = provider;
        this.$data = {};
        this.$where = new WhereSqlStatement_1.default(provider, this);
    }
    Object.defineProperty(UpdateSqlStatement.prototype, "where", {
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
    UpdateSqlStatement.prototype.on = function (tableName) {
        this.$tableName = tableName;
        return this;
    };
    UpdateSqlStatement.prototype.set = function (field, value) {
        this.$data[field] = value;
        return this;
    };
    UpdateSqlStatement.prototype.toStatement = function () {
        return this.$provider.update(this.$tableName, this.$data);
    };
    return UpdateSqlStatement;
}());
exports.default = UpdateSqlStatement;
//# sourceMappingURL=UpdateSqlStatement.js.map