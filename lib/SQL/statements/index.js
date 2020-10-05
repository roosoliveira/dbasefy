"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhereSqlStatement = exports.UpdateSqlStatement = exports.SelectSqlStatement = exports.InsertSqlStatement = exports.DeleteSqlStatement = exports.SqlCondition = void 0;
var DeleteSqlStatement_1 = __importDefault(require("./DeleteSqlStatement"));
exports.DeleteSqlStatement = DeleteSqlStatement_1.default;
var InsertSqlStatement_1 = __importDefault(require("./InsertSqlStatement"));
exports.InsertSqlStatement = InsertSqlStatement_1.default;
var SelectSqlStatement_1 = __importDefault(require("./SelectSqlStatement"));
exports.SelectSqlStatement = SelectSqlStatement_1.default;
var UpdateSqlStatement_1 = __importDefault(require("./UpdateSqlStatement"));
exports.UpdateSqlStatement = UpdateSqlStatement_1.default;
var WhereSqlStatement_1 = __importDefault(require("./WhereSqlStatement"));
exports.WhereSqlStatement = WhereSqlStatement_1.default;
var SqlCondition;
(function (SqlCondition) {
    SqlCondition[SqlCondition["EQUAL"] = 0] = "EQUAL";
    SqlCondition[SqlCondition["GREATER_THAN"] = 1] = "GREATER_THAN";
    SqlCondition[SqlCondition["LESS_THAN"] = 2] = "LESS_THAN";
    SqlCondition[SqlCondition["DIFFERENT"] = 3] = "DIFFERENT";
    SqlCondition[SqlCondition["BETWEEN"] = 4] = "BETWEEN";
    SqlCondition[SqlCondition["IN"] = 5] = "IN";
    SqlCondition[SqlCondition["NOT_IN"] = 6] = "NOT_IN";
})(SqlCondition || (SqlCondition = {}));
exports.SqlCondition = SqlCondition;
