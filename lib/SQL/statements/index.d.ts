import DeleteSqlStatement from './DeleteSqlStatement';
import InsertSqlStatement from './InsertSqlStatement';
import SelectSqlStatement from './SelectSqlStatement';
import UpdateSqlStatement from './UpdateSqlStatement';
import WhereSqlStatement from './WhereSqlStatement';
interface SqlStatement {
    commandText: string;
    binds?: any;
}
declare enum SqlCondition {
    EQUAL = 0,
    GREATER_THAN = 1,
    LESS_THAN = 2,
    DIFFERENT = 3,
    BETWEEN = 4,
    IN = 5,
    NOT_IN = 6
}
interface SqlFilter {
    expression: string;
    condition: SqlCondition;
    value: any;
}
interface SqlStatementProvider {
    insert(tableName: string, data: any): SqlStatement;
    update(tableName: string, data: any): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
interface SqlStatementBuilder {
    toStatement(): SqlStatement;
}
export { SqlStatementProvider, SqlStatementBuilder, SqlStatement, SqlCondition, SqlFilter, DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, UpdateSqlStatement, WhereSqlStatement, };
