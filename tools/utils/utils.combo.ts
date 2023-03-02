import {DeployCombo, attributes, comboT} from "../types/combos"
import combos from "../deploy_combos.json"
import { type } from "os"

const COMBOS = combos as comboT

/**
 * will search combo name, and return that Combo if valid, null otherwise
 * @param name combo name to search
 * @returns DeployCombo | null
 */
export function getCombo(name: string): DeployCombo {
    const combo = COMBOS[name]
    if (!combo) throw new Error(`Combo name "${name}" not found!`);
    return {
        name: name,
        ...combo,
        get attrs() : attributes {
            return [this.attack, this.defend, this.hp, this.agility]
        }
    }
}

/**
 * iterate through all passed name, and get them and filter invalid combo name
 * @param names combo name to search
 * @returns DeployCombo[]
 */
export function getCombos(...names: string[]): DeployCombo[] {
    return names.map(
        v => getCombo(v)
    )
}