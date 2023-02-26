import { Ninja } from "./types/ninjas"
import { MAX_NINJAS } from "./data"
import { checkConnected } from "./utils/utils.deploy"
import { getNinjas } from "./utils/utils.ninja"


class Deploy{
    main_ninjas: Ninja[]
    deploy_ninjas: Ninja[]
    current_branchs: number
    rows: [Ninja[], Ninja[], Ninja[]]
    constructor(main_ninjas: Ninja[], deploy_ninjas: Ninja[], ignore_dupe?: boolean) {
        if (main_ninjas.length + deploy_ninjas.length !== MAX_NINJAS) throw new Error("All ninja length doesn't met requirement (15)");

        if (ignore_dupe && main_ninjas.every(v => deploy_ninjas.includes(v))) throw new Error("Dupe ninja found!");

        this.main_ninjas = main_ninjas
        this.deploy_ninjas = deploy_ninjas

        const [current_branchs, rows] = checkConnected(main_ninjas, deploy_ninjas)
        this.current_branchs = current_branchs
        this.rows = rows
    }
}
