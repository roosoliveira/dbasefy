import { Command, Connection, Query } from '..'
import JsonConfig from '../config/JsonConfig'
import { Converter, Data } from '../core'
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from '../SQL'
import { SqlFilter, SqlStatement, SqlStatementProvider } from '../SQL/statements'
import Util from '../Utils'
import { MockSqlStatementProvider } from './MockSqlStatementProvider'

export interface MockConfig {
    user: string
    password: string
}

export interface MockItemDesc {
    description: string
}

export class MockItemConverter implements Converter<{ description: string }> {

    convertTo(value: any): { description: string } {
        return {
            description: `(${value.ID}) ${value.TEXT}`
        }
    }

}

export class MockData implements Data {
    
    [key: string]: any

    convertTo<T>(converter: new () => Converter<T>): T {
        return new converter().convertTo(this)
    }

}

export class MockCommand implements SqlCommand {
    commandText: string
    binds: Data

    async execute(): Promise<void> {
        await Util.delay()
    }

}

export class MockQuery implements SqlQuery {
    commandText: string
    binds: Data
    
    async execute(): Promise<Data[]> {
        await Util.delay()

        const item1 = new MockData()
        item1.ID = 1
        item1.TEXT = 'Item 1'

        const item2 = new MockData()
        item2.ID = 2
        item2.TEXT = 'Item 3'

        return [ item1, item2 ]
    }
}

export class MockConnection implements SqlConnection {

    user: string
    password: string

    constructor() {
        this.user = ''
        this.password = ''
    }

    createTransaction(): Transaction {
        throw new Error('Method not implemented.')
    }

    createSqlStatementProvider(): SqlStatementProvider {
        return new MockSqlStatementProvider()
    }

    async open(): Promise<Connection> {
        const config = await new JsonConfig<MockConfig>().read('mock')
        this.user = config.user
        this.password = config.password
        await Util.delay()
        return this
    }

    async close(): Promise<Connection> {
        await Util.delay()
        return this
    }

    createCommand(): Command
    createCommand(statement: SqlStatement): SqlCommand
    createCommand(statement?: SqlStatement): SqlCommand {
        return new MockCommand()
    }

    createQuery(): Query
    createQuery(statement: SqlStatement): SqlQuery
    createQuery(statement?: SqlStatement): SqlQuery {
        return new MockQuery()
    }
    
}