import { GrunnbeloepHistorikk } from "./types";
import { Result } from "../../components/result/Result";

export const toKr = (resultat: number) => {
    return new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK' }).format(Math.round(resultat))
}

const forAar = (historikk: GrunnbeloepHistorikk[], inntektsAar: number)=> {
    console.log("hello")
    return historikk.find(h => parseInt(h.dato.toString()) == inntektsAar)
}

const juster = (g: number, historikk: GrunnbeloepHistorikk[], inntektsAar: number, inntekt:number)=> {
    const grunnbeloepForInntektsAar = forAar(historikk,inntektsAar)!!
    const gammelG = grunnbeloepForInntektsAar.grunnbeloep
    const inntektMax = Math.min(inntekt,6 * gammelG)

    return Math.min(inntektMax * g / grunnbeloepForInntektsAar.gjennomsnittPerAar!! , 6 * g)
}

const inntektsjustering = (g: number, historikk: GrunnbeloepHistorikk[], inntektsIndeks: number, resultat: Result) =>{
    const inntektsAar = resultat.personInfo!!.sykmeldtAar!! - (inntektsIndeks)
    const inntekt = [resultat.personInfo!!.inntekt1, resultat.personInfo!!.inntekt2, resultat.personInfo!!.inntekt3].at(-1)
    return juster(g, historikk, inntektsAar, inntekt!!)
}

const inntektsgrunnlag = (g: number, historikk: GrunnbeloepHistorikk[], resultat: Result) => {

    const minsteGrunnlag = 2 * g / 0.66
    const minsteGrunnlagUnder25 = 2 * g  * (2.0/3.0) / 0.66

    const gjennomsnittsInntektFoerOppjustering = (resultat.personInfo!!.inntekt1!! + resultat.personInfo!!.inntekt2!! + resultat.personInfo!!.inntekt3!!) / 3

    const gjennomsnittHoyest = gjennomsnittsInntektFoerOppjustering >= resultat.personInfo!!.inntekt1!!

    const inntekt1 = inntektsjustering(g, historikk, 1, resultat)
    const inntekt2 = inntektsjustering(g, historikk, 2, resultat)
    const inntekt3 = inntektsjustering(g, historikk, 3, resultat)

    const gjennomsnittsInntekt = (inntekt1 + inntekt2 + inntekt3) / 3

    resultat.resultat = Math.min(!resultat.personInfo!!.over25?
        Math.max(gjennomsnittHoyest? gjennomsnittsInntekt : inntekt1, minsteGrunnlagUnder25)
     :
        Math.min(gjennomsnittHoyest? gjennomsnittsInntekt : inntekt1, minsteGrunnlag)
    , 6 * g)

    switch (resultat.resultat) {
        case minsteGrunnlag : {resultat.logs.push(`Siden inntekten din er lavere enn minstebeløpet på 2G (2 ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli oppjustert til ${toKr(resultat.resultat)}. Inntekten din er justert ut fra endring i grunnbeløpet.`)
            break}
        case 6 * g : {resultat.logs.push(`Siden inntekten din er høyere enn maksbeløpet på 6G (6 ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli nedjustert til ${toKr(resultat.resultat)}. Inntekten din er justert ut fra endring i grunnbeløpet.`)
            break}
        case gjennomsnittsInntekt : {resultat.logs.push(`Grunnlaget er gjennomsnittet av de tre siste inntektsårene dine: ${toKr(resultat.resultat)}. Inntekten din er justert ut fra endring i grunnbeløpet.`)
            break}
        case minsteGrunnlagUnder25 : {resultat.logs.push(`Siden inntekten din er lavere enn grensen for minste utbetaling for de under 25 år blir beregningsgrunnlaget ditt oppjustert til ${toKr(resultat.resultat)}. Inntekten din er justert ut fra endring i grunnbeløpet.`)
            break}
    default : {resultat.logs.push(`beregningsgrunnlaget er basert på det siste inntektsåret ditt: ${toKr(resultat.resultat)}. Inntekten din er justert ut fra endring i grunnbeløpet.`)}
    }

    const resultatEtterFradrag = resultat.resultat * 2.0 / 3.0
    resultat.logs.push(
        `Arbeidsavklaringspengene utgjør 66 %% av beregningsgrunnlaget, og blir derfor ${toKr(resultatEtterFradrag)}.`
        )


    resultat.resultat = resultatEtterFradrag
}

export default inntektsgrunnlag