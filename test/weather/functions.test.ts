import { isWeatherRainyEnough } from "../../src/weather/functions"
import { Clouds, Rain, Thunderstorm, Weather } from "../../src/weather/types"

describe("isWeatherRainyEnough", () => {
    test("if weather is any kind of Rain it should return true", () => {
        const rainyWeathers: Array<Rain> = [
            "Light", "Moderate", "Heavy", "Very Heavy", "Extreme"
        ]

        const areRainyWeathers = rainyWeathers.map(w => isWeatherRainyEnough(w))

        expect(areRainyWeathers.every(c => c === true)).toBeTruthy()
    })

    test("if weather is any kind of Thunderstorm it should return true", () => {
        const thunderWeathers: Array<Thunderstorm> = [
            "Light", "Normal", "Heavy", "Ragged",
            "With Light Rain", "With Light Rain", "With Heavy Rain",
            "With Light Drizzle", "With Drizzle", "With Heavy Drizzle"
        ]

        const areRainyWeathers = thunderWeathers.map(w => isWeatherRainyEnough(w))

        expect(areRainyWeathers.every(c => c === true)).toBeTruthy()
    })

    test("if weather is Drizzle it should return true", () => {
        expect(isWeatherRainyEnough("Drizzle")).toBeTruthy()
    })

    test("if weather is cloudy it should return true", () => {
        const clouds: Array<Clouds> = [
            "Few", "Scattered", "Broken", "Overcast"
        ]

        const areRainyWeathers = clouds.map(w => isWeatherRainyEnough(w))

        expect(areRainyWeathers.every(c => c === true)).toBeTruthy()
    })

    test("every other weather should return false", () => {
        const weathers: Array<Weather> = ([
            "Clear", "Mist", "Haze", "Fog"
        ] as Weather[])

        const areRainyWeathers = weathers.map(w => isWeatherRainyEnough(w))

        expect(areRainyWeathers.every(c => c === false)).toBeTruthy()
    })
})