import { type } from "os";
import { comboT, DeployCombo } from "../models/combos";
import { Ninja, ninjaAttrs, ninjaT } from "../models/ninjas";
import { getCombo } from "./combo";
import ninjas from "../ninja_deploys.json"
import combos from "../deploy_combos.json"

const attrMapping: {[key: string]: ninjaAttrs} = {
    "Biru": ninjaAttrs.blue,
    "Merah": ninjaAttrs.red,
    "Hijau": ninjaAttrs.green,
    "Kuning": ninjaAttrs.yellow
}

const NINJAS = ninjas as ninjaT
const COMBOS = combos as comboT

const defaultNinja: Ninja = {
    name: "null",
    atas: ninjaAttrs.blue,
    kanan: ninjaAttrs.blue,
    bawah: ninjaAttrs.blue,
    kiri: ninjaAttrs.blue,
    availabe_combos: []
}

export function checkConnected(main_ninjas: Ninja[], deploy_ninjas: Ninja[]): [number, [Ninja[], Ninja[], Ninja[]]] {
    if (deploy_ninjas.length != 12 || main_ninjas.length != 3) throw new Error("Mismatch ninja length!")

    const [row1, row2, row3] = [deploy_ninjas.slice(0, 5), [deploy_ninjas[5], ...main_ninjas, deploy_ninjas[6]], deploy_ninjas.slice(7)]

    const upmid = row1.filter((v, i) => v.bawah === row2[i].atas).length
    const downmid = row2.filter((v, i) => v.bawah === row3[i].atas).length
    const r1 = row1.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length
    const r2 = row2.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length
    const r3 = row3.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length

    return [upmid + downmid + r1 + r2 + r3, [row1, row2, row3]]
}

export function getNinja(name: string): Ninja {
    const ninja_ = NINJAS[name]
    if (!ninja_) defaultNinja;
    const [atas, kanan, bawah, kiri] = ninja_.attribute.map(v => attrMapping[v])
    return {
        name,
        atas: atas,
        kanan: kanan,
        bawah: bawah,
        kiri: kiri,
        get availabe_combos(): DeployCombo[] {
            const found = Object.entries(COMBOS).filter(
                ([_, val]) => { val.ninjas.includes(this.name) }
            ).map(
                ([key, _]) => getCombo(key)
            )
            return found
        }
    }
}

export function getNinjas(...names: string[]) {
    return names.map(
        v => getNinja(v)
    ).filter(
        v => v.name !== "null"
    )
}
