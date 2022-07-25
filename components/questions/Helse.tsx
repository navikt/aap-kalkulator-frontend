import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, Heading, Label, ReadMore, TextField } from "@navikt/ds-react"
import { useRouter } from "next/router"
import Image from "next/image"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Helse = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const aapGrense = 10

    const onChange = (text: string) => {
        const parsed = parseInt(text)
        setState({
            ...state,
            // @ts-ignore
            sykmeldtAar: isNaN(parsed) ? undefined : parsed,
        })
        if(!erFeil(parsed)){
            setError("")
        }
    }
    const erFeil = (sykmeldtAar: number) => {
        const detteAaret = new Date().getFullYear()
        return isNaN(sykmeldtAar) ||
        sykmeldtAar > detteAaret ||
        sykmeldtAar < detteAaret - aapGrense
    }

    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()
        const detteAaret = new Date().getFullYear()
        const sykmeldtAar = parseInt(event.currentTarget.sykmelding.value)



        const errors = isNaN(sykmeldtAar)
            ? "Sykmeldingsår må være et tall"
            : sykmeldtAar > detteAaret
            ? "Sykmeldingsår må være året vi er i nå eller tidligere"
            : sykmeldtAar < detteAaret - aapGrense
            ? `Du får ikke arbeidsavklaringspenger dersom du ble sykmeldt for mer enn ${aapGrense} år siden.`
            : ""

        setError(errors)
        if (erFeil(sykmeldtAar)
        ) {
            return
        }
        setState({
            ...state,
            sykmeldtAar,
        })
        await router.push("/steg/2")
    }

    return (
        <>
            <Stepper />
            <BackLink target="/" />
            <div aria-hidden="true" className="items flex flex-col pt-4">
                <Image
                    src="/ikoner/helse_circle.svg"
                    height="100"
                    width="100"
                    alt="helse ikon"
                    className={" flex items-center"}
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Helse
            </Heading>

            <form onSubmit={handleSubmit}>
                <Label className="text-xl">
                    Hvilket år fikk du først nedsatt arbeidsevne?
                </Label>
                <ReadMore
                    size="small"
                    header="Hvorfor spør vi om når du fikk nedsatt arbeidsevne?"
                >
                    {" "}
                    Inntektsårene på neste side bestemmes ut fra året du fikk
                    nedsatt arbeidsevne.
                </ReadMore>
                <TextField
                    inputMode="numeric"
                    size="medium"
                    label=""
                    id="sykmelding"
                    className="w-1/5 "
                    value={
                        state.sykmeldtAar == undefined
                            ? ""
                            : state.sykmeldtAar.toString()
                    }
                    onChange={(event) => onChange(event.target.value)}
                    error = {error && <div className="hidden"></div>}
                />
                {error && state.sykmeldtAar && (
                    <ul className="list-disc ml-5 font-bold text-red-500 mb-4">
                        <li>{error}</li>
                    </ul>
                )}
                <div className="mt-4">
                    <Button variant="primary">Gå videre</Button>
                </div>
            </form>
        </>
    )
}

export default Helse
