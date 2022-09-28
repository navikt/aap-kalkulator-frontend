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
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl";
import {logAmplitudeEvent} from "../../lib/utils/amplitude";

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
    const { formatMessage } = useFeatureToggleIntl();
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
            ? formatMessage("helse.nedsattArbeidsevne.validation.required")
            : sykmeldtAar > detteAaret
            ? formatMessage("helse.nedsattArbeidsevne.validation.max", {Aar: detteAaret.toString()})
            : sykmeldtAar < detteAaret - aapGrense
            ? formatMessage("helse.nedsattArbeidsevne.validation.min", {Aar: aapGrense.toString()})
            : ""

        if (state.over25 == undefined) {
            setRadioError(formatMessage("helse.over25.validation.required"))
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
                tittel={formatMessage("helse.title")}
            />
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <Label as={"label"} id="l1" className="text-xl">
                        {formatMessage("helse.over25.title")}
                    </Label>
                    <ReadMore
                        size="small"
                        header={`${formatMessage("helse.over25.readMoreTitle")}`}
                    >
                        {" "}
                        {formatMessage("helse.over25.readMore")}
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
                        {formatMessage("helse.nedsattArbeidsevne.title")}
                    </Label>
                    {/*<ReadMore
                        size="small"
                        header={`${formatMessage("helse.nedsattArbeidsevne.readMoreTitle")}`}
                    >
                        {formatMessage("helse.nedsattArbeidsevne.readMore")}
                    </ReadMore>*/}
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
                <Button variant="primary">{formatMessage("navigation.next")}</Button>
            </form>
        </>
    )
}

export default Helse
