import { determineAwningPosition } from "../src/awning/functions";
import { SunTimes } from "../src/weather/types";
import { plot, Plot } from "nodeplotlib"

const range = (from, to, step = 1) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

const October_29_SunTimes: SunTimes = {
    sunrise: 1635488873000,
    sunset: 1635527160000
}
const startOfDay = 1635458400
const endOfDay = 1635544799
const millisRange = range(startOfDay, endOfDay, 300)
const awningPositions = millisRange.map(now => determineAwningPosition("Clear", 10, October_29_SunTimes, new Date(now * 1000)))
const result: Plot[] = [{
    x: millisRange.map(millis => {
        const date = new Date(millis * 1000)
        return date.toLocaleTimeString()
    }),
    y: awningPositions,
    type: "scatter"
}]

plot(result)