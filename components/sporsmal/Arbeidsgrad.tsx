import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {Button, Heading, Radio, RadioGroup, TextField} from "@navikt/ds-react"
import Image from "next/image";
import {BreadcrumbsInterface} from "../breadcrumbs/breadcrumbsInterface";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const crumbs: BreadcrumbsInterface[] = [
    { tittel: 'Inntekt', sti: "/steg/1", erKlikkbar: true },
    { tittel: 'Arbeidsgrad', sti: "/steg/2", erKlikkbar: true },
    { tittel: 'Barn', sti: "/steg/3", erKlikkbar: false },
    { tittel: 'Resultat', sti: "/steg/4", erKlikkbar: false },
]

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState("");

    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidsuke;
        let arbeidstimer;

        if (event.currentTarget.arbeidsuke == undefined) {
            arbeidsuke = 0
            arbeidstimer = 0
        } else {
            arbeidsuke = parseInt(event.currentTarget.arbeidsuke.value)
            arbeidstimer = parseInt(event.currentTarget.arbeidstimer.value)
        }



        setError(((arbeidstimer == 0 || arbeidsuke == 0) && open) ? "" : "Ugyldig verdi")

        if (isNaN(arbeidsuke || arbeidstimer)) {
            return
        }
        const arbeidsgrad = (arbeidstimer/arbeidsuke)*100

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
            <div className="flex flex-col pt-4">
                <Image src="/ikoner/briefcase_circle.svg" height="100" width="100" alt="lommebok ikon" className=" flex items-center"></Image>
                <Heading size="large" level="2" spacing>
                    Arbeidsgrad
                </Heading>
            </div>
            <RadioGroup
                legend="Er du i arbeid?"
                value={open}
                onChange={(v) => setOpen(v)}
            ><div className="flex flex-row space-x-4">
                <Radio value="Ja" >Ja</Radio>
                <Radio value="Nei">Nei</Radio>
            </div>
            </RadioGroup>
            <form onSubmit={handleSubmit}>
                {open == "Ja" && (<div>
                    <Heading size="small">Hvor mange timer er en vanlig arbeidsuke i ditt yrke?</Heading>
                    <TextField
                        className="mb-4 md:w-1/3"
                        id="arbeidsuke"
                        label = ""
                        size="medium"
                        error={error}
                    />
                    <Heading size="small">Hvor mange timer er din arbeidsuke?</Heading>
                    <TextField
                        className="mb-4 md:w-1/3"
                        id="arbeidstimer"
                        label=""
                        size="medium"
                        error={error}
                    />
                </div>)}
                <Button variant="primary">Neste</Button>
            </form>


        </>
    )
}

export default Arbeidsgrad
