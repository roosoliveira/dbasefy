"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MockConnection_1 = require("./Mock/MockConnection");
var statements_1 = require("./SQL/statements");
var conn = new MockConnection_1.MockConnection();
var select = new statements_1.SelectSqlStatement(conn.createSqlStatementProvider());
var statement = select
    .field('ID')
    .field('TEXT')
    .from('TEST_TABLE')
    .where.field('ID').equal(10)
    .and.field('TEXT').different('Test')
    .toStatement();
console.log(statement.commandText);
//# sourceMappingURL=debug.js.map