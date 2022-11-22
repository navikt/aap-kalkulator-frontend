import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"
import { BodyShort, Button, Label, TextField } from "@navikt/ds-react"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState<string>("")
    const { formatMessage } = useFeatureToggleIntl()
    const { browserState } = useContext(BrowserState)

    const arbeidsuke = 37.5
    const onChange = (text: string) => {
        const parsed = parseFloat(text.replace(",", "."))
        setState({
            ...state,
            arbeidstimer: text,
        })
        if (!isNaN(parsed) || text == "") {
            setError("")
        }
    }
    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harArbeid: value == "Ja",
            arbeidstimer: value == "Nei" ? undefined : state.arbeidstimer,
        })
        setRadioError("")
    }
    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidstimer = 0
        let arbeidsgrad = 0

        if (state.harArbeid == undefined) {
            setRadioError(formatMessage("work.gotWork.validation.required"))
            return
        }

        if (state.harArbeid) {
            arbeidstimer =
                state.arbeidstimer == undefined
                    ? NaN
                    : parseFloat(state.arbeidstimer.replace(",", "."))
            arbeidsgrad = (arbeidstimer / arbeidsuke) * 100
        }

        if (isNaN(arbeidstimer) || arbeidstimer < 0 || arbeidstimer > 168) {
            setError(formatMessage("work.howManyHours.validation.limits"))
            return
        }

        setState({
            ...state,
            arbeidsgrad,
        })
        await router.push("/steg/4")
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    const readMoreText = (
        <BodyShort>
            Hvor mye du får utbetalt, avhenger av hvor mye du jobber. En
            arbeidsuke er 37,5 timer. Jobber du mer enn 22,5 timer i uka, kan du
            ikke få arbeidsavklaringspenger.
        </BodyShort>
    )

    return (
        <>
            <Stepper />
            <BackLink target="/steg/2" />
            <QuestionHeader
                image="/aap/kalkulator/ikoner/briefcase_circle.svg"
                alt=""
                tittel={formatMessage("work.title")}
            />
            <form onSubmit={handleSubmit}>
                <Radio
                    isError={radioError != ""}
                    errorId="error1"
                    title={formatMessage("work.gotWork.title")}
                    state={state.harArbeid}
                    onChange={onRadioChange}
                    readMoreTitle={formatMessage("work.gotWork.readMoreTitle")}
                    readMore={readMoreText}
                />
                {radioError != "" && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}
                {state.harArbeid && (
                    <div className="mb-4">
                        <Label as={"label"} id="l1" className="text-xl">
                            {formatMessage("work.howManyHours.title")}
                        </Label>
                        <BodyShort>
                            {formatMessage("work.howManyHours.description")}
                        </BodyShort>
                        <div className="flex flex-col my-2 ">
                            <div className="flex flex-row gap-2 items-center">
                                <TextField
                                    aria-errormessage="e1"
                                    aria-labelledby="l1 d1"
                                    inputMode="decimal"
                                    className="mb-2 md:w-1/5 col-start-1 w-1/4"
                                    id="arbeidstimer"
                                    label=""
                                    size="medium"
                                    value={state.arbeidstimer}
                                    onChange={(event) =>
                                        onChange(event.target.value)
                                    }
                                    error={
                                        error && <div className="hidden"></div>
                                    }
                                />
                                <BodyShort as={"p"} id="d1">
                                    {formatMessage("work.howManyHours.trail")}
                                </BodyShort>
                            </div>
                            {error && (
                                <ul
                                    id="e1"
                                    aria-live="assertive"
                                    className="list-disc ml-5 font-bold text-red-500"
                                >
                                    <li>{error}</li>
                                </ul>
                            )}
                        </div>
                    </div>
                )}
                <Button variant="primary">
                    {formatMessage("navigation.next")}
                </Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
