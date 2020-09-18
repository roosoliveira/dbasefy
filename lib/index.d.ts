import { Data } from './core';
export interface Config<T> {
    read(providerName: string): Promise<T>;
}
export interface Query {
    execute(): Promise<Data[]>;
}
export interface Command {
    execute(): Promise<void>;
}
export interface Connection {
    open(): Promise<Connection>;
    close(): Promise<Connection>;
    createCommand(): Command;
    createQuery(): Query;
}
export declare type Action<R> = (conn: Connection) => Promise<R>;
export declare class DB {
    static session<R>(conn: new () => Connection, action: Action<R>): Promise<R>;
}
