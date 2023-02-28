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

export function getNinja(name: string): Ninja | null {
    const ninja = NINJAS[name]
    if (!ninja) return null;
    const [atas, kanan, bawah, kiri] = ninja.attribute.map(v => attrMapping[v])
    return {
        name,
        atas: atas,
        kanan: kanan,
        bawah: bawah,
        kiri: kiri,
        get availabe_combos(): DeployCombo[] {
            const found = Object.entries(COMBOS).filter(
                ([, val]) => val.ninjas.includes(this.name)
            ).map(
                ([key,]) => getCombo(key)
            )
            return found as DeployCombo[]
        }
    }
}

export function getNinjas(...names: string[]): Ninja[] {
    return names.map(
        v => getNinja(v)
    ).filter(
        v => v
    ) as Ninja[]
}
