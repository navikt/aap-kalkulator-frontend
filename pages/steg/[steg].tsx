import { useRouter } from "next/router"
import Container from "../../components/container/Container"
import { Button, TextField } from "@navikt/ds-react"
import React, { useContext, useState } from "react"
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
    const [error, setError] = useState<string[]>(["", "", ""])
    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()
        const error_message = "ugyldig verdi"
        const inntekt1 = parseFloat(event.currentTarget.inntekt1.value)
        const inntekt2 = parseFloat(event.currentTarget.inntekt2.value)
        const inntekt3 = parseFloat(event.currentTarget.inntekt3.value)

        const errors = [
            !isNaN(inntekt1) ? "" : error_message,
            !isNaN(inntekt2) ? "" : error_message,
            !isNaN(inntekt3) ? "" : error_message,
        ]
        setError(errors)
        if (errors.some((v) => v.length > 0)) {
            return
        }
        const data = { inntekt1, inntekt2, inntekt3 }

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
        await router.push("/resultat")
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
                    error={error[index]}
                />
            ))}

            <Button variant="primary">Beregn</Button>
        </form>
    )
}

export default Steg
