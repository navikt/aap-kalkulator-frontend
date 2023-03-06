import { Result } from "../../components/result/Result"
import { toKr } from "../utils/HjelpeFunksjoner"
const ARBEIDSGRENSE = 60.0

const invertedPercent = (percent: number) => {
    return (100 - percent) / 100
}

export const arbeidsgrad = (resultat: Result) => {
    /*resultat.logs.push({ id: "logic.work.any" })*/
    const gammeltResultat = resultat.resultat
    if (resultat.personInfo!!.arbeidsgrad == 0.0) {
        return
    }

    if (resultat.personInfo!!.arbeidsgrad!! < 0) {
        throw new Error("Arbeidsgrad kan ikke være mindre enn 0")
    }

    if (resultat.personInfo!!.arbeidsgrad!! > ARBEIDSGRENSE) {
        resultat.resultat = 0.0
        resultat.logs = []
        resultat.logs.push({ id: "logic.work.tooMuch", values: {} })
        return
    }
    console.log("resultat:", resultat)

    resultat.resultat *= invertedPercent(resultat.personInfo!!.arbeidsgrad!!)
    resultat.logs.push({
        id: "logic.work.justEnough",
        values: {
            hoursWorked: (
                (resultat.personInfo!!.arbeidsgrad!! / 100) *
                37.5
            ).toString(),
            percentWorked: resultat.personInfo!!.arbeidsgrad?.toFixed(0),
            percentWorked2: resultat.personInfo!!.arbeidsgrad?.toFixed(0),
            oldRes: toKr(gammeltResultat),
            res: toKr(resultat.resultat),
        },
    })
}
