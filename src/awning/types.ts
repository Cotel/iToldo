enum AwningPositionBrand { _ = "" }
export type AwningPosition = AwningPositionBrand & number
export function awningPosition(n: number): AwningPosition {
    if (0.0 <= n && n <= 1.0) {
        return n as AwningPosition
    } else {
        throw TypeError("n is not in range (0 <= n <= 1)")
    }
}
