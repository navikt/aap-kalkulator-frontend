import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import Inntekt from "../../components/questions/Inntekt"
import Barn from "../../components/questions/Barn"
import Arbeidsgrad from "../../components/questions/Arbeidsgrad"
import Helse from "../../components/questions/Helse"
import { State } from "../_app"

const Steg = () => {
    const { state, setState } = useContext(State)
    const router = useRouter()
    const { steg } = router.query
    const step = typeof steg === "string" ? parseInt(steg) : 1

    useEffect(() => {
        if (state.lengsteSteg <= step) {
            setState({
                ...state,
                lengsteSteg: step,
            })
        }
    }, [step])

    const questions = [
        <Helse key={3} />,
        <Inntekt key={0} />,
        <Arbeidsgrad key={2} />,
        <Barn key={1} />,
    ]

    return questions[step - 1]
}

export default Steg
