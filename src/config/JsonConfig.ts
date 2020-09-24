import JConfig from 'config'
import { Config } from '..'
import { Converter, Data } from '../core'

export default class JsonConfig<T> implements Config<T> {
    
    convertTo<T>(value: any, converter: Converter<T>): T {
        return converter.convertTo(value)
    }

    async read(providerName: string): Promise<T> {
        return JConfig.get(`providers.${providerName}`) 
    }

}