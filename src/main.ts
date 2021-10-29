/**
 * Weather descriptions found in openweather api https://openweathermap.org/weather-conditions
 */

const WIND_SPEED_THRESHOLD_KMpS = 25
const AWNING_POSITION_WHEN_RAINING = awningPosition(0.10)
type WindSpeed = number

type Clouds = 'Overcast' | 'Broken' | 'Scattered' | 'Few'
type Rain = 'Light' | 'Moderate' | 'Heavy' | 'Very Heavy' | 'Extreme'
type Thunderstorm = 'With Light Rain' | 'With Rain' | 'With Heavy Rain' | 'Light' | 'Normal' | 'Heavy' | 'Ragged' | 'With Light Drizzle' | 'With Drizzle' | 'With Heavy Drizzle'
type Weather = 'Clear' | Clouds | Rain | 'Drizzle' | Thunderstorm | 'Mist' | 'Haze' | 'Fog'


interface WeatherClient {
    getWindSpeed(): Promise<WindSpeed>
    getCurrentWeather(): Promise<Weather>
}

interface AwningManager {
    setPosition(position: AwningPosition): void
}

enum AwningPositionBrand { _ = "" }
type AwningPosition = AwningPositionBrand & number
function awningPosition(n: number): AwningPosition {
    if (!Number.isInteger(n) && 0.0 <= n && n <= 1.0) {
        return n as AwningPosition
    } else {
        throw TypeError("n is not in range (0 <= n <= 1)")
    }
}

function determineAwningPosition(currentWeather: Weather, windSpeed: WindSpeed): AwningPosition {
    if (windSpeed >= WIND_SPEED_THRESHOLD_KMpS) return awningPosition(0.0)

    if (isWeatherRainyEnough(currentWeather)) return AWNING_POSITION_WHEN_RAINING

    return awningPosition(0.5)
}

function isWeatherRainyEnough(weather: Weather): boolean {
    if (weather as Rain) {
        return true
    }

    if (weather as Thunderstorm) {
        return true
    }

    if (weather === "Drizzle") {
        return true
    }

    return false
}

