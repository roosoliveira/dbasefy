import { Table } from "../SQL";
import { SqlStatementProvider } from "../SQL/statements";
export declare class MockTable extends Table {
    ID: number;
    TEXT: string;
    constructor(provider: SqlStatementProvider);
    getTableName(): string;
}
