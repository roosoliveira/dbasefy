# DBasefy (Beta)

```
npm i dbasefy
```

DBasefy is a framework that encapsulate database libraries. Easy to use, created in *TypeScript*, serves to facilitate the use of several databases without that you need change a lot of lines of code.

```typescript
import { SqlConnection } from 'dbasefy/lib/SQL'
import { OracleConnection } from 'dbasefy-oracle/lib' // install separately

const createConnection(provider: string): SqlConnection {
    const connention: SqlConnenction
    switch (provider) {
        case 'mock': 
            connention = new MockConnection()
            break

        case 'oracle': 
            connection = new OracleConnection()
            break

        default:
            throw new Error(`${provider} not implemented yet`)
    }
    return connection
}

async function getDataSample(provide: string): Promise<void> {
    const conn = await createConnection(provide).open()
    try {
        return await conn
            .createQuery({ commandText: 'SELECT...' // SQL statement })
            .execute()
    } finally {
        await conn.close()
    }
}

async function run(environment: string) {
    const provider = 'oracle'
    if (environment === 'test') {
        provider = 'mock'
    }
    console.log(await getDataSample(provider))
}

run('test')
```

### SQL Statements

It is possible to use the library to facilitate the creation of your SQL statements, sample:

#### SELECT

```typescript
import { DB } from 'dbasefy/DB'
import { MockConnection } from 'dbasefy/Mock/MockConnection'
import { SelectSqlStatement } from 'dbasefy/SQL/statements'

DB.session(MockConnection, async (conn: MockConnection) => {
    const select = new SelectSqlStatement(conn.createSqlStatementProvider())
    const statement = select
        .field('ID')
        .field('TEXT')
        .from('TEST_TABLE')
        .where.field('ID').equal(10)
        .and.field('TEXT').different('Test')
        .toStatement()
  
    console.log(statement)

    /*
    {
        commandText: 'SELECT ID, TEXT FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0 AND TEXT != :FILTER_1_0'
        binds: { FILTER_0_0: 10, FILTER_1_0: 'Test' }
    }
    */

    const rows = await conn.createQuery(statement).execute()
})
```

If you need to create a more complex select statement, you should use `string` declaration instead a `SelectSqlStatement`

#### INSERT

```typescript
import { DB } from 'dbasefy/DB'
import { MockConnection } from 'dbasefy/Mock/MockConnection'
import { InsertSqlStatement } from 'dbasefy/SQL/statements'

DB.session(MockConnection, async (conn: MockConnection) => {
    const insert = new InsertSqlStatement(conn.createSqlStatementProvider())
    const statement = insert
        .into('TEST_TABLE')
        .value('ID', 10)
        .value('TEXT', 'Test')
        .toStatement()
  
    console.log(statement)

    /*
    { 
        commandText: 'INSERT INTO TEST_TABLE (ID, TEXT) VALUES (:ID, :TEXT)',
        binds: { ID: 10, TEXT: 'Test' } 
    }
     */

    await conn.createCommand(statement).execute()
})
```

#### UPDATE

```typescript
import { DB } from 'dbasefy/DB'
import { MockConnection } from 'dbasefy/Mock/MockConnection'
import { UpdateSqlStatement } from 'dbasefy/SQL/statements'

DB.session(MockConnection, async (conn: MockConnection) => {
    const update = new UpdateSqlStatement(conn.createSqlStatementProvider())
    const statement = update
        .on('TEST_TABLE')
        .set('TEXT', 'Test')
        .where.field('ID').equal(10)
        .toStatement()
  
    console.log(statement)

    /*
    { 
        commandText: 'UPDATE TEST_TABLE SET TEXT = :TEXT WHERE 1=1 AND ID = :FILTER_0_0',
        binds: { TEXT: 'Test', FILTER_0_0: 10 } 
    }
     */

    await conn.createCommand(statement).execute()
})
```

#### DELETE

```typescript
import { DB } from 'dbasefy/DB'
import { MockConnection } from 'dbasefy/Mock/MockConnection'
import { DeleteSqlStatement } from 'dbasefy/SQL/statements'

DB.session(MockConnection, async (conn: MockConnection) => {
    const del = new DeleteSqlStatement(conn.createSqlStatementProvider())
    const statement = del
        .from('TEST_TABLE')
        .where.field('ID').equal(10)
        .toStatement()
  
    console.log(statement)

    /*
    { 
        commandText: 'DELETE FROM TEST_TABLE WHERE 1=1 AND ID = :FILTER_0_0',
        binds: { FILTER_0_0: 10 }
    }
     */

    await conn.createCommand(statement).execute()
})
```

#### Tables

You can extends from `Table` class to create a representation of SQL table and to be able have access the methods like `insert`, `update`, `delete` and `select`. Sample:

```sql
/*TABLE SAMPLE*/
CREATE TABLE TEST (
  ID NUMBER(22) NOT NULL,
  DESCRIPTION VARCHAR2(250) NOT NULL,
  CREATION_DATE DATE NOT NULL,
);
```

```typescript
import { Table } from 'dbasefy/lib/SQL'

// typescript representation of SQL table
class TestTable extends Table {
    ID: number
    DESCRIPTION: string
    DATE: Date

    getTableName(): string {
        return 'TEST'
    }
}
```

```typescript
import { DB } from 'dbasefy'
import { Table } from 'dbasefy/lib/SQL'

DB.session(MockConnection, async (conn: MockConnection) => {
    const trx = conn.createTransaction()
    try {
        const test = new TestTable(conn.createSqlStatementProvider())
        test.ID = 1
        test.DESCRIPTION = 'Description test'
        test.DATE = new Date()

        await DB.execCommand(conn, test.insert())

        test.DESCRIPTION = 'descrition TEST'

        await DB.execCommand(conn, test.update().where.field('ID').equal(1))

        await trx.commit()
    } catch(err) {

        await trx.rollback()
        throw err

    }
}
```

#### Connections

Available connections:

- [Oracle](https://www.npmjs.com/package/dbasefy-oracle)
