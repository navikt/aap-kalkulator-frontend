import { useRouter } from "next/router"
import Container from "../../components/container/Container"
import { Button, TextField } from "@navikt/ds-react"

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

        alert(`Results: ${result.resultat}`)
    }
    const currentYear = new Date().getFullYear()
    const years = [currentYear - 1, currentYear - 2, currentYear - 3]

    return (
        <Container>
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
        </Container>
    )
}

export default Steg
