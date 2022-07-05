import { useRouter } from "next/router"
import React, { useContext } from "react"
import { ResultState, State } from "../../pages/_app"
import {
    BodyShort,
    Button,
    GuidePanel,
    Heading,
    ReadMore,
} from "@navikt/ds-react"
import Divider from "../divider/Divider"
import inntekt from "../sporsmal/Inntekt"

const Innsending = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const { resultat, setResultat } = useContext(ResultState)
    const handleSubmit = async (event: React.MouseEvent) => {
        event.preventDefault()
        const endpoint = "http://0.0.0.0:8080/beregning"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()

        setResultat(result)
        await router.push("/resultat")
    }

    const currentYear = new Date().getFullYear()
    const years = [
        { year: currentYear - 1, inntekt: state.inntekt1 },
        { year: currentYear - 2, inntekt: state.inntekt2 },
        { year: currentYear - 3, inntekt: state.inntekt3 },
    ]

    return (
        <div className="flex items-center flex-col">
            <div className="items-center flex flex-col pt-4">
                <Heading size="large" level="2" spacing>
                    Send inn
                </Heading>
                <BodyShort className="pb-4">
                    Her er en oppsummering av dine svar
                </BodyShort>
                <Divider />
            </div>
            <div className="w-60 mb-4 flex flex-col gap-4">
                <ReadMore size="medium" header="Inntekt" defaultOpen>
                    <ul>
                        {years.reverse().map((value, index) => (
                            <li key={index}>
                                Du tjente <b>{value.inntekt}kr</b> i{" "}
                                <b>{value.year}</b>
                            </li>
                        ))}
                    </ul>
                </ReadMore>
                <ReadMore size="medium" header="Barn" defaultOpen>
                    <BodyShort>
                        Du har <b>{state.antallBarn}</b> barn.
                    </BodyShort>
                </ReadMore>
            </div>
            <Button onClick={handleSubmit}>Se resultat</Button>
        </div>
    )
}

export default Innsending
