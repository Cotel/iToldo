import axios from "axios";
import { SunTimes, Weather } from "./types";
import { WeatherClient } from "./weatherClient";

type OpenWeatherWeather = 'Thunderstorm' | 'Drizzle' | 'Rain' | 'Snow' | 'Clear' | 'Clouds'

interface OpenWeatherResponse {
    weather: [{ main: OpenWeatherWeather, description: string }],
    main: { temp: number, temp_min: number, temp_max: number, humidity: number, feels_like: number },
    wind: { speeg: number, deg: number },
    sys: { sunrise: number, sunset: number }
}

export class OpenWWeatherClient implements WeatherClient {
    private currentWeather?: OpenWeatherResponse = null

    async getWindSpeed(): Promise<number> {
        if (!this.currentWeather) { await this.makeCurrentWeatherRequest() }

        return this.currentWeather.wind.speeg * 3.6
    }

    async getCurrentWeather(): Promise<Weather> {
        if (!this.currentWeather) { await this.makeCurrentWeatherRequest() }

        return this.parseWeather(this.currentWeather.weather[0])
    }

    async getSunTimes(): Promise<SunTimes> {
        if (!this.currentWeather) { await this.makeCurrentWeatherRequest() }

        return <SunTimes>({
            sunrise: this.currentWeather.sys.sunrise * 1000,
            sunset: this.currentWeather.sys.sunset * 1000
        })
    }

    private async makeCurrentWeatherRequest() {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${process.env.OPENWEATHER_ZIP_CODE}&appid=${process.env.OPENWEATHER_API_KEY}`)
        this.currentWeather = result.data
    }

    private parseWeather(weather: { main: OpenWeatherWeather, description: string }): Weather {
        switch (weather.main) {
            case "Clear": return "Clear"
            case "Drizzle": return "Drizzle"
            case "Snow": return "Drizzle"
            case "Clouds":
                switch (weather.description) {
                    case "few clouds": return "Few"
                    case "scattered clouds": return "Scattered"
                    case "broken clouds": return "Broken"
                    case "overcast clouds": return "Overcast"
                    default: return "Few"
                }
            case "Rain":
                switch (weather.description) {
                   case "light rain": return "Light"
                   case "moderate rain": return "Moderate"
                   case "heavy intensity rain": return "Heavy"
                   case "very heavy rain": return "Very Heavy"
                   case "extreme rain": return "Extreme"
                   default: return "Light" 
                }
            case "Thunderstorm":
                switch (weather.description) {
                    case "thunderstorm with light rain": return "With Light Rain"
                    case "thunderstorm with rain": return "With Rain"
                    case "thunderstorm with heavy rain": return "With Heavy Rain"
                    case "light thunderstorm": return "Light"
                    case "thunderstorm": return "Normal"
                    case "heavy thunderstorm": return "Heavy"
                    case "ragged thunderstorm": return "Ragged"
                    case "thunderstorm with light drizzle": return "With Light Drizzle"
                    case "thunderstorm with drizzle": return "With Drizzle"
                    case "thunderstorm with heavy drizzle": return "With Heavy Drizzle"
                }
        }
    }
}