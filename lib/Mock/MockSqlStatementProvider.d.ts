import { SqlFilter, SqlStatement, SqlStatementProvider, Variant } from '../SQL/statements';
export declare class MockSqlStatementProvider implements SqlStatementProvider {
    insert(tableName: string, data: Variant): SqlStatement;
    update(tableName: string, data: Variant): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
