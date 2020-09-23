import { Command, Connection, Query } from '..';
import { Converter, Data } from '../core';
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from '../SQL';
import { SqlStatement, SqlStatementProvider } from '../SQL/statements';
export interface MockConfig {
    user: string;
    password: string;
}
export interface MockItemDesc {
    description: string;
}
export declare class MockItemConverter implements Converter<{
    description: string;
}> {
    convertTo(value: any): {
        description: string;
    };
}
export declare class MockData implements Data {
    [key: string]: any;
    convertTo<T>(converter: new () => Converter<T>): T;
}
export declare class MockCommand implements SqlCommand {
    commandText: string;
    binds: Data;
    execute(): Promise<void>;
}
export declare class MockQuery implements SqlQuery {
    commandText: string;
    binds: Data;
    execute(): Promise<Data[]>;
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
