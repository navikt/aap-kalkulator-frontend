import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import inntekt from "./Inntekt"
import { Button, TextField } from "@navikt/ds-react"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

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
            antallBarn,
        })
        await router.push("/steg/3")
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                className="mb-4"
                id="antallBarn"
                label="Hvor mange barn som er under 18 år har du?"
                size="medium"
                error={error}
            />

            <Button variant="primary">Beregn</Button>
        </form>
    )
}

export default Barn
