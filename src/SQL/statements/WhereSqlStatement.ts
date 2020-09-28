import { isNil, mergeAll } from 'ramda'
import { SqlCondition, SqlFilter, SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.'

export default class WhereSqlStatement implements SqlStatementBuilder {

    private $filters: SqlFilter[]
    private $provider: SqlStatementProvider
    private $builder: SqlStatementBuilder
    private $tempFilter: SqlFilter

    get and(): WhereSqlStatement {
        if (this.$tempFilter.expression) this.addFilter()
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

    greaterThan(value: any): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.GREATER_THAN
        this.$tempFilter.value = value
        return this
    }

    lessThan(value: any): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.LESS_THAN
        this.$tempFilter.value = value
        return this
    }

    between(value: any[]): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.DIFFERENT
        this.$tempFilter.value = value
        return this
    }

    in(values: any[]): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.IN
        this.$tempFilter.value = values
        return this
    }

    notIn(values: any[]): WhereSqlStatement {
        this.$tempFilter.condition = SqlCondition.NOT_IN
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