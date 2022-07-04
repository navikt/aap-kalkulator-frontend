import { useContext } from "react"
import { ResultState } from "./_app"

const Resultat = () => {
    const { resultat, setResultat } = useContext(ResultState)
    return <div>{resultat.resultat}</div>
}

export default Resultat
