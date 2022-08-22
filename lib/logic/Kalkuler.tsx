import {grunnbeloep, GrunnbeloepHistorikk} from "./types";
import {StateInterface} from "../../components/state/State";
import {Result} from "../../components/result/Result";
import inntektsgrunnlag from "./Inntekt";
import {leggTilBarnetillegg} from "./barn";
import {arbeidsgrad} from "./arbeidsgrad";

export const kalkuler = (state: StateInterface, grunnbeloep: grunnbeloep, historikk: GrunnbeloepHistorikk[]) => {
    const g = grunnbeloep.grunnbeloep
    let resultat = wrapWithRespons(state)
    inntektsgrunnlag(g, historikk, resultat)
    leggTilBarnetillegg(resultat)
    arbeidsgrad(resultat)
    return resultat

}

const wrapWithRespons = (person: StateInterface) => {
    return new Result(person)
}

