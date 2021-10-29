import * as dotenv from "dotenv"
import { determineAwningPosition } from "./awning/functions"
import { TuyaAwningManagerFactory } from "./awning/tuyaAwningManager"
import { OpenWWeatherClient } from "./weather/openWeather"

(async () => {
    dotenv.config()

    const weatherClient = new OpenWWeatherClient()
    const awningManager = await TuyaAwningManagerFactory.create()

    const currentWeather = await weatherClient.getCurrentWeather()
    const currentWindSpeed = await weatherClient.getWindSpeed()
    const sunTimes = await weatherClient.getSunTimes()

    const awningPosition = determineAwningPosition(currentWeather, currentWindSpeed, sunTimes)
    console.log("Setting awning to " + awningPosition)

    await awningManager.setPosition(awningPosition)
    awningManager.disconnect()
})()
