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
