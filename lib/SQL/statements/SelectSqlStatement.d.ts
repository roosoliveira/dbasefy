import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from ".";
import WhereSqlStatement from "./WhereSqlStatement";
export default class SelectSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $fields;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(builder: SqlStatementProvider);
    field(field: string): SelectSqlStatement;
    from(tableName: string): SelectSqlStatement;
    toStatement(): SqlStatement;
}
