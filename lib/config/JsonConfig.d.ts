import { Config } from '..';
export default class JsonConfig<T> implements Config<T> {
    read(providerName: string): Promise<T>;
}
