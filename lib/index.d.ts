import { SqlConnection } from "./SQL";
import { SqlStatementBuilder } from "./SQL/statements";
export interface Config<T> {
    read(providerName: string): Promise<T>;
}
export interface Query {
    execute(): Promise<any[]>;
}
export interface Command {
    execute(): Promise<any>;
}
export interface Connection {
    open(): Promise<Connection>;
    close(): Promise<Connection>;
    createCommand(): Command;
    createQuery(): Query;
}
export declare type ActionFn1<R> = (conn: Connection) => Promise<R>;
export declare class DB {
    static session<R>(conn: new () => Connection, action: ActionFn1<R>): Promise<R>;
    static execCommand(conn: SqlConnection, builder: SqlStatementBuilder): Promise<void>;
    static execQuery(conn: SqlConnection, builder: SqlStatementBuilder): Promise<any[]>;
}
