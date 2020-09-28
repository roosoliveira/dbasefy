import { Command, Connection, Query } from '..';
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from '../SQL';
import { SqlStatement, SqlStatementProvider } from '../SQL/statements';
export interface MockConfig {
    user: string;
    password: string;
}
export interface MockItemDesc {
    description: string;
}
export declare class MockCommand implements SqlCommand {
    commandText: string;
    binds: any;
    execute(): Promise<void>;
}
export declare class MockQuery implements SqlQuery {
    commandText: string;
    binds: any;
    execute(): Promise<any[]>;
}
export declare class MockConnection implements SqlConnection {
    user: string;
    password: string;
    constructor();
    createTransaction(): Transaction;
    createSqlStatementProvider(): SqlStatementProvider;
    open(): Promise<Connection>;
    close(): Promise<Connection>;
    createCommand(): Command;
    createCommand(statement: SqlStatement): SqlCommand;
    createQuery(): Query;
    createQuery(statement: SqlStatement): SqlQuery;
}
