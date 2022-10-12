import { grunnbeloep, GrunnbeloepHistorikk } from "../utils/types"
import { StateInterface } from "../../components/state/State"
import { Result } from "../../components/result/Result"
import inntektsgrunnlag from "./Inntekt"
import { leggTilBarnetillegg } from "./Barn"
import { arbeidsgrad } from "./Arbeidsgrad"
import { toKr } from "../utils/HjelpeFunksjoner"

export const kalkuler = (
    state: StateInterface,
    grunnbeloep: grunnbeloep,
    historikk: GrunnbeloepHistorikk[]
) => {
    const g = grunnbeloep.grunnbeloep
    let resultat = wrapWithRespons(state)
    inntektsgrunnlag(g, historikk, resultat)
    leggTilBarnetillegg(resultat)
    resultat.logs.push({
        id: "logic.total.totalAmount",
        values: { res: toKr(resultat.resultat) },
    })
    arbeidsgrad(resultat)
    resultat.resultat = Math.round(resultat.resultat)
    return resultat
}

const wrapWithRespons = (person: StateInterface) => {
    return new Result(person)
}
