import { awningPositionBasedOnSunTimes, determineAwningPosition } from "../../src/awning/functions"
import { noon, SunTimes } from "../../src/weather/types"

const October_29_SunTimes: SunTimes = {
    sunrise: 1635488873000,
    sunset: 1635527160000
}

describe("determineAwningPosition", () => {
    test("if wind speed is over threshold it should close the awning", () => {
        const awningPosition = determineAwningPosition("Clear", 25, October_29_SunTimes)

        expect(awningPosition).toBe(0.0)
    })

    test("if weather is rainy enough it should open the awning a little bit", () => {
        const awningPosition = determineAwningPosition("Light", 12, October_29_SunTimes)
        
        expect(awningPosition).toBe(0.10)
    })
})

describe("awningPositionBasedOnSunTimes", () => {
    test("if now is noon it should fully open the awning", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, noon(October_29_SunTimes))

        expect(awningPosition).toBe(1.0)
    })

    test("if now is halfway to noon it should return half awning position", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, 1635498512000)

        expect(awningPosition).toBe(0.5)
    })

    test("if now is sunrise it should return closed awning position", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, October_29_SunTimes.sunrise)

        expect(awningPosition).toBe(0)
    })

    test("if now is previous to sunrise it should return closed awning", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, 1635478331000)

        expect(awningPosition).toBe(0)
    })

    test("if now is shortly after noon it should return almost open awning", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, 1635508800000)

        expect(awningPosition).toBe(0.96)
    })

    test("if now is close to sunset it should return almost closed awning", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, 1635526800000)

        expect(awningPosition).toBe(0.02)
    })

    test("if now is after sunset it should return closed awning", () => {
        const awningPosition = awningPositionBasedOnSunTimes(October_29_SunTimes, 1635541200000)

        expect(awningPosition).toBe(0.0)
    })
})