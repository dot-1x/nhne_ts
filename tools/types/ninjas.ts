import { type } from "os"
import { DeployCombo } from "./combos"

export enum NinjaAttrs {
    RED,
    BLUE,
    GREEN,
    YELLOW
}

export interface Ninja {
    name: string | null
    atas: NinjaAttrs
    kanan: NinjaAttrs
    bawah: NinjaAttrs
    kiri: NinjaAttrs
    availabe_combos: DeployCombo[]
}

export type ninjaRow = [Ninja, Ninja, Ninja, Ninja, Ninja]
export type ninjaT = {
    [key: string]: {
        id: number
        attribute: string[]
    }
}