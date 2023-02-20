import {DeployCombo, attributes} from "../models/combos"


export function generate_combo(
    id_: number,
    name_: string,
    attack: number,
    defend: number,
    hp: number,
    agility: number,
    trigger: boolean,
    ninjas: string[]
): DeployCombo {
    return {
        id_: id_,
        name: name_,
        attack: attack,
        defend: defend,
        hp: hp,
        agility: agility,
        trigger: trigger,
        ninjas: ninjas,
        get attrs() : attributes {
            return [this.attack, this.defend, this.hp, this.agility]
        }
    }
}