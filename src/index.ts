import { Data } from './core'

export interface Query {
    execute(): Promise<Data[]>
}

export interface Command {
    execute(): Promise<void>
}

export interface Connection {
    open(): Promise<Connection>
    close(): Promise<Connection>
    createCommand(): Command
    createQuery(): Query
}

//-------------

export interface Transaction {
    commit(): Promise<void>
    rollback(): Promise<void>
}

export interface SqlConnection extends Connection {
    createTransaction(): Transaction
}

//-------------------

export class DB {
    static create<C extends Connection>(conn: new() => C): C {
        return new conn()
    }
}
