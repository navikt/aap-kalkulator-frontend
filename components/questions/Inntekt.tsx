import { ChangeEvent, useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"

import { Alert, BodyShort, Label, Textarea, TextField } from "@navikt/ds-react"
import { useRouter } from "next/router"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import Radio from "../radio/Radio"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import { FormWrapper } from "../formWrapper/FormWrapper"

interface Inntekt {
    inntekt1: string
    inntekt2: string
    inntekt3: string
}

const Inntekt = () => {
    const router = useRouter()
    const { formatMessage } = useFeatureToggleIntl()
    const { state, setState } = useContext(State)
    const [error, setError] = useState<string[]>(["", "", ""])
    const [arbeidsTimerError, setArbeidsTimerError] = useState("")
    const { browserState } = useContext(BrowserState)
    const [radioError, setRadioError] = useState<string>("")
    const [inntekt, setInntekt] = useState<Inntekt>({
        inntekt1:
            state.inntekt1 != undefined && !isNaN(state.inntekt1)
                ? state.inntekt1.toLocaleString("nb-NO")
                : "",
        inntekt2:
            state.inntekt2 != undefined && !isNaN(state.inntekt2)
                ? state.inntekt2.toLocaleString("nb-NO")
                : "",
        inntekt3:
            state.inntekt3 != undefined && !isNaN(state.inntekt3)
                ? state.inntekt3.toLocaleString("nb-NO")
                : "",
    })

    const onArbeidChange = (text: string) => {
        const parsed = parseFloat(text.replace(",", "."))
        setState({
            ...state,
            arbeidstimer: text,
        })
        if (!isNaN(parsed) || text == "") {
            setArbeidsTimerError("")
        }
        if (text.match(/^([0-9]+)([,.][0-9]*)?$/g) == null) {
            setArbeidsTimerError(
                "Du må skrive et tall. Tallet kan inneholde desimaler."
            )
        }
    }

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInntekt({
            ...inntekt,
            [event.target.name]: event.target.value,
        })
        if (event.target.value.match(/^([0-9\s]+)([,.][0-9]*)?$/g) != null) {
            const tekst = event.target.value.replace(/[\.,\s]/g, "")
            const verdi = parseFloat(tekst)
            const index =
                parseInt(event.target.name[event.target.name.length - 1]) - 1
            let newErrors = error
            newErrors[index] = ""
            setError(newErrors)
            setInntekt({
                ...inntekt,
                [event.target.name]: !isNaN(verdi)
                    ? verdi.toLocaleString("nb-NO")
                    : event.target.value,
            })
        }
    }
    const handleSubmit = async (event: React.FormEvent) => {
        let arbeidsgrad = 0
        let arbeidsTimer = 0
        event.preventDefault()

        arbeidsTimer =
            state.arbeidstimer == undefined
                ? NaN
                : parseFloat(state.arbeidstimer.replace(",", "."))
        arbeidsgrad = (arbeidsTimer / 37.5) * 100

        const errorMessage = "Fyll inn inntekt."
        const inntekt1 = parseFloat(inntekt.inntekt1.replace(/\s/g, ""))
        const inntekt2 = parseFloat(inntekt.inntekt2.replace(/\s/g, ""))

        const inntekt3 = parseFloat(inntekt.inntekt3.replace(/\s/g, ""))
        const errors = [
            !isNaN(inntekt1) ? "" : errorMessage,
            !isNaN(inntekt2) ? "" : errorMessage,
            !isNaN(inntekt3) ? "" : errorMessage,
        ]
        setError(errors)
        if (state.harLoenn == undefined) {
            setRadioError(formatMessage("income.gotIncome.validation.required"))
        }
        if (
            (errors.some((v) => v.length > 0) && state.harLoenn == true) ||
            state.harLoenn == undefined ||
            arbeidsTimerError.length > 0
        ) {
            return
        }

        setState({
            ...state,
            arbeidsgrad,
            inntekt1,
            inntekt2,
            inntekt3,
        })

        await router.push("/steg/3")
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    const inntektsAar = [
        state.sykmeldtAar - 1,
        state.sykmeldtAar - 2,
        state.sykmeldtAar - 3,
    ]

    const idKorreksjon = (index: number) => {
        return 3 - index
    }
    const indexKorreksjon = (index: number) => {
        return 2 - index
    }

    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harLoenn: value == "Ja",
            inntekt1:
                state.inntekt1 !== undefined && !isNaN(state.inntekt1)
                    ? state.inntekt1.toLocaleString("nb-NO")
                    : "",
            inntekt2:
                state.inntekt2 !== undefined && !isNaN(state.inntekt2)
                    ? state.inntekt2.toLocaleString("nb-NO")
                    : "",
            inntekt3:
                state.inntekt3 !== undefined && !isNaN(state.inntekt3)
                    ? state.inntekt3.toLocaleString("nb-NO")
                    : "",
        })
        setRadioError("")
    }

    const readMoreText = (
        <div>
            <BodyShort spacing>
                {formatMessage("income.gotIncome.readMore1")}
            </BodyShort>
            <BodyShort>{formatMessage("income.gotIncome.readMore2")}</BodyShort>
        </div>
    )
    return (
        <>
            <Stepper />
            <BackLink target="/steg/1" />
            <QuestionHeader
                image="/aap/kalkulator/ikoner/wallet_circle.svg"
                alt=""
                tittel={formatMessage("income.title")}
            />
            <FormWrapper handleSubmit={handleSubmit}>
                <div>
                    <Label id="q1" className="text-xl">
                        Hvor mye jobber to nå?
                    </Label>
                    <BodyShort id="d1" spacing>
                        Vi regner at en arbeidsuke er 37.5 timer, som tilsvarer
                        100%.
                    </BodyShort>
                    <div className="flex flex-row items-center gap-2">
                        <TextField
                            className="w-1/6"
                            label=""
                            aria-labelledby="q1"
                            aria-describedby="d1"
                            inputMode="numeric"
                            error={arbeidsTimerError}
                            value={state?.arbeidstimer}
                            onChange={(event) =>
                                onArbeidChange(event.target.value)
                            }
                        ></TextField>
                        <BodyShort>Timer</BodyShort>
                    </div>
                    {arbeidsTimerError != "" && (
                        <ul
                            id="error1"
                            aria-live="assertive"
                            className="list-disc"
                        >
                            <li className="ml-5 font-bold text-red-500 mb-4">
                                {arbeidsTimerError}
                            </li>
                        </ul>
                    )}
                    {(state?.arbeidstimer ?? 0) > 22.5 && (
                        <Alert className="mt-4" variant={"warning"}>
                            Hvor mye du får utbetalt, avhenger av hvor mye du
                            jobber. En arbeidsuke er 37,5 timer. Jobber du mer
                            enn 22,5 timer i uka (60%), kan du ikke få
                            arbeidsavklaringspenger.
                        </Alert>
                    )}
                </div>
                <Radio
                    isError={radioError != ""}
                    errorId="error1"
                    title={formatMessage("income.gotIncome.title", {
                        inntektsAar2: inntektsAar[2].toString(),
                        inntektsAar0: inntektsAar[0].toString(),
                    })}
                    state={state.harLoenn}
                    onChange={onRadioChange}
                    readMoreTitle={formatMessage(
                        "income.gotIncome.readMoreTitle"
                    )}
                    readMore={readMoreText}
                />
                {radioError != "" && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}

                {state.harLoenn && (
                    <div>
                        <Label className="text-xl">
                            {formatMessage("income.howMuch.title")}
                        </Label>
                        <BodyShort spacing>
                            {formatMessage("income.howMuch.description")}
                        </BodyShort>
                        <div className="flex md:flex-row flex-col my-4 gap-4">
                            {inntektsAar.reverse().map((aar, index) => (
                                <div key={index} className="flex flex-col">
                                    <TextField
                                        aria-errormessage={`e${index}`}
                                        inputMode="numeric"
                                        className={`shrink md:mb-2 max-w-[160px] h-20`}
                                        key={index}
                                        id={`inntekt${idKorreksjon(index)}`}
                                        name={`inntekt${idKorreksjon(index)}`}
                                        label={`Inntekt ${aar}`}
                                        size="medium"
                                        error={error[indexKorreksjon(index)]}
                                        value={
                                            Object.values(inntekt)[
                                                indexKorreksjon(index)
                                            ]
                                        }
                                        onChange={onChange}
                                    />

                                    {error[2 - index] && (
                                        <ul
                                            id={`e${index}`}
                                            aria-live="assertive"
                                            className="list-disc ml-5 font-bold text-red-500"
                                        >
                                            <li>
                                                {error[indexKorreksjon(index)]}
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </FormWrapper>
        </>
    )
}

export default Inntekt
