import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { BodyShort, Button, Heading, Label, TextField } from "@navikt/ds-react"
import Image from "next/image"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState<string | undefined>(undefined)

    const arbeidsuke = 37.5
    const onChange = (text: string) => {
        const parsed = parseFloat(text.replace(",","."))
        setState({
            ...state,
            arbeidstimer: text,
        })
        if(!isNaN(parsed) || text==""){
            setError("")
        }
    }
    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harArbeid: value == "Ja",
            arbeidstimer: value == "Nei" ? undefined : state.arbeidstimer,
        })
        setRadioError(undefined)
    }
    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidstimer = 0
        let arbeidsgrad = 0

        if (state.harArbeid == undefined) {
            setRadioError("Du må velge enten ja eller nei for å gå videre.")
            return
        }

        if (state.harArbeid) {
            arbeidstimer =
                state.arbeidstimer == undefined
                    ? NaN
                    : parseFloat(state.arbeidstimer.replace(",", "."))
            arbeidsgrad = (arbeidstimer / arbeidsuke) * 100
        }

        if (isNaN(arbeidstimer) || arbeidstimer < 0) {
            setError("Antall timer må være et tall, 0 eller høyere.")
            return
        }

        setState({
            ...state,
            arbeidsgrad,
        })
        await router.push("/steg/4")
    }

    const readMoreText = (
        <ul>
            {" "}
            <li> Hvor mye du får utbetalt avhenger av hvor mye du jobber.</li>
            <li>Vi vurderer en arbeidsuke til å være 37,5 timer.</li>
            <li>
                Jobber du mer enn 22,5 timer i uken får du ikke
                arbeidsavklaringspenger.{" "}
            </li>
        </ul>
    )

    return (
        <>
            <Stepper />
            <BackLink target="/steg/2" />
            <div aria-hidden="true" className="flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/briefcase_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className=" flex items-center"
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Arbeid
            </Heading>
            <Radio
                title="Er du i jobb nå?"
                state={state.harArbeid}
                onChange={onRadioChange}
                readMoreTitle="Hvorfor spør vi om du har jobb?"
                readMore={readMoreText}
            />
            {radioError != undefined && (
                <ul  aria-live="assertive" className="list-disc">
                    <li className="ml-5 font-bold text-red-500 mb-4">
                        {radioError}
                    </li>
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                {state.harArbeid && (
                    <div>
                        <Label id="l1" className="text-xl">
                            Hvor mange timer i uken jobber du?
                        </Label>
                        <BodyShort>
                            Varierer det, kan du oppgi gjennomsnittet
                        </BodyShort>
                        <div className="flex flex-col my-2 ">
                        <div className="flex flex-row gap-2 items-center">
                            <TextField
                                aria-labelledby="l1"
                                inputMode="decimal"
                                className="mb-2 md:w-1/5 col-start-1 w-1/4"
                                id="arbeidstimer"
                                label= ""
                                size="medium"
                                value={state.arbeidstimer}
                                onChange={(event) =>
                                    onChange(event.target.value)
                                }
                                error = {error && <div className="hidden"></div>}
                            />
                            <BodyShort >
                                timer per uke
                            </BodyShort>
                        </div>
                        {error && (
                            <ul  aria-live="assertive" className="list-disc ml-5 font-bold text-red-500">
                                <li>{error}</li>
                            </ul>
                        )}
                    </div>
                    </div>
                )}
                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
