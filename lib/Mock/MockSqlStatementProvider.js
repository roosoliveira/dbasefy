"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockSqlStatementProvider = void 0;
var ramda_1 = require("ramda");
var statements_1 = require("../SQL/statements");
var commaJoin = ramda_1.join(', ');
var toBindName = function (field) { return ':' + field; };
var MockSqlStatementProvider = /** @class */ (function () {
    function MockSqlStatementProvider() {
    }
    MockSqlStatementProvider.prototype.insert = function (tableName, data) {
        var template = "INSERT INTO " + tableName + " (%FIELDS%) VALUES (%VALUES%)";
        var fields = Object.keys(data);
        var values = fields.map(toBindName);
        var binds = ramda_1.mergeAll(fields.map(function (field) {
            var _a;
            return (_a = {}, _a[field] = data[field], _a);
        }));
        var commandText = template
            .replace(/%FIELDS%/g, commaJoin(fields))
            .replace(/%VALUES%/g, commaJoin(values));
        return { commandText: commandText, binds: binds };
    };
    MockSqlStatementProvider.prototype.update = function (tableName, data) {
        var template = "UPDATE " + tableName + " SET %VALUES%";
        var fields = Object.keys(data);
        var values = fields.map(toValues);
        var commandText = template.replace(/%VALUES%/g, commaJoin(values));
        var binds = ramda_1.mergeAll(fields.map(function (field) {
            var _a;
            return (_a = {}, _a[field] = data[field], _a);
        }));
        return { commandText: commandText, binds: binds };
        function toValues(field) {
            return field + " = " + toBindName(field);
        }
    };
    MockSqlStatementProvider.prototype.delete = function (tableName) {
        var commandText = "DELETE FROM " + tableName;
        return { commandText: commandText, binds: {} };
    };
    MockSqlStatementProvider.prototype.select = function (tableName, fields) {
        var template = "SELECT %FIELDS% FROM " + tableName;
        var commandText = template.replace(/%FIELDS%/g, commaJoin(fields));
        return { commandText: commandText, binds: {} };
    };
    MockSqlStatementProvider.prototype.where = function (filters) {
        var template = "WHERE 1=1 AND %FILTERS%";
        var whereFilters = filters.map(simplify).map(toExpression).join(' AND ');
        var binds = ramda_1.mergeAll(filters.map(simplify).map(onlyBinds));
        var commandText = template.replace(/%FILTERS%/g, whereFilters);
        return { commandText: commandText, binds: binds };
        function simplify(filter, index) {
            return {
                expression: filter.expression,
                condition: getConditionSql(filter),
                statement: toBinds(filter, index)
            };
        }
        function toExpression(simplifiedFilter) {
            return simplifiedFilter.expression + " " + simplifiedFilter.condition + " " + simplifiedFilter.statement.commandText;
        }
        function getConditionSql(filter) {
            switch (filter.condition) {
                case statements_1.SqlCondition.EQUAL: return '=';
                case statements_1.SqlCondition.DIFFERENT: return '!=';
                case statements_1.SqlCondition.IN: return 'IN';
            }
        }
        function toBinds(filter, indexFilter) {
            var commandText = '';
            var binds = {};
            switch (filter.condition) {
                case statements_1.SqlCondition.EQUAL:
                case statements_1.SqlCondition.DIFFERENT:
                    commandText = toBindName('FILTER_' + indexFilter + '_0');
                    binds[commandText.replace(':', '')] = filter.value;
                    break;
                case statements_1.SqlCondition.IN:
                    var bindNames = filter.value.map(function (value, index) {
                        var key = toBindName('FILTER_' + indexFilter + '_' + index);
                        binds[key.replace(':', '')] = value;
                        return key;
                    });
                    commandText = "(" + commaJoin(bindNames) + ")";
                    break;
            }
            return { commandText: commandText, binds: binds };
        }
        function onlyBinds(filter) {
            return filter.statement.binds;
        }
    };
    return MockSqlStatementProvider;
}());
exports.MockSqlStatementProvider = MockSqlStatementProvider;
//# sourceMappingURL=MockSqlStatementProvider.js.map