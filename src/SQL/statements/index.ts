import DeleteSqlStatement from './DeleteSqlStatement'
import InsertSqlStatement from './InsertSqlStatement'
import SelectSqlStatement from './SelectSqlStatement'
import UpdateSqlStatement from './UpdateSqlStatement'
import WhereSqlStatement from './WhereSqlStatement'

interface SqlStatement {
    commandText: string
    binds?: any
}

enum SqlCondition {
    EQUAL,
    GREATER_THAN,
    LESS_THAN,
    DIFFERENT,
    BETWEEN,
    IN,
    NOT_IN,
}

interface SqlFilter {
    expression: string
    condition: SqlCondition
    value: any
}

interface SqlStatementProvider {
    insert(tableName: string, data: any): SqlStatement
    update(tableName: string, data: any): SqlStatement
    delete(tableName: string): SqlStatement
    select(tableName: string, fields: string[]): SqlStatement
    where(filters: SqlFilter[]): SqlStatement
}

interface SqlStatementBuilder {
    toStatement(): SqlStatement
}

export {
    SqlStatementProvider,
    SqlStatementBuilder,
    SqlStatement,
    SqlCondition,
    SqlFilter,
    DeleteSqlStatement,
    InsertSqlStatement,
    SelectSqlStatement,
    UpdateSqlStatement,
    WhereSqlStatement,
}