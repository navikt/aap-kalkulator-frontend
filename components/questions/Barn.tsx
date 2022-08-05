import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"
import {BodyShort, Button, Heading, Label, Link, TextField} from "@navikt/ds-react"
import Image from "next/image"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState<string | undefined>(undefined)
    const { browserState, setBrowserState } = useContext(BrowserState)

    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harBarn: value == "Ja",
            antallBarn: value == "Nei" ? undefined : state.antallBarn,
        })
        setRadioError(undefined)
    }

    const onChange = (text: string) => {
        const parsed = parseInt(text)
        setError("")

        setState({
            ...state,
            antallBarn: isNaN(parsed) ? undefined : parsed,
        })
    }
    const handleSubmit = async (event: React.FormEvent<BarnInterface>) => {
        event.preventDefault()

        if (state.harBarn == undefined) {
            setRadioError("Du må velge enten ja eller nei for å gå videre.")
            return
        }

        if (
            (state.antallBarn === undefined && state.harBarn) ||
            (state.antallBarn !== undefined &&
                (isNaN(state.antallBarn) || state.antallBarn < 0))
        ) {
            setError("Antall barn må være et tall.")
            return
        }

        await router.push("/resultat")
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    const readmoreTekst = (
        <BodyShort>
        Hvis du forsørger barn under 18 år, kan du få et barnetillegg. <Link
            href="https://www.nav.no/aap#hvormye-forsorgerbarn"
            target="_blank"
            rel="noreferrer"
        >Les mer om barnetillegg her.</Link>
        </BodyShort>)

    return (
        <>
            <Stepper />
            <BackLink target="/steg/3" />
            <QuestionHeader
                image="/ikoner/teddy_circle.svg"
                alt="teddybjørn ikon"
                tittel="Barn"
            />
            <form onSubmit={handleSubmit}>
                <Radio
                    isError={radioError != undefined}
                    errorId="error1"
                    title="Forsørger du barn under 18 år?"
                    readMoreTitle="Hvorfor spør vi om du forsørger barn under 18 år?"
                    readMore={readmoreTekst}
                    state={state.harBarn}
                    onChange={onRadioChange}
                />
                {radioError != undefined && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}
                {state.harBarn && (
                    <div className="mb-4">
                        <Label id="l1" className="text-xl">
                            Hvor mange barn forsørger du?
                        </Label>
                        <BodyShort id="bs1">
                            Barnet må være under 18 år.
                        </BodyShort>
                        <div className="flex flex-col my-2">
                            <div className="flex flex-row items-center gap-2">
                                <TextField
                                    aria-errormessage="e2"
                                    aria-labelledby="l1"
                                    aria-describedby="bs1"
                                    inputMode="numeric"
                                    className="mb-2 md:w-1/5 w-1/4"
                                    id="antallBarn"
                                    label=""
                                    size="medium"
                                    value={
                                        state.antallBarn == undefined
                                            ? ""
                                            : state.antallBarn.toString()
                                    }
                                    onChange={(event) =>
                                        onChange(event.target.value)
                                    }
                                    error={
                                        error && <div className="hidden"></div>
                                    }
                                />
                                <BodyShort id="d1">barn</BodyShort>
                            </div>
                            {error && (
                                <ul
                                    id="e2"
                                    aria-live="assertive"
                                    className="list-disc ml-5 font-bold text-red-500"
                                >
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

export default Barn
