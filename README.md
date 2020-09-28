# DBasefy (Beta)

```
npm i dbasefy
```

DBasefy is a database encapsulator library. Created in TypeScript serves to encapsulate the implementation complexity from databases, that helps on polymorphism

```typescript
import { Connection } from 'dbasefy'

const createConnection(): Connention {
    // Mock is just a testable class, simply to simulate a connection class
    return new MockConnection()
}

async function basicUsageSample(): Promise<void> {
    const conn = await createConnection().open()
    try {
        const cmd = conn.createCommand()
        await cmd.execute()
    } finally {
        await conn.close()
    }
}

basicUsageSample()
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

Extends of `Table` class to create a representation of table and to be able have access the methods like `insert`, `update`, `delete` and `select`. Sample:

```sql
/*TABLE SAMPLE*/
CREATE TABLE TEST (
  ID NUMBER(22) NOT NULL,
  DESCRIPTION VARCHAR2(250) NOT NULL,
  CREATION_DATE DATE NOT NULL,
);
```

```typescript
import { DB } from 'dbasefy'
import { Table } from 'dbasefy/lib/SQL'

// typescript representation of table
class TestTable extends Table {
    ID: number
    DESCRIPTION: string
    DATE: Date

    getTableName(): string {
        return 'TEST'
    }
}

DB.session(MockConnection, async (conn: MockConnection) => {
    const test = new TestTable(conn.createSqlStatementProvider())
    test.ID = 1
    test.DESCRIPTION = 'Description test'
    test.DATE = new Date()

    DB.execCommand(conn, test.insert())
})
```

#### Connections

Available connections:

- [Oracle](https://www.npmjs.com/package/dbasefy-oracle)
