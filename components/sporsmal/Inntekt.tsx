import React, { ChangeEvent, useContext, useState } from "react"
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

interface Inntekt {
    inntekt1: string
    inntekt2: string
    inntekt3: string
}

const Inntekt = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const [inntektstilstand, settInntektstilstand] = useState<Inntekt>({
        inntekt1: "",
        inntekt2: "",
        inntekt3: "",
    })

    const vedForandring = (begivenhet: ChangeEvent<HTMLInputElement>) => {
        const verdi = parseFloat(
            begivenhet.target.value.replace(/[\.,\s]/g, "")
        )
        settInntektstilstand({
            ...inntektstilstand,
            [begivenhet.target.name]: !isNaN(verdi)
                ? verdi.toLocaleString("nb-NO")
                : "",
        })
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const error_message = "Oppgi inntekt"
        const inntekt1 = parseFloat(
            inntektstilstand.inntekt1.replace(/\s/g, "")
        )
        const inntekt2 = parseFloat(
            inntektstilstand.inntekt2.replace(/\s/g, "")
        )
        const inntekt3 = parseFloat(
            inntektstilstand.inntekt3.replace(/\s/g, "")
        )

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
                <BodyShort spacing>Oppgi inntekt før skatt, i kroner</BodyShort>
                <ReadMore size="small" header="Hvorfor spør vi om inntekt?">
                    {" "}
                    Inntekten din brukes til å regne ut hva du kan få i
                    arbeidsavklaringspenger.
                </ReadMore>
                <div className="flex md:flex-row flex-col md:space-x-8 mt-8 md:mb-8  ">
                    {years.reverse().map((year, index) => (
                        <TextField
                            inputMode="numeric"
                            className={`md:mb-4 w-40 h-20 ${error && "mb-12"}`}
                            key={index}
                            id={`inntekt${3 - index}`}
                            name={`inntekt${3 - index}`}
                            label={`Inntekt ${year}`}
                            size="medium"
                            error={error[2 - index]}
                            value={Object.values(inntektstilstand)[2 - index]}
                            onChange={vedForandring}
                        />
                    ))}
                </div>
                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Inntekt
