import { isEmpty, isNil, mergeAll } from 'ramda'
import { Data } from '../core'

export interface SqlStatement {
    commandText: string
    binds?: Data
}

export enum SqlCondition {
    EQUAL,
    DIFFERENT,
    IN
}

export interface SqlFilter {
    expression: string
    condition: SqlCondition
    value: any
}

export interface SqlStatementProvider {
    insert(tableName: string, data: Data): SqlStatement
    update(tableName: string, data: Data): SqlStatement
    delete(tableName: string): SqlStatement
    select(tableName: string, fields: string[]): SqlStatement
    where(filters: SqlFilter[]): SqlStatement
}

export interface SqlStatementBuilder {
    toStatement(): SqlStatement
}

export class WhereSqlStatement implements SqlStatementBuilder {

    private $filters: SqlFilter[]
    private $provider: SqlStatementProvider
    private $builder: SqlStatementBuilder
    private $tempFilter: SqlFilter

    get and(): WhereSqlStatement {
        this.addFilter()
        return this
    }

    constructor(provider: SqlStatementProvider, builder?: SqlStatementBuilder) {
        this.$provider = provider
        this.$builder = builder
        this.$tempFilter = { expression: '', condition: null, value: null }
        this.$filters = []
    }

    setStatementBuilder(builder: SqlStatementBuilder): WhereSqlStatement {
        this.$builder = builder
        return this
    }

    field(name: string): WhereSqlStatement {
        this.$tempFilter.expression = name
        return this
    }

    equal(value: any): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.EQUAL
        this.$tempFilter.value = value
        return this
    }

    different(value: any): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.DIFFERENT
        this.$tempFilter.value = value
        return this
    }

    in(values: any[]): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.IN
        this.$tempFilter.value = values
        return this
    }

    toFilter(): SqlFilter {
        return {
            expression: this.$tempFilter.expression,
            condition: this.$tempFilter.condition,
            value: this.$tempFilter.value
        }
    }

    toStatement(): SqlStatement {
        if (isNil(this.$builder)) throw Error('SqlStatementBuilder must to be informed')
        this.addFilter()
        const addOn = this.$builder.toStatement()
        const whereStatement = this.$provider.where(this.$filters)
        return {
            commandText: `${addOn.commandText} ${whereStatement.commandText}`,
            binds: mergeAll([addOn.binds, whereStatement.binds])
        }
    }

    private addFilter() {
        this.$filters.push(this.toFilter())
        return this
    }

}

export class InsertSqlStatement implements SqlStatementBuilder  { 

    private $provider: SqlStatementProvider
    private $tableName: string
    private $data: Data

    constructor(provider: SqlStatementProvider) {
        this.$provider = provider
        this.$data = {} as Data
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

export class UpdateSqlStatement implements SqlStatementBuilder  { 

    private $provider: SqlStatementProvider
    private $tableName: string
    private $data: Data
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
        this.$data = {} as Data
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

export class DeleteSqlStatement implements SqlStatementBuilder  { 

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

export class SelectSqlStatement implements SqlStatementBuilder {

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
