import { AWNING_POSITION_WHEN_RAINING, WIND_SPEED_THRESHOLD_KMpS } from "../constants"
import { isWeatherRainyEnough } from "../weather/functions"
import { noon, SunTimes, Weather, WindSpeed } from "../weather/types"
import { AwningPosition, awningPosition } from "./types"

export function determineAwningPosition(
    currentWeather: Weather,
    windSpeed: WindSpeed,
    sunTimes: SunTimes,
    now: Date = new Date()
): AwningPosition {
    if (windSpeed >= WIND_SPEED_THRESHOLD_KMpS) return awningPosition(0.0)

    if (isWeatherRainyEnough(currentWeather)) return AWNING_POSITION_WHEN_RAINING

    return awningPositionBasedOnSunTimes(sunTimes, now.getTime())
}

export function awningPositionBasedOnSunTimes(sunTimes: SunTimes, nowMillis: number): AwningPosition {
    if (nowMillis < sunTimes.sunrise) {
        return awningPosition(0.0)
    }

    if (sunTimes.sunrise <= nowMillis && nowMillis < noon(sunTimes)) {
        return dayAwningPosition(sunTimes, nowMillis)
    }

    if (noon(sunTimes) <= nowMillis && nowMillis < sunTimes.sunset) {
        return noonAwningPosition(sunTimes, nowMillis)
    }

    return awningPosition(0.0)
}

function dayAwningPosition(sunTimes: SunTimes, nowMillis: number): AwningPosition {
    const { sunrise } = sunTimes
    const percentage = (nowMillis - sunrise) / (noon(sunTimes) - sunrise)
    return awningPosition(parseFloat(percentage.toFixed(2)))
}

function noonAwningPosition(sunTimes: SunTimes, nowMillis: number): AwningPosition {
    const { sunset } = sunTimes
    const percentage = 1 - ((nowMillis - noon(sunTimes)) / (sunset - noon(sunTimes)))
    return awningPosition(parseFloat(percentage.toFixed(2)))
}
