import { Result } from "../../components/result/Result"
import { toKr } from "../utils/HjelpeFunksjoner"
const ARBEIDSGRENSEMEDAAP = 60.0
const ARBEIDSGRENSEUTENAAP = 50.0
const invertedPercent = (percent: number) => {
    return (100 - percent) / 100
}

export const arbeidsgrad = (resultat: Result) => {
    const gammeltResultat = resultat.resultat
    if (
        resultat.personInfo!!.arbeidsgrad == 0.0 ||
        !resultat.personInfo!!.harArbeid
    ) {
        resultat.logs.push({ id: "logic.work.noWork" })
        resultat.logs.push({ id: "logic.work.onAll" })
        return
    }

    if (resultat.personInfo!!.arbeidsgrad!! < 0) {
        throw new Error("Arbeidsgrad kan ikke være mindre enn 0")
    }

    if (
        (resultat.personInfo!!.arbeidsgrad!! > ARBEIDSGRENSEUTENAAP &&
            !resultat.personInfo!!.harAAP) ||
        resultat.personInfo!!.arbeidsgrad!! > ARBEIDSGRENSEMEDAAP
    ) {
        resultat.resultat = 0.0
        resultat.logs = []
        resultat.logs.push({
            id: resultat.personInfo?.harAAP
                ? "logic.work.tooMuchWithAAP"
                : "logic.work.tooMuchWithoutAAP",
            values: {
                timer: resultat.personInfo!!.arbeidstimer!!.toString(),
                prosent: resultat.personInfo!!.arbeidsgrad!!.toFixed(0),
            },
        })
        return
    }

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
    resultat.logs.push({ id: "logic.work.onAll" })
}
