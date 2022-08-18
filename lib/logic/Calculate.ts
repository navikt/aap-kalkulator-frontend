import { useContext } from "react"
import { State } from "../../pages/_app"

/*Tror ikke det blir noe særlig problem å kalkulere,
men har prøvd å tenke litt på hvordan vi skal gjøre loggingen som vi nå gjør i backend og den er jeg mer usikker på.*/

const calculate = () => {
    const { state, setState } = useContext(State)
}
