import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Button, GuidePanel, Heading, TextField } from "@navikt/ds-react"
import Divider from "../divider/Divider"
import {BreadcrumbsInterface} from "../breadcrumbs/breadcrumbsInterface";
import Breadcrumbs from "../breadcrumbs/Breadcrumbs";

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

const crumbs: BreadcrumbsInterface[] = [
    { tittel: 'Inntekt', sti: "/steg/1", erKlikkbar: true, steg: 2 },
    { tittel: 'Arbeidsgrad', sti: "/steg/2", erKlikkbar: true, steg: 3  },
    { tittel: 'Barn', sti: "/steg/3", erKlikkbar: true, steg: 4 },
    { tittel: 'Resultat', sti: "/steg/4", erKlikkbar: false, steg: 5 },
]

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const handleSubmit = async (event: React.FormEvent<BarnInterface>) => {
        event.preventDefault()
        const antallBarn = parseInt(event.currentTarget.antallBarn.value)
        setError(!isNaN(antallBarn) ? "" : "Ugyldig verdi")

        if (isNaN(antallBarn)) {
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
            <div className="items-center flex flex-col pt-4">
                <Heading size="large" level="2" spacing>
                    Barn
                </Heading>
                <Divider />
            </div>
            <form onSubmit={handleSubmit}>
                <TextField
                    className="mb-4"
                    id="antallBarn"
                    label="Hvor mange barn som er under 18 år har du?"
                    size="medium"
                    error={error}
                />

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Barn
