"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
var RowConverter_1 = require("./RowConverter");
var statements_1 = require("./statements");
var Crud = /** @class */ (function () {
    function Crud(conn, tableName) {
        this.$conn = conn;
        this.$provider = conn.createSqlStatementProvider();
        this.$tableName = tableName;
    }
    Crud.prototype.insert = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var insert;
            return __generator(this, function (_a) {
                insert = new statements_1.InsertSqlStatement(this.$provider).into(this.$tableName);
                Object.keys(row).forEach(function (key) { return insert.value(key, row[key]); });
                this.executeCommand(insert);
                return [2 /*return*/];
            });
        });
    };
    Crud.prototype.update = function (row, where) {
        return __awaiter(this, void 0, void 0, function () {
            var update;
            return __generator(this, function (_a) {
                update = new statements_1.UpdateSqlStatement(this.$provider).on(this.$tableName);
                Object.keys(row).forEach(function (key) { return update.set(key, row[key]); });
                this.executeCommand(update.where = where);
                return [2 /*return*/];
            });
        });
    };
    Crud.prototype.delete = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var del;
            return __generator(this, function (_a) {
                del = new statements_1.DeleteSqlStatement(this.$provider).from(this.$tableName);
                this.executeCommand(del.where = where);
                return [2 /*return*/];
            });
        });
    };
    Crud.prototype.fetch = function (where) {
        return __awaiter(this, void 0, void 0, function () {
            var select, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        select = new statements_1.SelectSqlStatement(this.$provider)
                            .field('*')
                            .from(this.$tableName)
                            .where = where;
                        return [4 /*yield*/, this.$conn
                                .createQuery(select.toStatement())
                                .execute()];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/, rows.map(function (row) { return row.convertTo(RowConverter_1.RowConverter); })];
                }
            });
        });
    };
    Crud.prototype.executeCommand = function (builder) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.$conn
                            .createCommand(builder.toStatement())
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Crud.prototype.where = function () {
        return new statements_1.WhereSqlStatement(this.$provider);
    };
    return Crud;
}());
exports.Crud = Crud;
//# sourceMappingURL=Crud.js.map