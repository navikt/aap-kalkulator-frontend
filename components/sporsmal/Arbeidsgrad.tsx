import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {
    BodyShort,
    Button,
    Heading,
    Radio,
    RadioGroup, ReadMore,
    TextField,
} from "@navikt/ds-react"
import Image from "next/image"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import { Text } from "@navikt/ds-react/src/form/search/search.stories"
import JaNeiRadio from "../jaNeiRadio/JaNeiRadio"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState("")
    const [aapen, setAapen] = useState("")

    const arbeidsuke = 37.5

    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidstimer = 0
        let arbeidsgrad = 0

        if (open == "Ja") {
            arbeidstimer = parseInt(event.currentTarget.arbeidstimer.value)
            arbeidsgrad = arbeidstimer / arbeidsuke * 100
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad,
            antallBarn: state.antallBarn,
            sykmeldtAar: state.sykmeldtAar
        })
        await router.push("/steg/4")
    }

    const readMoreTekst = "Hvor mye du får utbetalt avhenger av hvor mye du jobber. Jobber du mer enn 22,5 timer i uken får du ikke arbeidsavklaringspenger."

    return (
        <>
            <Breadcrumbs />
            <div className="flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/briefcase_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className=" flex items-center"
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Jobb
            </Heading>
            <JaNeiRadio tittel="Har du jobb?" state={open} setState={setOpen} readMoreTittel="Hvorfor spør vi om du har jobb?" readMore={readMoreTekst} />


            <form onSubmit={handleSubmit}>
                {open == "Ja" && (
                    <div className="mb-4">
                        <Heading size="small">
                            Hvor mange timer i uken jobber du?
                        </Heading>
                        <BodyShort>
                            Varierer det, kan du oppgi gjennomsnittet
                        </BodyShort>
                        <div className="flex flex-row items-center gap-2 mb-4">
                            <TextField
                                className="mb-4 md:w-28"
                                id="arbeidstimer"
                                label=""
                                size="medium"
                                error={error}
                            />
                            <BodyShort>timer per uke</BodyShort>
                        </div>
                    </div>
                )}
                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
