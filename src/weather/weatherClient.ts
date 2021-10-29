import { SunTimes, Weather, WindSpeed } from "./types";

export interface WeatherClient {
    getWindSpeed(): Promise<WindSpeed>
    getCurrentWeather(): Promise<Weather>
    getSunTimes(): Promise<SunTimes>
}