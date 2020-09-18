export default class Util {

    static delay(time: number = 10): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, time)
        })
    }

}