import { Command, Connection, Query } from '.'

export interface Transaction {
    commit(): Promise<void>
    rollback(): Promise<void>
}

export interface SqlStatement {
    commandText: string
}

export interface SqlQuery extends Query, SqlStatement {}
export interface SqlCommand extends Command, SqlStatement {}

export abstract class SqlConnection implements Connection {
    abstract open(): Promise<Connection>
    abstract close(): Promise<Connection>
    abstract createTransaction(): Transaction
    abstract createCommand(): Command
    abstract createCommand(commandText: string): SqlCommand
    abstract createQuery(): Query
    abstract createQuery(commandText: string): SqlQuery
}