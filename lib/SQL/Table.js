"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var statements_1 = require("./statements");
var Table = /** @class */ (function () {
    function Table(provider) {
        this.$provider = provider;
    }
    Table.prototype.insert = function () {
        var _this = this;
        var insert = new statements_1.InsertSqlStatement(this.$provider);
        insert.into(this.getTableName());
        this.getFields().forEach(function (k) { return insert.value(k, _this[k]); });
        return insert;
    };
    Table.prototype.update = function () {
        var _this = this;
        var update = new statements_1.UpdateSqlStatement(this.$provider);
        update.on(this.getTableName());
        this.getFields().forEach(function (k) { return update.set(k, _this[k]); });
        return update;
    };
    Table.prototype.delete = function () {
        var del = new statements_1.DeleteSqlStatement(this.$provider);
        del.from(this.getTableName());
        return del;
    };
    Table.prototype.select = function () {
        var select = new statements_1.SelectSqlStatement(this.$provider);
        select.from(this.getTableName());
        this.getFields().forEach(function (k) { return select.field(k); });
        return select;
    };
    Table.prototype.getFields = function () {
        return Object.keys(this).filter(function (k) { return ramda_1.not(k.includes('$')); });
    };
    return Table;
}());
exports.default = Table;
//# sourceMappingURL=Table.js.map