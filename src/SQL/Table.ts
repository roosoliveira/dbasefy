import { isEmpty, not } from 'ramda'
import { DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, SqlStatementProvider, UpdateSqlStatement } from './statements'

export default abstract class Table {
    
    private $provider: SqlStatementProvider

    constructor(provider: SqlStatementProvider) {
        this.$provider = provider
    }

    abstract getTableName(): string
    
    insert(): InsertSqlStatement {
        const insert = new InsertSqlStatement(this.$provider)
        insert.into(this.getTableName())
        this.getFields().forEach(k => insert.value(k, this[k]))
        return insert
    }

    update(): UpdateSqlStatement {
        const update = new UpdateSqlStatement(this.$provider)
        update.on(this.getTableName())
        this.getFields().forEach(k => update.set(k, this[k]))
        return update
    }

    delete(): DeleteSqlStatement {
        const del = new DeleteSqlStatement(this.$provider)
        del.from(this.getTableName())
        return del
    }

    select(): SelectSqlStatement {
        const select = new SelectSqlStatement(this.$provider)
        select.from(this.getTableName())
        const fields = this.getFields()
        if (isEmpty(fields)) select.field('*')
        else this.getFields().forEach(k => select.field(k))
        return select
    }

    getFields(): string[] {
        return Object.keys(this).filter(k => not(k.includes('$')))
    }
}