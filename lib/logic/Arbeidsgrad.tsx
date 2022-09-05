import { Result } from "../../components/result/Result"
import { toKr } from "../utils/HjelpeFunksjoner"
const ARBEIDSGRENSE = 60.0

const invertedPercent = (percent: number) => {
    return (100 - percent) / 100
}

export const arbeidsgrad = (resultat: Result) => {
    const gammeltResultat = resultat.resultat
    if (
        !resultat.personInfo!!.harArbeid ||
        resultat.personInfo!!.arbeidsgrad == 0.0
    ) {
        return
    }

    if (resultat.personInfo!!.arbeidsgrad!! < 0) {
        throw new Error("Arbeidsgrad kan ikke være mindre enn 0")
    }
    if (resultat.personInfo!!.arbeidsgrad!! > ARBEIDSGRENSE) {
        resultat.resultat = 0.0
        resultat.logs = []
        resultat.logs.push(<p>Arbeidsgraden din er høyere enn 60 % og du kan derfor ikke få arbeidsavklaringspenger.</p>)
        return
    }

    resultat.resultat *= invertedPercent(resultat.personInfo!!.arbeidsgrad!!)
    resultat.logs.push(
        <p>
            En arbeidsuke er 37,5 timer. Siden du jobber {resultat.personInfo!!.arbeidsgrad!!/100*37.5} timer i uka, som er {(resultat.personInfo!!.arbeidsgrad)?.toFixed(0)} % av en vanlig arbeidsuke, blir
            arbeidsavklaringspengene redusert med {(resultat.personInfo!!.arbeidsgrad)?.toFixed(0)} %, fra {toKr(gammeltResultat)} kr til <strong>{toKr(resultat.resultat)} kr</strong>.
        </p>
    )
}
