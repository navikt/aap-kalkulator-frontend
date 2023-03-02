import { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { Label, Select, TextField } from "@navikt/ds-react"
import Radio from "../radio/Radio"
import { useRouter } from "next/router"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import { FormWrapper } from "../formWrapper/FormWrapper"

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
    const { formatMessage } = useFeatureToggleIntl()
<<<<<<< HEAD
    const aapGrense = 11
=======
    const aapGrense = 10
>>>>>>> 6fe7dff (:children_crossing: byttet textboks for innskriving av år til selector)
    let [aar, setAar] = useState(
        state.sykmeldtAar != undefined && !isNaN(state.sykmeldtAar)
            ? state.sykmeldtAar.toString()
            : "2023"
    )

    const onChange = (text: string) => {
        setAar(text)
        if (aar.match(/^[0-9]{4}$/)) {
            const parsed = parseInt(aar)
            setState({
                ...state,
                // @ts-ignore
                sykmeldtAar: isNaN(parsed) ? undefined : parsed,
            })
            if (!erFeil(parsed) && error != "") {
                setError("")
            }
        }
    }
    const erFeil = (sykmeldtAar: number) => {
        const detteAaret = new Date().getFullYear()
        console.log(
            "erFeil",
            isNaN(sykmeldtAar) ||
                sykmeldtAar > detteAaret ||
                sykmeldtAar < detteAaret - aapGrense
        )
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
            ? formatMessage("helse.nedsattArbeidsevne.validation.required")
            : sykmeldtAar > detteAaret
            ? formatMessage("helse.nedsattArbeidsevne.validation.max", {
                  Aar: detteAaret.toString(),
              })
            : sykmeldtAar < detteAaret - aapGrense
            ? formatMessage("helse.nedsattArbeidsevne.validation.min", {
                  Aar: aapGrense.toString(),
              })
            : ""

        if (state.over25 == undefined) {
            setRadioError(formatMessage("helse.over25.validation.required"))
        }

        setError(errors)

        if (
            erFeil(sykmeldtAar) ||
            state.over25 == undefined ||
            aar.match(/^([0-9]+)$/) == null
        ) {
            return
        }

        setState({
            ...state,
            sykmeldtAar,
        })

        await router.push("/steg/2")
    }

    const handleChange = (val: string) => {
        setState({ ...state, over25: val == "Ja" })
        setRadioError("")
    }

    return (
        <>
            <Stepper />
            <BackLink target="/" />
            <QuestionHeader
                image="/aap/kalkulator/ikoner/helse_circle.svg"
                alt=""
                tittel={formatMessage("helse.title")}
            />
            <FormWrapper handleSubmit={handleSubmit}>
                <Radio
                    isError={radioError != ""}
                    errorId="error1"
                    title={formatMessage("helse.over25.title")}
                    aria-errormessage="e1"
                    state={state.over25}
                    onChange={(val: any) => handleChange(val)}
                    readMoreTitle={formatMessage("helse.over25.readMoreTitle")}
                    readMore={formatMessage("helse.over25.readMore")}
                />
                {radioError && (
                    <ul
                        id="e1"
                        aria-live="assertive"
                        className="list-disc ml-5 font-bold text-red-500"
                    >
                        <li>{radioError}</li>
                    </ul>
                )}
                <div className="mb-4">
                    <Label as="label" id="l2" className="text-xl">
                        {formatMessage("helse.nedsattArbeidsevne.title")}
                    </Label>
                    {/*<ReadMore
                        size="small"
                        header={`${formatMessage("helse.nedsattArbeidsevne.readMoreTitle")}`}
                    >
                        {formatMessage("helse.nedsattArbeidsevne.readMore")}
                    </ReadMore>*/}
                    <div className="flex flex-col my-2">
                        <Select
                            label=""
                            id="sykmelding"
                            className="md:w-1/5 mb-2 w-1/4"
                            onChange={(event) => onChange(event.target.value)}
                            aria-labelledby="l2"
                            aria-errormessage="e2"
                            defaultValue={aar}
                        >
                            {Array.from(Array(aapGrense).keys()).map((i) => {
                                const year = new Date().getFullYear() - i
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                )
                            })}
                        </Select>
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
            </FormWrapper>
        </>
    )
}

export default Helse
