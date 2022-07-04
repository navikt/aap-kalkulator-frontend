import {useContext, useEffect} from "react"
import { ResultState } from "./_app"
import {useRouter} from "next/router";
import {NextPage} from "next";

const Resultat: NextPage = () => {
    const { resultat, setResultat } = useContext(ResultState)
    const router = useRouter()
    useEffect(() => {
        if (resultat.resultat == 0.0) {
            router.push("/")
        }
    }, [resultat])
    return <div>{resultat.resultat}</div>
}

export default Resultat
