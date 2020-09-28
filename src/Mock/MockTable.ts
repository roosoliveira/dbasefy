import { Table } from "../SQL"
import { SqlStatementProvider } from "../SQL/statements"

export class MockTable extends Table{
    ID: number
    TEXT: string

    constructor(provider: SqlStatementProvider) {
        super(provider)
        this.ID = null
        this.TEXT = null
    }

    getTableName(): string {
        return 'MOCK_TABLE'
    }
}