import { Command, Connection, Query } from '..'
import JsonConfig from '../config/JsonConfig'
import { SqlCommand, SqlConnection, SqlQuery, Transaction } from '../SQL'
import { SqlStatement, SqlStatementProvider } from '../SQL/statements'
import Util from '../Utils'
import { MockSqlStatementProvider } from './MockSqlStatementProvider'

export interface MockConfig {
    user: string
    password: string
}

export interface MockItemDesc {
    description: string
}

export class MockCommand implements SqlCommand {
    commandText: string
    binds: any

    async execute(): Promise<void> {
        await Util.delay()
    }

}

export class MockQuery implements SqlQuery {
    commandText: string
    binds: any
    
    async execute(): Promise<any[]> {
        await Util.delay()
        return [ 
            { ID: 1, TEXT: 'Item 1' },  
            { ID: 2, TEXT: 'Item 2' }
        ]
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