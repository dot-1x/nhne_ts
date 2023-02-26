import { DeployCombo } from "./types/combos";
import { getCombo, getCombos } from "./utils/utils.combo";
import combos from "./deploy_combos.json"


type Keys = "hp" | "attack" | "defend" | "agility"

class Combo{
    combos: DeployCombo[]
    constructor(combos: DeployCombo[]) {
        this.combos = combos
    }

    get total() {
        const [attack, agility, defend, hp] = [
            this.combos.reduce((p, c) => p += c.attack, 0),
            this.combos.reduce((p, c) => p += c.agility, 0),
            this.combos.reduce((p, c) => p += c.defend, 0),
            this.combos.reduce((p, c) => p += c.hp, 0),
        ]
        return `(attack: ${attack}, defend: ${defend}, hp: ${hp}, agility: ${agility},)`
    }

    get length() {
        return this.combos.length
    }

    sort(by: Keys, asc?: boolean) {
        if (!["hp", "attack", "defend", "agility"].includes(by)) throw new Error("Invalid argument specifiers");
        return this.combos.sort(
            (a, b) => asc? a[by] - b[by] : b[by] - a[by]
        )
    }

    filter(by: Keys) {
        /**
         * return an array filtering combo by key
         * @param by specify which key to filter
         */
        return this.combos.filter(
            (v) => v[by] > 0
        )
    }

}

function getAllCombo() {
    /**
     * return all available combo
     */
    return new Combo(getCombos(...Object.keys(combos)))
}

function filterAllCombo(by: Keys[]) {
    /**
     * return all available combos and filter by keys
     * @param by Array<key> to filter
     */
    const combs = getCombos(...Object.keys(combos)).filter(
        (v) => {
            for (const key of by) {
                if (v[key] > 0) return true;
            }
            return false
        }
    )
    return new Combo(combs)
} 