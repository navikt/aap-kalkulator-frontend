import { useRouter } from "next/router"
import Container from "../../components/container/Container"
import { Button, TextField } from "@navikt/ds-react";

const Steg = () => {
    const router = useRouter()
    const { steg } = router.query
    const handleSubmit = async (event) => {
        event.preventDefault()

        const data = {
            inntekt1: parseFloat(event.target.inntekt1.value),
            inntekt2: parseFloat(event.target.inntekt2.value),
            inntekt3: parseFloat(event.target.inntekt3.value),
        }

        const endpoint="http://0.0.0.0:8080/beregning"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(endpoint, options)

        const result = await response.json()

        alert(`Results: ${result.resultat}`)
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="inntekt1"
                    label="Har du noen tilbakemeldinger?"
                    size="medium"
                />
                <TextField
                    id="inntekt2"
                    label="Har du noen tilbakemeldinger?"
                    size="medium"
                />
                <TextField
                    id="inntekt3"
                    label="Har du noen tilbakemeldinger?"
                    size="medium"
                />
                <Button variant="primary">Beregn</Button>
            </form>
        </Container>
    )
}

export default Steg
