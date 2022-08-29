import { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {
    Button,
    Label,
    Radio,
    RadioGroup,
    ReadMore,
    TextField,
} from "@navikt/ds-react"
import { useRouter } from "next/router"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"

interface InntektsForm extends HTMLFormElement {
    readonly inntekt1: HTMLInputElement
    readonly inntekt2: HTMLInputElement
    readonly inntekt3: HTMLInputElement
}

const Helse = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState("")

    const aapGrense = 10

    const onChange = (text: string) => {
        const parsed = parseInt(text)
        setState({
            ...state,
            // @ts-ignore
            sykmeldtAar: isNaN(parsed) ? undefined : parsed,
        })
        if (!erFeil(parsed) && error != "") {
            setError("")
        }
    }
    const erFeil = (sykmeldtAar: number) => {
        const detteAaret = new Date().getFullYear()
        return (
            isNaN(sykmeldtAar) ||
            sykmeldtAar > detteAaret ||
            sykmeldtAar < detteAaret - aapGrense
        )
    }

    const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
        event.preventDefault()
        const detteAaret = new Date().getFullYear()
        const sykmeldtAar = parseInt(event.currentTarget.sykmelding.value)

        const errors = isNaN(sykmeldtAar)
            ? "Året du fikk nedsatt arbeidsevne må være et tall."
            : sykmeldtAar > detteAaret
            ? `Året du fikk nedsatt arbeidsevne må være ${detteAaret} eller tidligere.`
            : sykmeldtAar < detteAaret - aapGrense
            ? `Kalkulatoren kan ikke beregne arbeidsavklaringspenger dersom du fikk nedsatt arbeidsevne for mer enn ${aapGrense} år siden.`
            : ""

        if (state.over25 == undefined) {
            setRadioError("Velg enten ja eller nei for å gå videre.")
        }

        setError(errors)

        if (erFeil(sykmeldtAar) || state.over25 == undefined) {
            return
        }

        setState({
            ...state,
            sykmeldtAar,
        })
        await router.push("/steg/2")
    }

    const handleChange = (val: string) => {
        setState({ ...state, over25: val == "ja" })
        setRadioError("")
    }

    return (
        <>
            <Stepper />
            <BackLink target="/" />
            <QuestionHeader
                image="/ikoner/helse_circle.svg"
                alt="helse ikon"
                tittel="Helse"
            />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label as={"label"} id="l1" className="text-xl">
                        Er du 25 år eller eldre?
                    </Label>
                    <ReadMore
                        size="small"
                        header="Hvorfor spør vi om du er over 25 år?"
                    >
                        {" "}
                        Det er forskjellige regler for hvor mye du kan få dersom
                        du er under eller over 25 år.
                    </ReadMore>
                    <RadioGroup
                        aria-errormessage="e1"
                        error={radioError && <div className="hidden"></div>}
                        aria-labelledby="l1"
                        legend=""
                        size="medium"
                        onChange={(val: any) => handleChange(val)}
                        value={
                            state.over25 === undefined
                                ? ""
                                : state.over25
                                ? "ja"
                                : "nei"
                        }
                    >
                        <Radio value="ja">Ja</Radio>
                        <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                    {radioError && (
                        <ul
                            id="e1"
                            aria-live="assertive"
                            className="list-disc ml-5 font-bold text-red-500"
                        >
                            <li>{radioError}</li>
                        </ul>
                    )}
                </div>
                <div className="mb-4">
                    <Label as="label" id="l2" className="text-xl">
                        Hvilket år fikk du først nedsatt arbeidsevne med minst 50%?
                    </Label>
                    <ReadMore
                        size="small"
                        header="Hvorfor spør vi om når du fikk nedsatt arbeidsevne?"
                    >
                        {" "}
                        Vi bruker året du fikk nedsatt arbeidsevne, til å
                        justere for økning i grunnbeløpet.
                    </ReadMore>
                    <div className="flex flex-col my-2">
                        <TextField
                            aria-errormessage="e2"
                            aria-labelledby="l2"
                            inputMode="numeric"
                            size="medium"
                            label=""
                            id="sykmelding"
                            className="md:w-1/5 mb-2 w-1/4"
                            value={
                                state.sykmeldtAar == undefined
                                    ? ""
                                    : state.sykmeldtAar.toString()
                            }
                            onChange={(event) => onChange(event.target.value)}
                            error={error && <div className="hidden"></div>}
                        />
                        {error && (
                            <ul
                                id="e2"
                                aria-live="assertive"
                                className="list-disc ml-5 font-bold text-red-500"
                            >
                                <li>{error}</li>
                            </ul>
                        )}
                    </div>
                </div>
                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Helse
