import { useContext } from "react"
import { State } from "../../pages/_app"
import {grunnbeloep, GrunnbeloepHistorikk} from "./types";
import {StateInterface} from "../../components/state/State";
import {Result} from "../../components/result/Result";
import inntektsgrunnlag from "./Inntekt";
import {leggTilBarnetillegg} from "./barn";

export const calculate = (state: StateInterface, grunnbeloep: grunnbeloep, historikk: GrunnbeloepHistorikk[]) => {
    const g = grunnbeloep.grunnbeloep
    let resultat = wrapWithRespons(state)
    inntektsgrunnlag(g, historikk, resultat)
    leggTilBarnetillegg(resultat)
    return resultat

}

const wrapWithRespons = (person: StateInterface) => {
    return new Result(person)
}

