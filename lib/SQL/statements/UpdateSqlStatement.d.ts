import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.';
import WhereSqlStatement from './WhereSqlStatement';
export default class UpdateSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $data;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(provider: SqlStatementProvider);
    on(tableName: string): UpdateSqlStatement;
    set(field: string, value: any): UpdateSqlStatement;
    toStatement(): SqlStatement;
}
