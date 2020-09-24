import { bind, filter, join, mergeAll, replace } from 'ramda'
import { Data } from '../core'
import { SqlCondition, SqlFilter, SqlStatement, SqlStatementProvider } from '../SQL/statements'

const commaJoin = join(', ')
const toBindName = (field: string): string => ':' + field

interface SqlFilterSimplified { 
    expression: string
    condition: string
    statement: SqlStatement 
}

export class MockSqlStatementProvider implements SqlStatementProvider {

    insert(tableName: string, data: Data): SqlStatement {
        const template = `INSERT INTO ${tableName} (%FIELDS%) VALUES (%VALUES%)`
        const fields = Object.keys(data)
        const values = fields.map(toBindName)
        const binds = mergeAll(fields.map(field => ({ [field]: data[field] }))) as Data
        const commandText = template
            .replace(/%FIELDS%/g, commaJoin(fields))
            .replace(/%VALUES%/g, commaJoin(values))
        return { commandText, binds }
    }

    update(tableName: string, data: Data): SqlStatement {
        const template = `UPDATE ${tableName} SET %VALUES%`
        const fields = Object.keys(data)
        const values = fields.map(toValues)
        const commandText = template.replace(/%VALUES%/g, commaJoin(values))
        const binds = mergeAll(fields.map(field => ({ [field]: data[field] }))) as Data
        return { commandText, binds }

        function toValues(field: string): string {
            return `${field} = ${toBindName(field)}`
        }
    }

    delete(tableName: string): SqlStatement {
        const commandText = `DELETE FROM ${tableName}`
        return { commandText, binds: {} as Data }
    }

    select(tableName: string, fields: string[]): SqlStatement {
        const template = `SELECT %FIELDS% FROM ${tableName}`
        const commandText = template.replace(/%FIELDS%/g, commaJoin(fields))
        return { commandText, binds: {} as Data }
    }

    where(filters: SqlFilter[]): SqlStatement {
        const template = `WHERE 1=1 AND %FILTERS%`
        const whereFilters = filters.map(simplify).map(toExpression).join(' AND ')
        const binds = mergeAll(filters.map(simplify).map(onlyBinds))
        const commandText = template.replace(/%FILTERS%/g, whereFilters)
        return { commandText, binds }

        function simplify(filter: SqlFilter, index): SqlFilterSimplified {
            return {
                expression: filter.expression,
                condition: getConditionSql(filter),
                statement: toBinds(filter, index)
            }
        }

        function toExpression(simplifiedFilter: SqlFilterSimplified): string {
            return `${simplifiedFilter.expression} ${simplifiedFilter.condition} ${simplifiedFilter.statement.commandText}`
        }

        function getConditionSql(filter: SqlFilter): string {
            switch (filter.condition) {
                case SqlCondition.EQUAL: return '='
                case SqlCondition.DIFFERENT: return '!='
                case SqlCondition.IN: return 'IN'
            }
        }

        function toBinds(filter: SqlFilter, indexFilter: number): SqlStatement {
            let commandText = ''
            let binds = {} as Data

            switch (filter.condition) {
                case SqlCondition.EQUAL: 
                case SqlCondition.DIFFERENT: 
                    commandText = toBindName('FILTER_' + indexFilter + '_0')
                    binds[commandText.replace(':', '')] = filter.value
                    break

                case SqlCondition.IN: 
                    const bindNames = filter.value.map((value, index) => {
                        const key = toBindName('FILTER_' + indexFilter + '_' + index)
                        binds[key.replace(':', '')] = value
                        return key
                    })
                    commandText = `(${commaJoin(bindNames)})`
                    break

            }

            return { commandText, binds }
        }

        function onlyBinds(filter: SqlFilterSimplified): Data {
            return filter.statement.binds
        }
    }

}