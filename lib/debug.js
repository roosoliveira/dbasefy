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
var _1 = require(".");
var MockConnection_1 = require("./Mock/MockConnection");
var statements_1 = require("./SQL/statements");
// DB.session(MockConnection, async (conn: MockConnection) => {
//     const select = new SelectSqlStatement(conn.createSqlStatementProvider())
//     const statement = select
//         .field('ID')
//         .field('TEXT')
//         .from('TEST_TABLE')
//         .where.field('ID').equal(10)
//         .and.field('TEXT').different('Test')
//         .toStatement()
//     console.log(statement)
//     const rows = await conn.createQuery(statement).execute()
// })
// DB.session(MockConnection, async (conn: MockConnection) => {
//     const insert = new InsertSqlStatement(conn.createSqlStatementProvider())
//     const statement = insert
//         .into('TEST_TABLE')
//         .value('ID', 10)
//         .value('TEXT', 'Test')
//         .toStatement()
//     console.log(statement)
//     /*
//     { 
//         commandText: 'INSERT INTO TEST_TABLE (ID, TEXT) VALUES (:ID, :TEXT)',
//         binds: { ID: 10, TEXT: 'Test' } 
//     }
//      */
//     const rows = await conn.createQuery(statement).execute()
// })
// DB.session(MockConnection, async (conn: MockConnection) => {
//     const update = new UpdateSqlStatement(conn.createSqlStatementProvider())
//     const statement = update
//         .on('TEST_TABLE')
//         .set('TEXT', 'Test')
//         .where.field('ID').equal(10)
//         .toStatement()
//     console.log(statement)
//     /*
//     { 
//         commandText: 'UPDATE TEST_TABLE SET TEXT = :TEXT WHERE 1=1 AND ID = :FILTER_0_0',
//         binds: { TEXT: 'Test', FILTER_0_0: 10 } 
//     }
//      */
//     const rows = await conn.createQuery(statement).execute()
// })
_1.DB.session(MockConnection_1.MockConnection, function (conn) { return __awaiter(void 0, void 0, void 0, function () {
    var del, statement, rows;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                del = new statements_1.DeleteSqlStatement(conn.createSqlStatementProvider());
                statement = del
                    .from('TEST_TABLE')
                    .where.field('ID').equal(10)
                    .toStatement();
                console.log(statement);
                return [4 /*yield*/, conn.createQuery(statement).execute()];
            case 1:
                rows = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=debug.js.map