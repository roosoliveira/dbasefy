import { SqlConnection } from '.';
import { WhereSqlStatement } from './statements';
export declare class Crud<T> {
    private $conn;
    private $provider;
    private $tableName;
    constructor(conn: SqlConnection, tableName: string);
    insert(row: T): Promise<void>;
    update(row: T, where: WhereSqlStatement): Promise<void>;
    delete(where: WhereSqlStatement): Promise<void>;
    fetch(where: WhereSqlStatement): Promise<T[]>;
    private executeCommand;
    where(): WhereSqlStatement;
}
