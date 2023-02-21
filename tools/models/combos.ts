import { type } from "os"

export type attributes = readonly [number, number, number, number]

export interface DeployCombo {
    name: string
    id: number
    attack: number
    defend: number
    hp: number
    agility: number
    trigger: boolean
    ninjas: Array<string>
    attrs: attributes
}

export type comboT = {
    [key: string]: {
        id: number
        attack: number
        defend: number
        hp: number
        agility: number
        trigger: boolean
        ninjas: Array<string>
    }
}
