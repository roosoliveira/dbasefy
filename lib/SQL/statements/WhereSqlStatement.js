"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = require("ramda");
var _1 = require(".");
var WhereSqlStatement = /** @class */ (function () {
    function WhereSqlStatement(provider, builder) {
        this.$provider = provider;
        this.$builder = builder;
        this.$tempFilter = { expression: '', condition: null, value: null };
        this.$filters = [];
    }
    Object.defineProperty(WhereSqlStatement.prototype, "and", {
        get: function () {
            if (this.$tempFilter.expression)
                this.addFilter();
            return this;
        },
        enumerable: false,
        configurable: true
    });
    WhereSqlStatement.prototype.setStatementBuilder = function (builder) {
        this.$builder = builder;
        return this;
    };
    WhereSqlStatement.prototype.field = function (name) {
        this.$tempFilter.expression = name;
        return this;
    };
    WhereSqlStatement.prototype.equal = function (value) {
        this.$tempFilter.condition = _1.SqlCondition.EQUAL;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.different = function (value) {
        this.$tempFilter.condition = _1.SqlCondition.DIFFERENT;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.greaterThan = function (value) {
        this.$tempFilter.condition = _1.SqlCondition.GREATER_THAN;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.lessThan = function (value) {
        this.$tempFilter.condition = _1.SqlCondition.LESS_THAN;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.between = function (value) {
        this.$tempFilter.condition = _1.SqlCondition.BETWEEN;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.in = function (values) {
        this.$tempFilter.condition = _1.SqlCondition.IN;
        this.$tempFilter.value = values;
        return this;
    };
    WhereSqlStatement.prototype.notIn = function (values) {
        this.$tempFilter.condition = _1.SqlCondition.NOT_IN;
        this.$tempFilter.value = values;
        return this;
    };
    WhereSqlStatement.prototype.toFilter = function () {
        return {
            expression: this.$tempFilter.expression,
            condition: this.$tempFilter.condition,
            value: this.$tempFilter.value
        };
    };
    WhereSqlStatement.prototype.toStatement = function () {
        if (ramda_1.isNil(this.$builder))
            throw Error('SqlStatementBuilder must to be informed');
        this.addFilter();
        var addOn = this.$builder.toStatement();
        var whereStatement = this.$provider.where(this.$filters);
        return {
            commandText: addOn.commandText + " " + whereStatement.commandText,
            binds: ramda_1.mergeAll([addOn.binds, whereStatement.binds])
        };
    };
    WhereSqlStatement.prototype.addFilter = function () {
        this.$filters.push(this.toFilter());
        return this;
    };
    return WhereSqlStatement;
}());
exports.default = WhereSqlStatement;
//# sourceMappingURL=WhereSqlStatement.js.map