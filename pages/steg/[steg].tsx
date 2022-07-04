import { useRouter } from "next/router"
import Container from "../../components/container/Container"
import { Button, TextField } from "@navikt/ds-react"
import React, { useContext } from "react"
import { ResultInterface } from "../../components/result/Result"
import { ResultState } from "../_app"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Steg = () => {
    const router = useRouter()
    const { steg } = router.query
    const { resultat, setResultat } = useContext(ResultState)
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()

        const data = {
            inntekt1: parseFloat(event.currentTarget.inntekt1.value),
            inntekt2: parseFloat(event.currentTarget.inntekt2.value),
            inntekt3: parseFloat(event.currentTarget.inntekt3.value),
        }

        const endpoint = "http://0.0.0.0:8080/beregning"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()

        setResultat(result)
        router.push("/resultat")
    }
    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <form onSubmit={handleSubmit}>
            {years.map((year, index) => (
                <TextField
                    className="mb-4"
                    key={index}
                    id={`inntekt${index + 1}`}
                    label={`Hva var årsinntekten i ${year}?`}
                    size="medium"
                />
            ))}
            <Button variant="primary">Beregn</Button>
        </form>
    )
}

export default Steg
