export interface Config<T> {
    read(providerName: string): Promise<T>
}

export interface Query {
    execute(): Promise<any[]>
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
}