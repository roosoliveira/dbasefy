import { SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.'

export default class InsertSqlStatement implements SqlStatementBuilder  { 

    private $provider: SqlStatementProvider
    private $tableName: string
    private $data: any

    constructor(provider: SqlStatementProvider) {
        this.$provider = provider
        this.$data = {}
    }

    into(tableName: string): InsertSqlStatement {
        this.$tableName = tableName
        return this
    }

    value(field: string,  value: any): InsertSqlStatement {
        this.$data[field] = value
        return this
    }

    toStatement(): SqlStatement {
        return this.$provider.insert(this.$tableName, this.$data)
    }
    
}