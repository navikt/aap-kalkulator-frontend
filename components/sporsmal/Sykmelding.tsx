import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {BodyShort, Button, Heading, ReadMore, TextField} from "@navikt/ds-react"
import { useRouter } from "next/router"
import Image from "next/image"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import JaNeiRadio from "../jaNeiRadio/JaNeiRadio";

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Sykmelding = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const [open, setOpen] = useState("")
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()

        await router.push("/steg/2")
    }
    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <>
            <Breadcrumbs />
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
                <JaNeiRadio
                    tittel="Er du sykmeldt?"
                    readMoreTittel="Hvorfor spør vi om du er sykmeldt."
                    state={open}
                    setState={setOpen}
                />
                {open == "Ja" && (
                    <>
                    <Heading size="small">Hvilket år ble du sykmeldt?</Heading>
                <TextField label="" className="w-1/5 mb-4"/>
                    </>
                )}
                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Sykmelding
