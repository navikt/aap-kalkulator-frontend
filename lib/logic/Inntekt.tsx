import { GrunnbeloepHistorikk } from "../utils/types"
import { Result } from "../../components/result/Result"
import {
    maksGrunnlagFraG,
    minsteGrunnlagFraG,
    minsteGrunnlagUnder25FraG,
    prosentReduksjon, toKr
} from "../utils/HjelpeFunksjoner";

const forAar = (historikk: GrunnbeloepHistorikk[], inntektsAar: number) => {
    return Array.from(historikk).filter(
        (h) => parseInt(h.dato.toString()) == inntektsAar
    )[0]
}

const juster = (
    g: number,
    historikk: GrunnbeloepHistorikk[],
    inntektsAar: number,
    inntekt: number
) => {
    const grunnbeloepForInntektsAar = forAar(historikk, inntektsAar)!!
    const gammelG = grunnbeloepForInntektsAar.gjennomsnittPerAar!!
    const inntektMax = Math.min(inntekt, maksGrunnlagFraG(gammelG))

    return Math.min(
        (inntektMax * g) / grunnbeloepForInntektsAar.gjennomsnittPerAar!!,
        maksGrunnlagFraG(g)
    )
}

const inntektsjustering = (
    g: number,
    historikk: GrunnbeloepHistorikk[],
    inntektsIndeks: number,
    resultat: Result
) => {
    if(!resultat.personInfo!!.harLoenn) {
        resultat.personInfo!!.inntekt1 = 0
        resultat.personInfo!!.inntekt2 = 0
        resultat.personInfo!!.inntekt3 = 0
    }
    const inntektsAar = resultat.personInfo!!.sykmeldtAar!! - inntektsIndeks
    const inntekt = [
        resultat.personInfo!!.inntekt1,
        resultat.personInfo!!.inntekt2,
        resultat.personInfo!!.inntekt3,
    ].at(inntektsIndeks - 1)
    return juster(g, historikk, inntektsAar, inntekt!!)
}

const inntektsgrunnlag = (
    g: number,
    historikk: GrunnbeloepHistorikk[],
    resultat: Result
) => {
    const minsteGrunnlag = minsteGrunnlagFraG(g)
    const minsteGrunnlagUnder25 = minsteGrunnlagUnder25FraG(g)
    const maksGrunnlag = maksGrunnlagFraG(g)

    const inntekt1 = inntektsjustering(g, historikk, 1, resultat)
    const inntekt2 = inntektsjustering(g, historikk, 2, resultat)
    const inntekt3 = inntektsjustering(g, historikk, 3, resultat)
    const gjennomsnittsInntekt = (inntekt1 + inntekt2 + inntekt3) / 3
    const gjennomsnittHoyest =
        gjennomsnittsInntekt >= resultat.personInfo!!.inntekt1!!

    resultat.resultat = Math.min(
        !resultat.personInfo!!.over25
            ? Math.max(
                  gjennomsnittHoyest ? gjennomsnittsInntekt : inntekt1,
                  minsteGrunnlagUnder25
              )
            : Math.max(
                  gjennomsnittHoyest ? gjennomsnittsInntekt : inntekt1,
                  minsteGrunnlag
              ),
        maksGrunnlag
    )

    switch (resultat.resultat) {
        case minsteGrunnlag: {
            resultat.logs.push(
                {id:"logic.salery.minsteGrunnlag",values:{res:toKr(resultat.resultat)}}
            )
            break
        }
        case maksGrunnlag: {
            resultat.logs.push(
                {id:"logic.salery.maksGrunnlag",values:{res:toKr(resultat.resultat)}}
            )
            break
        }
        case gjennomsnittsInntekt: {
            resultat.logs.push(
                {id:"logic.salery.gjennomsnittInntekt",values:{res:toKr(resultat.resultat)}}
            )
            break
        }
        case minsteGrunnlagUnder25: {
            resultat.logs.push(
                {id:"logic.salery.minsteGrunnlagUnder25",values:{res:toKr(resultat.resultat)}}
            )
            break
        }
        default: {
            resultat.logs.push(
                {id:"logic.salery.lastYear",values:{res:toKr(resultat.resultat)}}
            )
        }
    }

    const resultatEtterFradrag = prosentReduksjon(resultat.resultat)
    resultat.logs.push(
        {id:"logic.salery.reduction",values:{res:toKr(resultatEtterFradrag)}}
    )

    resultat.resultat = resultatEtterFradrag
}

export default inntektsgrunnlag
