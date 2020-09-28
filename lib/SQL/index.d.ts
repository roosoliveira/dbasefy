import { Command, Connection, Query } from '..';
import { SqlStatement, SqlStatementProvider } from './statements';
import Table from './Table';
interface Transaction {
    commit(): Promise<void>;
    rollback(): Promise<void>;
}
interface SqlQuery extends Query, SqlStatement {
}
interface SqlCommand extends Command, SqlStatement {
}
declare abstract class SqlConnection implements Connection {
    abstract open(): Promise<Connection>;
    abstract close(): Promise<Connection>;
    abstract createTransaction(): Transaction;
    abstract createCommand(): Command;
    abstract createCommand(statement: SqlStatement): SqlCommand;
    abstract createQuery(): Query;
    abstract createQuery(statement: SqlStatement): SqlQuery;
    abstract createSqlStatementProvider(): SqlStatementProvider;
}
export { Transaction, SqlQuery, SqlCommand, SqlConnection, Table };
