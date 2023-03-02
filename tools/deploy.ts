import { Ninja } from "./types/ninjas"
import { MAX_NINJAS } from "./data"
import { checkConnected } from "./utils/utils.deploy"
import { getNinjas } from "./utils/utils.ninja"
import { getCombos } from "./utils/utils.combo"
import { Combo } from "./combo"


export class Deploy{
    main_ninjas: Ninja[]
    deploy_ninjas: Ninja[]
    current_branchs: number
    current_ninja: string[]
    rows: [Ninja[], Ninja[], Ninja[]]
    constructor(main_ninjas: Ninja[], deploy_ninjas: Ninja[], ignore_dupe?: boolean) {
        if (main_ninjas.length + deploy_ninjas.length !== MAX_NINJAS) throw new Error("All ninja length doesn't met requirement (15)");

        if (ignore_dupe && main_ninjas.every(v => deploy_ninjas.includes(v))) throw new Error("Dupe ninja found!");

        this.main_ninjas = main_ninjas
        this.deploy_ninjas = deploy_ninjas

        const [current_branchs, rows] = checkConnected(main_ninjas, deploy_ninjas)
        this.current_branchs = current_branchs
        this.rows = rows
        this.current_ninja = this.rows.flatMap(v => v.map(n => n.name))
    }

    get availableCombo() {
        const current_combo = new Set(getNinjas(...this.current_ninja).flatMap(v => v.availabe_combos).map(v => v.name))
        const filtered = getCombos(...current_combo).filter(
            v => v.ninjas.every(v => this.current_ninja.includes(v))
        )
        return new Combo(filtered)
    }
}
