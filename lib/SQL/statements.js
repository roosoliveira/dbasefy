"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectSqlStatement = exports.DeleteSqlStatement = exports.UpdateSqlStatement = exports.InsertSqlStatement = exports.WhereSqlStatement = exports.SqlCondition = void 0;
var ramda_1 = require("ramda");
var SqlCondition;
(function (SqlCondition) {
    SqlCondition[SqlCondition["EQUAL"] = 0] = "EQUAL";
    SqlCondition[SqlCondition["DIFFERENT"] = 1] = "DIFFERENT";
    SqlCondition[SqlCondition["IN"] = 2] = "IN";
})(SqlCondition = exports.SqlCondition || (exports.SqlCondition = {}));
var WhereSqlStatement = /** @class */ (function () {
    function WhereSqlStatement(provider, builder) {
        this.$provider = provider;
        this.$builder = builder;
        this.$tempFilter = { expression: '', condition: null, value: null };
        this.$filters = [];
    }
    Object.defineProperty(WhereSqlStatement.prototype, "and", {
        get: function () {
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
        this.$tempFilter.condition = SqlCondition.EQUAL;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.different = function (value) {
        this.$tempFilter.condition = SqlCondition.DIFFERENT;
        this.$tempFilter.value = value;
        return this;
    };
    WhereSqlStatement.prototype.in = function (values) {
        this.$tempFilter.condition = SqlCondition.IN;
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
exports.WhereSqlStatement = WhereSqlStatement;
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
exports.InsertSqlStatement = InsertSqlStatement;
var UpdateSqlStatement = /** @class */ (function () {
    function UpdateSqlStatement(provider) {
        this.$provider = provider;
        this.$data = {};
        this.$where = new WhereSqlStatement(provider, this);
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
exports.UpdateSqlStatement = UpdateSqlStatement;
var DeleteSqlStatement = /** @class */ (function () {
    function DeleteSqlStatement(provider) {
        this.$provider = provider;
        this.$where = new WhereSqlStatement(provider, this);
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
exports.DeleteSqlStatement = DeleteSqlStatement;
var SelectSqlStatement = /** @class */ (function () {
    function SelectSqlStatement(builder) {
        this.$provider = builder;
        this.$where = new WhereSqlStatement(this.$provider, this);
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
exports.SelectSqlStatement = SelectSqlStatement;
//# sourceMappingURL=statements.js.map