import { Config } from '..';
import { Converter } from '../core';
export default class JsonConfig<T> implements Config<T> {
    convertTo<T>(value: any, converter: Converter<T>): T;
    read(providerName: string): Promise<T>;
}
