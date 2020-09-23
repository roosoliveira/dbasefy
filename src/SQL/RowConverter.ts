import { Converter } from '../core'

export class RowConverter<T> implements Converter<T> {

    convertTo(value: any): T {
        const result = {}
        Object.keys(value).forEach(key => result[key] = value[key])
        return result as T
    }

}