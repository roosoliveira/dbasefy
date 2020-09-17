export interface Converter<T> {
    convertTo(value: any): T
}

export interface Data {
    [key: string]: any
    convertTo<T>(value: any, converter: Converter<T>): T
}