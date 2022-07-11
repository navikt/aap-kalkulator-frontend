import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {
    BodyShort,
    Button,
    Heading,
    Radio,
    RadioGroup,
    TextField,
} from "@navikt/ds-react"
import Image from "next/image"
import { BreadcrumbsInterface } from "../breadcrumbs/breadcrumbsInterface"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import { Text } from "@navikt/ds-react/src/form/search/search.stories"
import JaNeiRadio from "../jaNeiRadio/JaNeiRadio"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const crumbs: BreadcrumbsInterface[] = [
    {
        tittel: "Inntekt",
        sti: "/steg/1",
        erKlikkbar: true,
        steg: 1,
        isCompleted: true,
        isCurrentPage: false,
    },
    {
        tittel: "Arbeid",
        sti: "/steg/2",
        erKlikkbar: true,
        steg: 2,
        isCompleted: false,
        isCurrentPage: true,
    },
    {
        tittel: "Barn",
        sti: "/steg/3",
        erKlikkbar: false,
        steg: 3,
        isCompleted: false,
        isCurrentPage: false,
    },
    {
        tittel: "Resultat",
        sti: "/steg/4",
        erKlikkbar: false,
        steg: 4,
        isCompleted: false,
        isCurrentPage: false,
    },
]

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState("")
    const [aapen, setAapen] = useState("")

    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidsuke = 0
        let arbeidstimer = 0
        let arbeidsgrad = 0

        if (open == "Ja") {
            arbeidsuke = parseInt(event.currentTarget.arbeidsuke.value)
        }

        if (aapen == "Timer" && (arbeidsuke || arbeidstimer) !== 0) {
            arbeidstimer = parseInt(event.currentTarget.arbeidstimer.value)
            setError(
                (arbeidstimer == 0 || arbeidsuke == 0) && open
                    ? ""
                    : "Ugyldig verdi"
            )
            arbeidsgrad = (arbeidstimer / arbeidsuke) * 100
        } else if (aapen == "Prosent") {
            arbeidsgrad = parseInt(event.currentTarget.arbeidsprosent.value)
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad,
            antallBarn: state.antallBarn,
        })
        await router.push("/steg/3")
    }

    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
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
            <JaNeiRadio tittel="Har du jobb?" state={open} setState={setOpen} />

            <form onSubmit={handleSubmit}>
                {open == "Ja" && (
                    <div className="mb-4">
                        <Heading size="small">
                            Hvor mange timer i uken jobber du vanligvis når du
                            er frisk?
                        </Heading>
                        <BodyShort>
                            Varierer det, kan du oppgi gjennomsnittet.
                        </BodyShort>
                        <div className="flex flex-row items-center gap-2 mb-4">
                            <TextField
                                className="mb-4 md:w-28"
                                id="arbeidsuke"
                                label=""
                                size="medium"
                                error={error}
                            />
                            <BodyShort>timer per uke</BodyShort>
                        </div>
                        <Heading size="small">Hvor mye jobber du nå?</Heading>
                        <BodyShort>Velg timer eller prosent</BodyShort>
                        <RadioGroup
                            value={aapen}
                            onChange={(v) => setAapen(v)}
                            legend=""
                            size="medium"
                        >
                            <div className="flex flex-col">
                                <Radio className="border-1" value="Timer">
                                    Timer
                                </Radio>
                                <Radio className="border-1" value="Prosent">
                                    Prosent
                                </Radio>
                            </div>
                        </RadioGroup>
                        {aapen == "Timer" && (
                            <div className="flex-row flex gap-2 items-center">
                                <TextField
                                    className="mb-4 md:w-28"
                                    id="arbeidstimer"
                                    label=""
                                    size="medium"
                                    error={error}
                                />
                                <BodyShort>timer</BodyShort>
                            </div>
                        )}
                        {aapen == "Prosent" && (
                            <div className="flex-row flex gap-2 items-center">
                                <TextField
                                    className="mb-4 md:w-28"
                                    id="arbeidsprosent"
                                    label=""
                                    size="medium"
                                    error={error}
                                />
                                <BodyShort>%</BodyShort>
                            </div>
                        )}
                    </div>
                )}
                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
