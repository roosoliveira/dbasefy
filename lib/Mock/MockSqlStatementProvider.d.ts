import { SqlFilter, SqlStatement, SqlStatementProvider } from '../SQL/statements';
export declare class MockSqlStatementProvider implements SqlStatementProvider {
    insert(tableName: string, data: any): SqlStatement;
    update(tableName: string, data: any): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
