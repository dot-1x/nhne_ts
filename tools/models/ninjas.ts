import { type } from "os"
import { DeployCombo } from "./combos"

export enum ninjaAttrs {
    red,
    blue,
    green,
    yellow
}

export interface Ninja {
    name: string
    atas: ninjaAttrs
    kanan: ninjaAttrs
    bawah: ninjaAttrs
    kiri: ninjaAttrs
    availabe_combos: DeployCombo[]
}

export type ninjaT = {
    [key: string]: {
        id: number
        attribute: string[]
    }
}