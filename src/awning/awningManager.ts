import { AwningPosition } from "./types";

export interface AwningManager {
    setPosition(position: AwningPosition): Promise<void>
    disconnect(): void
}
