import {DeployCombo, attributes, comboT} from "../types/combos"
import combos from "../deploy_combos.json"
import { type } from "os"

const COMBOS = combos as comboT
const defaultCombo: DeployCombo = {
    name: "null",
    id: -1,
    attack: 0,
    defend: 0,
    hp: 0,
    agility: 0,
    trigger: false,
    attrs: [0, 0, 0, 0],
    ninjas: []
}

export function getCombo(name: string): DeployCombo {
    const combo = COMBOS[name]
    if (!combo) return defaultCombo;
    return {
        name: name,
        ...combo,
        get attrs() : attributes {
            return [this.attack, this.defend, this.hp, this.agility]
        }
    }
}

export function getCombos(...names: string[]) {
    return names.map(
        v => getCombo(v)
    ).filter(
        v => v.name !== "null"
    )
}