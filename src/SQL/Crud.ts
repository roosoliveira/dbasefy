import { SqlConnection } from '.'
import { 
    DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, 
    SqlStatementBuilder, SqlStatementProvider, UpdateSqlStatement, 
    WhereSqlStatement 
} from './statements'

export class Crud<T> {

    private $conn: SqlConnection
    private $provider: SqlStatementProvider
    private $tableName: string
    
    constructor(conn: SqlConnection, tableName: string) {
        this.$conn = conn
        this.$provider = conn.createSqlStatementProvider()
        this.$tableName = tableName
    }

    async insert(row: T): Promise<void> {
        const insert = new InsertSqlStatement(this.$provider).into(this.$tableName)
        Object.keys(row).forEach(key => insert.value(key, row[key]))
        await this.executeCommand(insert)
    }

    async update(row: T, where: WhereSqlStatement): Promise<void> {
        const update = new UpdateSqlStatement(this.$provider).on(this.$tableName)
        Object.keys(row).forEach(key => update.set(key, row[key]))
        await this.executeCommand(update.where = where)
    }

    async delete(where: WhereSqlStatement): Promise<void> {
        const del = new DeleteSqlStatement(this.$provider).from(this.$tableName)
        await this.executeCommand(del.where = where)
    }

    async fetch(where: WhereSqlStatement): Promise<T[]> {
        const select = new SelectSqlStatement(this.$provider)
            .field('*')
            .from(this.$tableName)
            .where = where

        const rows = await this.$conn
            .createQuery(select.toStatement())
            .execute()
        // return rows.map(row => row.convertTo<T>(RowConverter))
    }

    private async executeCommand(builder: SqlStatementBuilder): Promise<void> {
        await this.$conn
            .createCommand(builder.toStatement())
            .execute()
    }

    where(): WhereSqlStatement {
        return new WhereSqlStatement(this.$provider)
    }
}