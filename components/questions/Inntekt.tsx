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
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"

interface Inntekt {
    inntekt1: string
    inntekt2: string
    inntekt3: string
}

const Inntekt = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const [inntekt, setInntekt] = useState<Inntekt>({
        inntekt1:
            state.inntekt1 != undefined
                ? state.inntekt1.toLocaleString("nb-NO")
                : "",
        inntekt2:
            state.inntekt2 != undefined
                ? state.inntekt2.toLocaleString("nb-NO")
                : "",
        inntekt3:
            state.inntekt3 != undefined
                ? state.inntekt3.toLocaleString("nb-NO")
                : "",
    })

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const verdi = parseFloat(event.target.value.replace(/[\.,\s]/g, ""))
        setInntekt({
            ...inntekt,
            [event.target.name]: !isNaN(verdi)
                ? verdi.toLocaleString("nb-NO")
                : "",
        })
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        const errorMessage = "Oppgi inntekt"
        const inntekt1 = parseFloat(inntekt.inntekt1.replace(/\s/g, ""))
        const inntekt2 = parseFloat(inntekt.inntekt2.replace(/\s/g, ""))
        const inntekt3 = parseFloat(inntekt.inntekt3.replace(/\s/g, ""))

        const errors = [
            !isNaN(inntekt1) ? "" : errorMessage,
            !isNaN(inntekt2) ? "" : errorMessage,
            !isNaN(inntekt3) ? "" : errorMessage,
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

    if (state.sykmeldtAar === undefined) {
        router.push("/")
        return
    }

    const inntektsAar = [
        state.sykmeldtAar - 1,
        state.sykmeldtAar - 2,
        state.sykmeldtAar - 3,
    ]

    return (
        <>
            <Stepper />
            <BackLink target="/steg/1" />
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
                    {inntektsAar.reverse().map((aar, index) => (
                        <TextField
                            inputMode="numeric"
                            className={`md:mb-4 w-40 h-20 ${error && "mb-12"}`}
                            key={index}
                            id={`inntekt${3 - index}`}
                            name={`inntekt${3 - index}`}
                            label={`Inntekt ${aar}`}
                            size="medium"
                            error={error[2 - index]}
                            value={Object.values(inntekt)[2 - index]}
                            onChange={onChange}
                        />
                    ))}
                </div>
                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Inntekt
