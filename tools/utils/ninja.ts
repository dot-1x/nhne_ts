import { type } from "os"
import { DeployCombo } from "../models/combos"
import { generate_combo } from "./combo"

enum ninjaAttrs {
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

const combos: DeployCombo[] = [
    generate_combo(
        1, "testcombo1", 2, 2, 2, 2, false, ["gaara"]
    )
]