import { type } from "os"
import { DeployCombo } from "./combos"

export enum NinjaAttrs {
    RED,
    BLUE,
    GREEN,
    YELLOW
}

export interface Ninja {
    name: string
    atas: NinjaAttrs
    kanan: NinjaAttrs
    bawah: NinjaAttrs
    kiri: NinjaAttrs
    availabe_combos: DeployCombo[]
}

export type ninjaT = {
    [key: string]: {
        id: number
        attribute: string[]
    }
}