import React, { ChangeEvent, useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"

import {
    BodyShort,
    Button,
    Heading,
    Label,
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
    const { browserState, setBrowserState } = useContext(BrowserState)
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
        const tekst = event.target.value.replace(/[\.,\s]/g, "")
        const verdi = parseFloat(tekst)
        const index =
            parseInt(event.target.name[event.target.name.length - 1]) - 1
        let newErrors = error
        newErrors[index] = ""
        setError(newErrors)
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
            ...state,
            inntekt1,
            inntekt2,
            inntekt3,
        })
        await router.push("/steg/3")
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
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
            <div aria-hidden="true" className="items flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/wallet_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Inntekt
            </Heading>
            <form onSubmit={handleSubmit}>
                <Label className="text-xl">
                    Hvor mye tjente du de tre siste årene før du ble sykmeldt?
                </Label>
                <BodyShort spacing>Oppgi inntekt før skatt, i kroner</BodyShort>
                <ReadMore size="small" header="Hvorfor spør vi om inntekt?">
                    {" "}
                    Inntekten din brukes til å regne ut hva du kan få i
                    arbeidsavklaringspenger.
                    <br />
                    Dette bestemmes av de tidligere inntektene dine, eller
                    minstesatsen (to ganger grunnbeløpet).
                </ReadMore>
                <div className="flex md:flex-row flex-col md:space-x-8 my-4">
                    {inntektsAar.reverse().map((aar, index) => (
                        <div key={index} className="flex flex-col">
                            <TextField
                                aria-errormessage={`e${index}`}
                                inputMode="numeric"
                                className={`shrink md:mb-2 max-w-[160px] h-20`}
                                key={index}
                                id={`inntekt${3 - index}`}
                                name={`inntekt${3 - index}`}
                                label={`Inntekt ${aar}`}
                                size="medium"
                                error={error[2 - index]}
                                value={Object.values(inntekt)[2 - index]}
                                onChange={onChange}
                            />

                            {error[2 - index] && (
                                <ul
                                    id={`e${index}`}
                                    aria-live="assertive"
                                    className="list-disc ml-5 font-bold text-red-500"
                                >
                                    <li>{error[2 - index]}</li>
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Inntekt
