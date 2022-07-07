import React, { useContext, useState } from "react"
import { ResultState, State } from "../../pages/_app"
import { Button, GuidePanel, Heading, TextField } from "@navikt/ds-react"
import { useRouter } from "next/router"
import Divider from "../divider/Divider"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Inntekt = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()

        const error_message = "ugyldig verdi"
        const inntekt1 = parseFloat(event.currentTarget.inntekt1.value)
        const inntekt2 = parseFloat(event.currentTarget.inntekt2.value)
        const inntekt3 = parseFloat(event.currentTarget.inntekt3.value)

        const errors = [
            !isNaN(inntekt1) ? "" : error_message,
            !isNaN(inntekt2) ? "" : error_message,
            !isNaN(inntekt3) ? "" : error_message,
        ]
        setError(errors)
        if (errors.some((v) => v.length > 0)) {
            return
        }
        setState({
            inntekt1,
            inntekt2,
            inntekt3,
            antallBarn: state.antallBarn,
            arbeidsgrad: state.arbeidsgrad,
        })
        await router.push("/steg/2")
    }
    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <>
            <div className="items-center flex flex-col pt-4">
                <Heading size="large" level="2" spacing>
                    Inntekt
                </Heading>
                <GuidePanel className="w-1/2 mb-4">
                    Help me, Obi-Wan Kenobi. Youre my only hope. Oh, he says its
                    nothing, sir. Merely a malfunction.
                </GuidePanel>
                <Divider />
            </div>
            <form onSubmit={handleSubmit}>
                {years.map((year, index) => (
                    <TextField
                        className="mb-4"
                        key={index}
                        id={`inntekt${index + 1}`}
                        label={`Hva var årsinntekten i ${year}?`}
                        size="medium"
                        error={error[index]}
                    />
                ))}

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Inntekt
