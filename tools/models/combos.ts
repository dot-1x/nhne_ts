import { type } from "os"

export type attributes = readonly [number, number, number, number]

export interface ComboMap {
    id: number
    attack: number
    defend: number
    hp: number
    agility: number
    trigger: boolean
    ninjas: string[]
}

export interface DeployCombo {
    id_: number
    name: string
    attack: number
    defend: number
    hp: number
    agility: number
    trigger: boolean
    ninjas: Array<string>
    attrs: attributes
}