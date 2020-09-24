export declare type Variant = {
    [key: string]: any;
};
export interface SqlStatement {
    commandText: string;
    binds?: Variant;
}
export declare enum SqlCondition {
    EQUAL = 0,
    DIFFERENT = 1,
    IN = 2
}
export interface SqlFilter {
    expression: string;
    condition: SqlCondition;
    value: any;
}
export interface SqlStatementProvider {
    insert(tableName: string, data: Variant): SqlStatement;
    update(tableName: string, data: Variant): SqlStatement;
    delete(tableName: string): SqlStatement;
    select(tableName: string, fields: string[]): SqlStatement;
    where(filters: SqlFilter[]): SqlStatement;
}
export interface SqlStatementBuilder {
    toStatement(): SqlStatement;
}
export declare class WhereSqlStatement implements SqlStatementBuilder {
    private $filters;
    private $provider;
    private $builder;
    private $tempFilter;
    get and(): WhereSqlStatement;
    constructor(provider: SqlStatementProvider, builder?: SqlStatementBuilder);
    setStatementBuilder(builder: SqlStatementBuilder): WhereSqlStatement;
    field(name: string): WhereSqlStatement;
    equal(value: any): WhereSqlStatement;
    different(value: any): WhereSqlStatement;
    in(values: any[]): WhereSqlStatement;
    toFilter(): SqlFilter;
    toStatement(): SqlStatement;
    private addFilter;
}
export declare class InsertSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $data;
    constructor(provider: SqlStatementProvider);
    into(tableName: string): InsertSqlStatement;
    value(field: string, value: any): InsertSqlStatement;
    toStatement(): SqlStatement;
}
export declare class UpdateSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $data;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(provider: SqlStatementProvider);
    on(tableName: string): UpdateSqlStatement;
    set(field: string, value: any): UpdateSqlStatement;
    toStatement(): SqlStatement;
}
export declare class DeleteSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(provider: SqlStatementProvider);
    from(tableName: string): this;
    toStatement(): SqlStatement;
}
export declare class SelectSqlStatement implements SqlStatementBuilder {
    private $provider;
    private $tableName;
    private $fields;
    private $where;
    get where(): WhereSqlStatement;
    set where(value: WhereSqlStatement);
    constructor(builder: SqlStatementProvider);
    field(field: string): SelectSqlStatement;
    from(tableName: string): SelectSqlStatement;
    toStatement(): SqlStatement;
}
