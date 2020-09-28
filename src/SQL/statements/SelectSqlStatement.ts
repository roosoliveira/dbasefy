import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from "."
import WhereSqlStatement from "./WhereSqlStatement"

export default class SelectSqlStatement implements SqlStatementBuilder {

    private $provider: SqlStatementProvider
    private $tableName: string
    private $fields: string[]
    private $where: WhereSqlStatement

    get where(): WhereSqlStatement {
        return this.$where
    }

    set where(value: WhereSqlStatement) {
        value.setStatementBuilder(this)
        this.$where = value
    }

    constructor(builder: SqlStatementProvider) {
        this.$provider = builder
        this.$where = new WhereSqlStatement(this.$provider, this)
        this.$fields = []
    }

    field(field: string): SelectSqlStatement {
        this.$fields.push(field)
        return this
    }

    from(tableName: string): SelectSqlStatement {
        this.$tableName = tableName
        return this
    }

    toStatement(): SqlStatement {
        return this.$provider.select(this.$tableName, this.$fields)
    }

}