import Resultat from "../../pages/resultat";
import {Result} from "../../components/result/Result";
import {toKr} from "./Inntekt";


export const arbeidsgrad = (resultat: Result) => {
    const gammeltResultat = resultat.resultat

    if (resultat.personInfo!!.arbeidsgrad!! > 60.0) {
        resultat.resultat = 0.0
        resultat.logs = [<p key="first">Arbeidsgraden din er høyere enn 60 % og du kan derfor ikke få arbeidsavklaringspenger.</p>]
        return
    }
    if (resultat.personInfo!!.arbeidsgrad == 0.0) {
        return
    }
    resultat.resultat *= ((100 - resultat.personInfo!!.arbeidsgrad!!) / 100)
    resultat.logs.push(
        <p>En arbeidsuke er 37,5 timer. Siden du jobber {resultat.personInfo!!.arbeidstimer} timer i uka, som er {resultat.personInfo!!.arbeidsgrad}% av en vanlig arbeidsuke, blir arbeidsavklaringspengene redusert med {resultat.personInfo!!.arbeidsgrad} %, fra {toKr(gammeltResultat)} kr til <strong>{toKr(resultat.resultat)} kr</strong>.</p>
    )
}
