import { SunTimes, Weather, WindSpeed } from "./types";

interface WeatherClient {
    getWindSpeed(): Promise<WindSpeed>
    getCurrentWeather(): Promise<Weather>
    getSunTimes(): Promise<SunTimes>
}
