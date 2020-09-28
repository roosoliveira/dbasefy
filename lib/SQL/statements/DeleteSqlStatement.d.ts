import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.';
import WhereSqlStatement from './WhereSqlStatement';
export default class DeleteSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(provider: SqlStatementProvider);
    from(tableName: string): this;
    toStatement(): SqlStatement;
}
