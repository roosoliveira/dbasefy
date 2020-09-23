import { Data } from '../core'
import { Command, Connection, Query } from '..'
import { SqlStatement, SqlStatementProvider } from './statements'

export interface Transaction {
    commit(): Promise<void>
    rollback(): Promise<void>
}

export interface SqlQuery extends Query, SqlStatement {}
export interface SqlCommand extends Command, SqlStatement {}

export abstract class SqlConnection implements Connection {
    abstract open(): Promise<Connection>
    abstract close(): Promise<Connection>
    abstract createTransaction(): Transaction
    abstract createCommand(): Command
    abstract createCommand(statement: SqlStatement): SqlCommand
    abstract createQuery(): Query
    abstract createQuery(statement: SqlStatement): SqlQuery
    abstract createSqlStatementProvider(): SqlStatementProvider
}

export interface TableSchema extends Data {
    getTableName(): string
    getPrimaryKeys(): string[]
}



// export abstract class Table {
//     private $schema: TableSchema

//     constructor(schema: TableSchema) {
//         this.$schema = schema
//     }

//     abstract insert(data: Data): Promise<Table>
//     abstract update(data: Data): Promise<Table>
//     abstract delete(data: Data): Promise<Table>
//     abstract where(data: SqlWhere): Promise<Table>
// }