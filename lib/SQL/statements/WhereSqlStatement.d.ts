import { SqlFilter, SqlStatement, SqlStatementBuilder, SqlStatementProvider } from '.';
export default class WhereSqlStatement implements SqlStatementBuilder {
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
    greaterThan(value: any): WhereSqlStatement;
    lessThan(value: any): WhereSqlStatement;
    between(value: any[]): WhereSqlStatement;
    in(values: any[]): WhereSqlStatement;
    notIn(values: any[]): WhereSqlStatement;
    toFilter(): SqlFilter;
    toStatement(): SqlStatement;
    private addFilter;
}
