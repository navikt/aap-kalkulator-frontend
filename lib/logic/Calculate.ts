import { useContext } from "react"
import { State } from "../../pages/_app"

/*Tror ikke det blir noe særlig problem å kalkulere,
men har prøvd å tenke litt på hvordan vi skal gjøre loggingen som vi nå gjør i backend og den er jeg mer usikker på.*/

const calculate = () => {
    const { state, setState } = useContext(State)
}

export const inntektsgrunnlag = (g, historikk) => {
    const minsteGrunnlag =  2 * g / 0.66
    const minsteGrunnlagUnder25 = 2 * g  * (2.0/3.0) / 0.66


}