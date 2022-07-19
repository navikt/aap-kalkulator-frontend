import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {
    BodyShort,
    Button,
    Heading,
    ReadMore,
    TextField,
} from "@navikt/ds-react"
import { useRouter } from "next/router"
import Image from "next/image"
import Sti from "../steg/Steg"
import Tilbakeknapp from "../tilbakeknapp/Tilbakeknapp"

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
            sykmeldtAar: state.sykmeldtAar,
        })
        await router.push("/steg/3")
    }
    const currentYear = state.sykmeldtAar
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <>
            <Sti />
            <Tilbakeknapp til="/steg/1" />
            <div className="items flex flex-col pt-4">
                <Image
                    src="/ikoner/wallet_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Inntekt
                </Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <Heading size="small">
                    Hvor mye tjente du de tre siste årene før du ble sykmeldt?
                </Heading>
                <BodyShort spacing>Oppgi inntekt før skatt</BodyShort>
                <ReadMore size="small" header="Hvorfor spør vi om inntekt?">
                    {" "}
                    Inntekten din brukes til å regne ut hva du kan få i
                    arbeidsavklaringspenger.
                </ReadMore>
                <div className="flex flex-row space-x-8 mt-8">
                    {years.reverse().map((year, index) => (
                        <TextField
                            inputMode="numeric"
                            className="mb-4 w-40 "
                            key={index}
                            id={`inntekt${2 - index + 1}`}
                            label={`Inntekt ${year}`}
                            size="medium"
                            error={error[2 - index]}
                        />
                    ))}
                </div>

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Inntekt
