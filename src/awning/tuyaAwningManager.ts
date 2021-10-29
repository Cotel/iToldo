import { AwningManager } from "./awningManager";
import * as TuyAPI from 'tuyapi'
import { AwningPosition } from "./types";

export class TuyaAwningManagerFactory {
    static async create(): Promise<AwningManager> {
        const device = new TuyAPI({
            id: process.env.TUYA_DEVICE_ID,
            key: process.env.TUYA_DEVICE_KEY,
            issueGetOnConnect: false
        })

        await device.find()
        await device.connect()

        return <AwningManager>{
            setPosition: async (position: AwningPosition) => {
                await device.get({ schema: true })
                await device.set({ dps: 2, set: 100 - (position * 100) })
                return Promise.resolve()
            },

            disconnect: () => device.disconnect()
        }
    }
}