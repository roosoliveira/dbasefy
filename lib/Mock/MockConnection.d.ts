import { Command, Connection, Query } from '..';
import { Converter, Data } from '../core';
export interface MockConfig {
    user: string;
    password: string;
}
export interface MockItemDesc {
    description: string;
}
export declare class MockItemConverter implements Converter<{
    description: string;
}> {
    convertTo(value: any): {
        description: string;
    };
}
export declare class MockData implements Data {
    [key: string]: any;
    convertTo<T>(converter: new () => Converter<T>): T;
}
export declare class MockCommand implements Command {
    execute(): Promise<void>;
}
export declare class MockQuery implements Query {
    execute(): Promise<Data[]>;
}
export declare class MockConnection implements Connection {
    user: string;
    password: string;
    constructor();
    open(): Promise<Connection>;
    close(): Promise<Connection>;
    createCommand(): Command;
    createQuery(): Query;
}
