import { DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, SqlStatementProvider, UpdateSqlStatement } from './statements';
export default abstract class Table {
    private $provider;
    constructor(provider: SqlStatementProvider);
    abstract getTableName(): string;
    insert(): InsertSqlStatement;
    update(): UpdateSqlStatement;
    delete(): DeleteSqlStatement;
    select(): SelectSqlStatement;
    getFields(): string[];
}
