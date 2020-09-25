import JConfig from 'config'
import { Config } from '..'

export default class JsonConfig<T> implements Config<T> {
    
    async read(providerName: string): Promise<T> {
        return JConfig.get(`providers.${providerName}`) 
    }

}