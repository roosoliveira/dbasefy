import { Command, Connection, Query } from '../src'
import { Converter, Data } from '../src/core'
import Util from '../src/Utils'

export class MockItemConverter implements Converter<{ description: string }> {

    convertTo(value: any): { description: string } {
        return {
            description: `(${value.ID}) ${value.DESCRICAO}`
        }
    }

}

export class MockData implements Data {
    
    [key: string]: any

    convertTo<T>(value: any, converter: Converter<T>): T {
        return converter.convertTo(value)
    }

}

export class MockCommand implements Command {

    async execute(): Promise<void> {
        await Util.delay()
    }

}

export class MockQuery implements Query {
    async execute(): Promise<Data[]> {
        await Util.delay()
        const item1 = new MockData()
        item1.ID = 1
        item1.TEXT = 'Item 1'
        const item2 = new MockData()
        item1.ID = 2
        item1.TEXT = 'Item 3'
        return [ item1, item2 ]
    }
}

export class MockConnection implements Connection {

    async open(): Promise<Connection> {
        await Util.delay()
        return this
    }

    async close(): Promise<Connection> {
        await Util.delay()
        return this
    }

    createCommand(): Command {
        return new MockCommand()
    }

    createQuery(): Query {
        return new MockQuery()
    }
    
}