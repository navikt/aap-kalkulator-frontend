import { Result } from "../../components/result/Result"
import { toKr } from "../utils/HjelpeFunksjoner"
const ARBEIDSGRENSEMEDAAP = 60.0
const ARBEIDSGRENSEUTENAAP = 50.0
export const invertedPercent = (percent: number) => {
    return (100 - percent) / 100
}

export const overArbeidsGrense = (arbeidsgrad: number, harAAP: boolean) => {
    return (
        (arbeidsgrad!! > ARBEIDSGRENSEUTENAAP && !harAAP) ||
        arbeidsgrad!! > ARBEIDSGRENSEMEDAAP
    )
}

export const jobberIkke = (arbeidsgrad: number, harArbeid: boolean) => {
    return arbeidsgrad == 0.0 || !harArbeid
}

export const arbeidsgrad = (resultat: Result) => {
    const gammeltResultat = resultat.resultat

    if (resultat.personInfo!!.arbeidsgrad!! < 0) {
        throw new Error("Arbeidsgrad kan ikke være mindre enn 0")
    }

    if (
        jobberIkke(
            resultat.personInfo!.arbeidsgrad!,
            resultat.personInfo!.harArbeid!
        )
    ) {
        resultat.logs.push({ id: "logic.work.noWork" })
        resultat.logs.push({ id: "logic.work.onAll" })
        return
    }

    if (
        overArbeidsGrense(
            resultat.personInfo!.arbeidsgrad!,
            resultat.personInfo!.harAAP!
        )
    ) {
        resultat.resultat = 0.0
        resultat.logs = []
        resultat.logs.push({
            id: resultat.personInfo?.harAAP
                ? "logic.work.tooMuchWithAAP"
                : "logic.work.tooMuchWithoutAAP",
            values: {
                timer: resultat.personInfo!.arbeidstimer!.toString(),
                prosent: resultat.personInfo!.arbeidsgrad!.toFixed(0),
            },
        })
        return
    }

    resultat.resultat *= invertedPercent(resultat.personInfo!.arbeidsgrad!)
    resultat.logs.push({
        id: "logic.work.justEnough",
        values: {
            hoursWorked: (
                (resultat.personInfo?.arbeidsgrad! / 100) *
                37.5
            ).toString(),
            percentWorked: resultat.personInfo?.arbeidsgrad?.toFixed(0),
            percentWorked2: resultat.personInfo?.arbeidsgrad?.toFixed(0),
            oldRes: toKr(gammeltResultat),
            res: toKr(resultat.resultat),
        },
    })
    resultat.logs.push({ id: "logic.work.onAll" })
}
