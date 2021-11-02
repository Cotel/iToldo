import * as dotenv from "dotenv"
import * as winston from "winston"
import { determineAwningPosition } from "./awning/functions"
import { TuyaAwningManagerFactory } from "./awning/tuyaAwningManager"
import { OpenWWeatherClient } from "./weather/openWeather"
import { isClouds, isRain, isThunderstorm, Weather } from "./weather/types"
import * as DailyRotateFile from "winston-daily-rotate-file"

const weatherType = (weather: Weather): string | null => {
    if (isRain(weather)) return 'Rain'
    if (isClouds(weather)) return "Clouds"
    if (isThunderstorm(weather)) return "Thunderstorm"
    return null
}

export const script = (async () => {
    dotenv.config({ path: __dirname + "/../.env" })
    const loggerFormat = winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
    )
    const logger = winston.createLogger({
        level: 'info',
        format: loggerFormat,
        transports: [ 
            new winston.transports.Console(),
            new DailyRotateFile({
                filename: __dirname + "/../logs/automaticMode-%DATE%.log",
                level: 'info',
                datePattern: "YYYY-MM-DD",
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d'
            })
        ]
    })

    const weatherClient = new OpenWWeatherClient()
    const awningManager = await TuyaAwningManagerFactory.create()

    const currentWeather = await weatherClient.getCurrentWeather()
    const currentWindSpeed = await weatherClient.getWindSpeed()
    const sunTimes = await weatherClient.getSunTimes()

    const weatherString = weatherType(currentWeather) ? `${weatherType(currentWeather)} (${currentWeather})` : currentWeather
    logger.info(`Current weather: ${weatherString} | Current wind speed: ${currentWindSpeed.toFixed(2)}km/h`)

    const awningPosition = determineAwningPosition(currentWeather, currentWindSpeed, sunTimes)
    logger.info(`Setting awning to ${awningPosition}`)

    await awningManager.setPosition(awningPosition)
    awningManager.disconnect()
})

script()
