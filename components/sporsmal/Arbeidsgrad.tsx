import { useRefreshRoot } from "next/dist/client/streaming/refresh"
import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, GuidePanel, Heading, TextField } from "@navikt/ds-react"
import Divider from "../divider/Divider"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        const arbeidsgrad = parseInt(event.currentTarget.arbeidsgrad.value)
        setError(!isNaN(arbeidsgrad) ? "" : "Ugyldig verdi")

        if (isNaN(arbeidsgrad)) {
            return
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad,
            antallBarn: state.antallBarn,
        })
        await router.push("/steg/3")
    }

    return (
        <>
            <div className="items-center flex flex-col pt-4">
                <Heading size="large" level="2" spacing>
                    Arbeidsgrad
                </Heading>
                <GuidePanel className="w-1/2 mb-4">
                    Help me JEG ER SYK Obi-Wan Kenobi. Youre my only hope. Oh,
                    he says its nothing, sir. Merely a malfunction.
                </GuidePanel>
                <Divider />
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    className="mb-4"
                    id="arbeidsgrad"
                    label="Hva er din arbeidsgrad"
                    size="medium"
                    error={error}
                />

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
