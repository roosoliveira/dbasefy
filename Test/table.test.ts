import { MockConnection } from '../src/Mock/MockConnection'
import { MockTable } from '../src/Mock/MockTable'
import { expect } from 'chai'
import { DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, UpdateSqlStatement } from '../src/SQL/statements'

const conn = new MockConnection()

describe('Table standard', () => {

    it('insert', async() => {
        const mock = new MockTable(conn.createSqlStatementProvider())
        mock.ID = 1
        mock.TEXT = 'test'
        const stmt = mock.insert().toStatement()

        expect(stmt.commandText).to.be.equal('INSERT INTO MOCK_TABLE (ID, TEXT) VALUES (:ID, :TEXT)')
        expect(stmt.binds).to.own.include({ ID: 1, TEXT: 'test' })
    })

    it('Update', async() => {
        const mock = new MockTable(conn.createSqlStatementProvider())
        mock.ID = 1
        mock.TEXT = 'tst'
        const stmt = mock.update().where.field('ID').equal(1).toStatement()
            
        expect(stmt.commandText).to.be.equal('UPDATE MOCK_TABLE SET ID = :ID, TEXT = :TEXT WHERE 1=1 AND ID = :FILTER_0_0')
        expect(stmt.binds).to.own.include({ ID: 1, TEXT: 'tst', FILTER_0_0: 1 })
    })

    it('Delete', async() => {
        const mock = new MockTable(conn.createSqlStatementProvider())
        const stmt = mock.delete().where.field('ID').equal(1).toStatement()
            
        expect(stmt.commandText).to.be.equal('DELETE FROM MOCK_TABLE WHERE 1=1 AND ID = :FILTER_0_0')
        expect(stmt.binds).to.own.include({ FILTER_0_0: 1 })
    })

    it('Select', async() => {
        const mock = new MockTable(conn.createSqlStatementProvider())
        const stmt = mock.select().where.field('ID').equal(1).toStatement()
            
        expect(stmt.commandText).to.be.equal('SELECT ID, TEXT FROM MOCK_TABLE WHERE 1=1 AND ID = :FILTER_0_0')
        expect(stmt.binds).to.own.include({ FILTER_0_0: 1 })
    })

})