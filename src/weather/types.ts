/**
 * Weather descriptions found in openweather api https://openweathermap.org/weather-conditions
 */

export type WindSpeed = number

export type Weather = 'Clear' | Clouds | Rain | 'Drizzle' | Thunderstorm | 'Mist' | 'Haze' | 'Fog'

const rain = ['Light', 'Moderate', 'Heavy', 'Very Heavy', 'Extreme'] as const
export type Rain = (typeof rain)[number]
export const isRain = (x: any): x is Rain => rain.includes(x)

const clouds = ['Overcast', 'Broken', 'Scattered', 'Few'] as const
export type Clouds = (typeof clouds)[number]
export const isClouds = (x: any): x is Clouds => clouds.includes(x)

const thunderstorm = ['With Light Rain', 'With Rain', 'With Heavy Rain', 'Light', 'Normal', 'Heavy', 'Ragged', 'With Light Drizzle', 'With Drizzle', 'With Heavy Drizzle'] as const
export type Thunderstorm = (typeof thunderstorm)[number]
export const isThunderstorm = (x: any): x is Thunderstorm => thunderstorm.includes(x)

export interface SunTimes {
    sunrise: number
    sunset: number
}

export const noon = ({sunrise, sunset}: SunTimes): number => (sunrise + sunset) / 2