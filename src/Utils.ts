export default class Util {

    static delay(time: number = 300): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }

}