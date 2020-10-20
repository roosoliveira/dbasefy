import { SqlConnection } from "./SQL"
import { SqlStatementBuilder } from "./SQL/statements"

export interface Config<T> {
    read(providerName: string): Promise<T>
}

export interface Query {
    execute(): Promise<any[]>
}

export interface Command {
    execute(): Promise<any>
}

export interface Connection {
    open(): Promise<Connection>
    close(): Promise<Connection>
    createCommand(): Command
    createQuery(): Query
}

export type ActionFn1<R> = (conn: Connection) => Promise<R>

export class DB {
    static async session<R>(conn: new() => Connection, action: ActionFn1<R>): Promise<R> {
        const connection = await new conn().open()
        try {
            return await action(connection)
        } finally {
            await connection.close()
        }
    }

    static async execCommand(conn: SqlConnection, builder: SqlStatementBuilder): Promise<void> {
        await conn.createCommand(builder.toStatement()).execute()
    }

    static async execQuery(conn: SqlConnection, builder: SqlStatementBuilder): Promise<any[]> {
        return await conn.createQuery(builder.toStatement()).execute()
    }
}