import { Clouds, isClouds, isRain, isThunderstorm, Weather } from "./types"

export function isWeatherRainyEnough(weather: Weather): boolean {
    if (isRain(weather)) {
        return true
    }

    if (isThunderstorm(weather)) {
        return true
    }

    if (isClouds(weather)) {
        switch (weather as Clouds) {
            case "Few": return false
            case "Scattered": return false
            default: return true
        }
    }

    if (weather === "Drizzle") {
        return true
    }

    return false
}
