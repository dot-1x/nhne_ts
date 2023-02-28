import {DeployCombo, attributes, comboT} from "../types/combos"
import combos from "../deploy_combos.json"
import { type } from "os"

const COMBOS = combos as comboT

export function getCombo(name: string): DeployCombo | null {
    const combo = COMBOS[name]
    if (!combo) return null;
    return {
        name: name,
        ...combo,
        get attrs() : attributes {
            return [this.attack, this.defend, this.hp, this.agility]
        }
    }
}

export function getCombos(...names: string[]): DeployCombo[] {
    return names.map(
        v => getCombo(v)
    ).filter(
        v => v
    ) as DeployCombo[]
}