import { MockConnection, MockItemDesc } from '../src/Mock/MockConnection'
import { DB } from '../src'
import { expect } from 'chai'

const conn = new MockConnection()

function toItem(data: any): MockItemDesc {
    return {
        description: `${data.ID} - ${data.TEXT}`
    }
}

function testItem(item: MockItemDesc) {
    expect(item)
        .to.be.an('Object')
        .and.have.property('description')
}

describe('Test rules of connection', () => {

    it('open', async () => {
        await conn.open()
    })

    it('close', async () => {
        await conn.close()
    })

    it('command', async () => {
        const cmd = conn.createCommand()
        await cmd.execute()
    })

    it('query with convert', async () => {
        const cmd = conn.createQuery()
        const data = await cmd.execute()
        
        expect(data).to.be.an('Array')
        
        for(const row of data) {
            expect(row).to.be.an('Object')
            expect(row).have.property('ID')
            expect(row).have.property('TEXT')
        }

        const items = data.map(toItem)
        expect(items)
            .to.be.an('Array').length(2)

        items.forEach(testItem)
    })

    it('session', async () => {
        const items = await DB.session<MockItemDesc[]>(MockConnection, async conn => {
            const cmd = conn.createQuery()
            const data = await cmd.execute()
            return data.map(toItem)
        })

        items.forEach(testItem)
    })

})