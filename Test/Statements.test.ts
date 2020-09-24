import { MockConnection } from '../src/Mock/MockConnection'
import { expect } from 'chai'
import { DeleteSqlStatement, InsertSqlStatement, SelectSqlStatement, UpdateSqlStatement } from '../src/SQL/statements'

const conn = new MockConnection()

describe('Creation of SQL Statements', () => {

    it('Select Statement', async() => {
        const select = new SelectSqlStatement(conn.createSqlStatementProvider())
        const statement = select
            .field('ID')
            .field('TEXT')
            .from('TEST_TABLE')
            .where.field('ID').equal(10)
            .toStatement()

        expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0')
        expect(statement.binds).to.own.include({ FILTER_0_0: 10 })
    })

    it('Select Statement with two filters', async() => {
        const select = new SelectSqlStatement(conn.createSqlStatementProvider())
        const statement = select
            .field('ID')
            .field('TEXT')
            .from('TEST_TABLE')
            .where.field('ID').equal(10)
            .and.field('TEXT').different('Test')
            .toStatement()

        expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0 AND TEXT != :FILTER_1_0')
        expect(statement.binds).to.own.include({ FILTER_0_0: 10, FILTER_1_0: 'Test' })
    })

    it('Select Statement without WHERE', async() => {
        const select = new SelectSqlStatement(conn.createSqlStatementProvider())
        const statement = select
            .field('ID')
            .field('TEXT')
            .from('TEST_TABLE')
            .toStatement()

        expect(statement.commandText).to.be.equal('SELECT ID, TEXT FROM TEST_TABLE')
    })

    it('Insert Statement', async() => {
        const insert = new InsertSqlStatement(conn.createSqlStatementProvider())
        const statement = insert
            .into('TEST_TABLE')
            .value('ID', 10)
            .value('TEXT', 'Tst')
            .toStatement()

        expect(statement.commandText).to.be.equal('INSERT INTO TEST_TABLE (ID, TEXT) VALUES (:ID, :TEXT)')
        expect(statement.binds).to.own.include({ ID: 10, TEXT: 'Tst' })
    })

    it('Update Statement', async() => {
        const update = new UpdateSqlStatement(conn.createSqlStatementProvider())
        const statement = update
            .on('TEST_TABLE')
            .set('TEXT', 'tst')
            .where.field('ID').equal(10)
            .toStatement()
            
        expect(statement.commandText).to.be.equal('UPDATE TEST_TABLE SET TEXT = :TEXT WHERE 1=1 AND ID = :FILTER_0_0')
        expect(statement.binds).to.own.include({ TEXT: 'tst', FILTER_0_0: 10 })
    })

    it('Delete Statement', async() => {
        const del = new DeleteSqlStatement(conn.createSqlStatementProvider())
        const statement = del
            .from('TEST_TABLE')
            .where.field('ID').equal(10)
            .toStatement()
            
        expect(statement.commandText).to.be.equal('DELETE FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0')
        expect(statement.binds).to.own.include({ FILTER_0_0: 10 })
    })

})