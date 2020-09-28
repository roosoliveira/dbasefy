import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.'
import WhereSqlStatement from './WhereSqlStatement'

export default class DeleteSqlStatement implements SqlStatementBuilder  {

    private $provider: SqlStatementProvider
    private $tableName: string
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
        this.$where = new WhereSqlStatement(provider, this)
    }

    from(tableName: string) {
        this.$tableName = tableName
        return this
    }

    toStatement(): SqlStatement {
        return this.$provider.delete(this.$tableName)
    }

}