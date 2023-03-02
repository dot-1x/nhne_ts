import { DeployCombo } from "./types/combos";
import { getCombo, getCombos } from "./utils/utils.combo";
import combos from "./deploy_combos.json"
import { inspect } from "util";
import { getNinjas } from "./utils/utils.ninja";


type Keys = "hp" | "attack" | "defend" | "agility"

export class Combo{
    combos: DeployCombo[]
    constructor(combos: DeployCombo[]) {
        this.combos = combos
    }

    /**
     * return current total atrribute
     */
    get total() {
        const reduced = this.combos.reduce(
            (prev, current) => (
                {
                    atk: prev.atk += current.attack,
                    def: prev.def += current.defend,
                    hp: prev.hp += current.hp,
                    agi: prev.agi += current.agility
                }
            ),
            { atk: 0, def: 0, hp: 0, agi: 0 }
        )
        const { atk: attack, agi: agility, def: defend, hp: hp } = reduced
        return `(attack: ${attack}, defend: ${defend}, hp: ${hp}, agility: ${agility})`
    }

    get length() {
        return this.combos.length
    }

    /**
     * return current availabe combo by name
     */
    get comboNames() {
        return this.combos.map(v => v.name)
    }

    /**
     * returns Array of attribute of current combos
     */
    get attrTable() {
        return this.combos.map(v => [v.attack, v.defend, v.hp, v.agility])
    }

    sort(by: Keys, asc?: boolean) {
        if (!["hp", "attack", "defend", "agility"].includes(by)) throw new Error("Invalid argument specifiers");
        return this.combos.sort(
            (a, b) => asc? a[by] - b[by] : b[by] - a[by]
        )
    }

    /**
     * return an array filtering combo by key
     * @param by specify which key to filter
     */
    filter(by: Keys) {
        return this.combos.filter(
            (v) => v[by] > 0
        )
    }
}

/**
 * return all available combo
 */
export function getAllCombo() {
    return new Combo(getCombos(...Object.keys(combos)))
}

/**
 * return all available combos and filter by keys
 * @param by Array of Keys to filter
 */
export function filterAllCombo(by: Keys[]) {
    const combs = getCombos(...Object.keys(combos)).filter(
        v => by.some(key => v[key] > 0)
    )
    return new Combo(combs)
}