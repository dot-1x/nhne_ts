import { type } from "os"
import { DeployCombo } from "../models/combos"

export enum ninjaAttrs {
    red,
    blue,
    green,
    yellow
}


export interface Ninja {
    name: string
    atas: ninjaAttrs,
    kanan: ninjaAttrs,
    bawah: ninjaAttrs,
    kiri: ninjaAttrs,
    availabe_combos: Array<DeployCombo>
}