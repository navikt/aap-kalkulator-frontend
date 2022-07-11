import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, GuidePanel, Heading, TextField } from "@navikt/ds-react"
import Divider from "../divider/Divider"
import { BreadcrumbsInterface } from "../breadcrumbs/breadcrumbsInterface"
import Breadcrumbs from "../breadcrumbs/Breadcrumbs"
import Image from "next/image"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
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
        isCompleted: true,
        isCurrentPage: false,
    },
    {
        tittel: "Barn",
        sti: "/steg/3",
        erKlikkbar: true,
        steg: 3,
        isCompleted: false,
        isCurrentPage: true,
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

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const handleSubmit = async (event: React.FormEvent<BarnInterface>) => {
        event.preventDefault()
        const antallBarn = parseInt(event.currentTarget.antallBarn.value)
        setError(isNaN(antallBarn) || antallBarn < 0 ? "Ugyldig verdi" : "")

        if (isNaN(antallBarn) || antallBarn < 0) {
            return
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad: state.arbeidsgrad,
            antallBarn,
        })
        await router.push("/steg/4")
    }

    return (
        <>
            <Breadcrumbs crumbs={crumbs} />
            <div className=" flex flex-col pt-4">
                <Image
                    src="/ikoner/teddy_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Barn
                </Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <Heading size="small">
                    Hvor mange barn som er under 18 år har du?
                </Heading>
                <TextField
                    type="number"
                    className="mb-4 w-20"
                    id="antallBarn"
                    label=""
                    size="medium"
                    error={error}
                />

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Barn
