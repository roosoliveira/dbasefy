import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.'
import WhereSqlStatement from './WhereSqlStatement'

export default class UpdateSqlStatement implements SqlStatementBuilder  { 

    private $provider: SqlStatementProvider
    private $tableName: string
    private $data: any
    private $where: WhereSqlStatement

    get where(): WhereSqlStatement {
        return this.$where
    }

    set where(value: WhereSqlStatement) {
        value.setStatementBuilder(this)
        this.$where = value
    }

    constructor(provider: SqlStatementProvider) {
        this.$provider = provider
        this.$data = {}
        this.$where = new WhereSqlStatement(provider, this)
    }

    on(tableName: string): UpdateSqlStatement {
        this.$tableName = tableName
        return this
    }

    set(field: string,  value: any): UpdateSqlStatement {
        this.$data[field] = value
        return this
    }

    toStatement(): SqlStatement {
        return this.$provider.update(this.$tableName, this.$data)
    }
    
}