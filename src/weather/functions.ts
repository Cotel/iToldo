import { isClouds, isRain, isThunderstorm, Weather } from "./types"

export function isWeatherRainyEnough(weather: Weather): boolean {
    if (isRain(weather)) {
        return true
    }

    if (isThunderstorm(weather)) {
        return true
    }

    if (isClouds(weather)) {
        return true
    }

    if (weather === "Drizzle") {
        return true
    }

    return false
}
