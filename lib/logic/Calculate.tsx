import { useContext } from "react"
import { State } from "../../pages/_app"
import {grunnbeloep, GrunnbeloepHistorikk} from "./types";
import {StateInterface} from "../../components/state/State";
import {Result} from "../../components/result/Result";

/*Tror ikke det blir noe særlig problem å kalkulere,
men har prøvd å tenke litt på hvordan vi skal gjøre loggingen som vi nå gjør i backend og den er jeg mer usikker på.*/


export const calculate = (state: StateInterface, grunnbeloep: grunnbeloep, historikk: GrunnbeloepHistorikk[]) => {
    const g = grunnbeloep.grunnbeloep
    let resultat = wrapWithRespons(state)

    return resultat

}

const wrapWithRespons = (person: StateInterface) => {
    return new Result(person)
}

