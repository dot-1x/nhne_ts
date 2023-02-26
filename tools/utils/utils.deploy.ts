import { Ninja } from "../types/ninjas";


export function checkConnected(main_ninjas: Ninja[], deploy_ninjas: Ninja[]): [number, [Ninja[], Ninja[], Ninja[]]] {
    if (deploy_ninjas.length != 12 || main_ninjas.length != 3) throw new Error("Mismatch ninja length!")

    const [row1, row2, row3] = [deploy_ninjas.slice(0, 5), [deploy_ninjas[5], ...main_ninjas, deploy_ninjas[6]], deploy_ninjas.slice(7)]

    const upmid = row1.filter((v, i) => v.bawah === row2[i].atas).length
    const downmid = row2.filter((v, i) => v.bawah === row3[i].atas).length
    const r1 = row1.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length
    const r2 = row2.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length
    const r3 = row3.filter((v, i, arr) => v.kanan === arr[i + 1]?.kiri).length

    return [upmid + downmid + r1 + r2 + r3, [row1, row2, row3]]
}