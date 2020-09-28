import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.';
export default class InsertSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $data;
    constructor(provider: SqlStatementProvider);
    into(tableName: string): InsertSqlStatement;
    value(field: string, value: any): InsertSqlStatement;
    toStatement(): SqlStatement;
}
