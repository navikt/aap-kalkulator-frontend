import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, Heading, ReadMore, TextField } from "@navikt/ds-react"
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

    const onChange = (text: string) => {
        const parsed = parseInt(text)
        setState({
            ...state,
            // @ts-ignore
            sykmeldtAar: isNaN(parsed) ? undefined : parsed,
        })
    }

    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()
        const detteAaret = new Date().getFullYear()
        const sykmeldtAar = parseInt(event.currentTarget.sykmelding.value)

        const aapGrense = 10

        const errors = isNaN(sykmeldtAar)
            ? "Sykmeldingsår må være et tall"
            : sykmeldtAar > detteAaret
            ? "Sykmeldingsår må være året vi er i nå eller tidligere"
            : sykmeldtAar < detteAaret - aapGrense
            ? `Du får ikke arbeidsavklaringspenger dersom du ble sykmeldt for mer enn ${aapGrense} år siden.`
            : ""

        setError(errors)
        if (
            isNaN(sykmeldtAar) ||
            sykmeldtAar > detteAaret ||
            sykmeldtAar < detteAaret - aapGrense
        ) {
            return
        }
        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            antallBarn: state.antallBarn,
            arbeidsgrad: state.arbeidsgrad,
            sykmeldtAar,
        })
        await router.push("/steg/2")
    }

    return (
        <>
            <Stepper />
            <BackLink target="/" />
            <div className="items flex flex-col pt-4">
                <Image
                    src="/ikoner/helse_circle.svg"
                    height="100"
                    width="100"
                    alt="helse ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Helse
                </Heading>
            </div>

            <form onSubmit={handleSubmit}>
                <Heading size="small">
                    Hvilket år fikk du først nedsatt arbeidsevne?
                </Heading>
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
                    error={
                        error && (
                            <div className="list-disc font-bold w-full text-red-500">
                                {}
                            </div>
                        )
                    }
                />
                {error && state.sykmeldtAar && (
                    <div className="list-disc ml-5 font-bold text-red-500 mb-4 -mt-6">
                        {error}
                    </div>
                )}
                <div className="mt-4">
                    <Button variant="primary">Gå videre</Button>
                </div>
            </form>
        </>
    )
}

export default Helse
