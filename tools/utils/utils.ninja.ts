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


function matchRegex(name: string): {
    id: number;
    attribute: string[];
} | null {
    const pattern = name.split(" ").flatMap(
        (v) => /[a-z]/g.test(v) ?  v.toUpperCase() : [...v].map(letter => `${letter}\\w+`)
    )
    const re = new RegExp(pattern.join(" "))
    for (const key of Object.keys(NINJAS)) {
        if (re.test(key.toUpperCase())) {
            return NINJAS[key]
        }
    }
    return null
}

/**
 * will search Ninja name, and return that Ninja if valid, null otherwise
 * @param name Ninja name to search
 * @returns Ninja | null
 */
export function getNinja(name: string): Ninja {
    const ninja = name in NINJAS ? NINJAS[name] : matchRegex(name)
    if (!ninja) throw new Error(`Ninja name "${name}" not found!`);
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

/**
 * iterate through all passed name, and get them and filter invalid Ninja name
 * @param names Ninja name to search
 * @returns Ninja[]
 */
export function getNinjas(...names: string[]): Ninja[] {
    return names.map(
        v => getNinja(v)
    ).filter(
        v => v
    ) as Ninja[]
}
