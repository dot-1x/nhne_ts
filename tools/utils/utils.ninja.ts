import { type } from "os";
import { comboT, DeployCombo } from "../types/combos";
import { Ninja, NinjaAttrs, ninjaT } from "../types/ninjas";
import { getCombo } from "./utils.combo";
import ninjas from "../ninja_deploys.json"
import combos from "../deploy_combos.json"

const attrMapping: {[key: string]: NinjaAttrs} = {
    "Biru": NinjaAttrs.BLUE,
    "Merah": NinjaAttrs.RED,
    "Hijau": NinjaAttrs.GREEN,
    "Kuning": NinjaAttrs.YELLOW
}

const NINJAS = ninjas as ninjaT
const COMBOS = combos as comboT

const defaultNinja: Ninja = {
    name: null,
    atas: NinjaAttrs.BLUE,
    kanan: NinjaAttrs.BLUE,
    bawah: NinjaAttrs.BLUE,
    kiri: NinjaAttrs.BLUE,
    availabe_combos: []
}

export function getNinja(name: string): Ninja {
    const ninja = NINJAS[name]
    if (!ninja) return defaultNinja;
    const [atas, kanan, bawah, kiri] = ninja.attribute.map(v => attrMapping[v])
    return {
        name,
        atas: atas,
        kanan: kanan,
        bawah: bawah,
        kiri: kiri,
        get availabe_combos(): DeployCombo[] {
            const found = Object.entries(COMBOS).filter(
                ([, val]) => this.name ? val.ninjas.includes(this.name) : false 
            ).map(
                ([key,]) => getCombo(key)
            )
            return found
        }
    }
}

export function getNinjas(...names: string[]) {
    return names.map(
        v => getNinja(v)
    ).filter(
        v => v.name != null
    )
}
