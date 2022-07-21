import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, Heading, TextField } from "@navikt/ds-react"
import { useRouter } from "next/router"
import Image from "next/image"
import Stepper from "../stepper/Stepper"
import Radio from "../radio/Radio"
import BackLink from "../backlink/BackLink"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Sykmelding = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState("")
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()
        const detteAaret = new Date().getFullYear()
        let sykmeldtAar = detteAaret
        if (open == "Ja") {
            sykmeldtAar = parseInt(event.currentTarget.sykmelding.value)
        }
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
            (isNaN(sykmeldtAar) ||
                sykmeldtAar > detteAaret ||
                sykmeldtAar < detteAaret - aapGrense) &&
            open
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
                    src="/ikoner/wallet_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Sykmelding
                </Heading>
            </div>

            <form onSubmit={handleSubmit}>
                <Radio
                    title="Er du sykmeldt?"
                    readMoreTitle="Hvorfor spør vi om du er sykmeldt?"
                    readMore="Inntektsårene på neste side bestemmes ut i fra året du ble sykmeldt."
                    state={open}
                    setState={setOpen}
                />
                {open == "Ja" && (
                    <>
                        <Heading size="small">
                            Hvilket år ble du sykmeldt?
                        </Heading>
                        <TextField
                            inputMode="numeric"
                            size="medium"
                            label=""
                            id="sykmelding"
                            className="w-1/5 "
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
                    </>
                )}
                <div className="mt-4">
                    <Button variant="primary">Neste</Button>
                </div>
            </form>
        </>
    )
}

export default Sykmelding
