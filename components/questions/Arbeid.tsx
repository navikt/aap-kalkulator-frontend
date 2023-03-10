import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import { FormWrapper } from "../formWrapper/FormWrapper"
import Radio from "../radio/Radio"
import { Alert, BodyShort, Label, TextField } from "@navikt/ds-react"

const Arbeid = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [arbeidsTimerError, setArbeidsTimerError] = useState("")
    const [radioErrorArbeid, setRadioErrorArbeid] = useState<
        Array<string | undefined>
    >(["", ""])
    const [arbeidsTimer, setArbeidsTimer] = useState(
        state.arbeidstimer != undefined && !isNaN(state.arbeidstimer)
            ? state.arbeidstimer.toString()
            : ""
    )
    const { browserState } = useContext(BrowserState)
    const { formatMessage } = useFeatureToggleIntl()

    const onArbeidChange = (text: string) => {
        const parsed = parseFloat(text.replace(",", "."))
        setArbeidsTimer(text)
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        let arbeidsgrad = 0
        let arbeidsT = 0

        arbeidsT =
            state.arbeidstimer == undefined
                ? NaN
                : parseFloat(arbeidsTimer.replace(",", "."))
        arbeidsgrad = (arbeidsT / 37.5) * 100

        if (state.harArbeid == undefined) {
            setRadioErrorArbeid([
                "Du må svare på om du er i arbeid nå",
                state.harAAP == undefined ? "Du må svare på om du har AAP" : "",
            ])
            return
        }
        if (state.harArbeid && isNaN(arbeidsT)) {
            setArbeidsTimerError(
                "Du må skrive et tall. Tallet kan inneholde desimaler."
            )
            return
        }

        setState({
            ...state,
            arbeidsgrad,
        })
        await router.push("/steg/4")
    }

    const onRadioAAPChange = (value: string) => {
        setState({
            ...state,
            harAAP: value == "Ja",
        })
        setRadioErrorArbeid(["", ""])
    }

    const onRadioArbeidChange = (value: string) => {
        setState({
            ...state,
            harArbeid: value == "Ja",
            harAAP: value == "Nei" ? undefined : state.harAAP,
            arbeidstimer: value == "Nei" ? undefined : state.arbeidstimer,
        })
        setRadioErrorArbeid(["", ""])
    }

    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    return (
        <>
            <Stepper />
            <BackLink target="/steg/2" />
            <QuestionHeader
                image="/aap/kalkulator/ikoner/money_circle.svg"
                alt=""
                tittel={"Arbeid"}
            />
            <FormWrapper handleSubmit={handleSubmit}>
                <Radio
                    isError={radioErrorArbeid[1] != ""}
                    errorId="error1"
                    title={"Er du i arbeid nå?"}
                    state={state.harArbeid}
                    onChange={onRadioArbeidChange}
                    readMoreTitle={"Hvorfor spør vi om du er i arbeid nå?"}
                    readMore={
                        "Hvor mye du får i AAP, avhenger av hvor mye du jobber."
                    }
                />
                {radioErrorArbeid[0] != "" && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioErrorArbeid[0]}
                        </li>
                    </ul>
                )}
                {state.harArbeid && (
                    <>
                        <Radio
                            isError={radioErrorArbeid[0] != ""}
                            errorId="error2"
                            title={"Får du AAP nå?"}
                            state={state.harAAP}
                            onChange={onRadioAAPChange}
                            readMoreTitle={"Hvorfor spør vi om du får AAP nå?"}
                            readMore={
                                "Det er ulike regler for hvor mye du kan jobbe etter at du har fått AAP og når du først søker om AAP."
                            }
                        />
                        {radioErrorArbeid[1] != "" && (
                            <ul
                                id="error2"
                                aria-live="assertive"
                                className="list-disc"
                            >
                                <li className="ml-5 font-bold text-red-500 mb-4">
                                    {radioErrorArbeid}
                                </li>
                            </ul>
                        )}
                    </>
                )}

                {state.harArbeid && (
                    <div className="mb-4">
                        <Label as={"label"} id="l1" className="text-xl">
                            Hvor mange timer jobber du per uke?
                        </Label>
                        <BodyShort id="d1">
                            Hvor mye du får utbetalt, avhenger av hvor mye du
                            jobber.
                        </BodyShort>
                        <div className="flex flex-row items-center gap-2">
                            <TextField
                                className="w-1/6"
                                label=""
                                aria-labelledby="q1"
                                aria-describedby="d1"
                                inputMode="numeric"
                                error={arbeidsTimerError}
                                value={arbeidsTimer}
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
                        {(state?.arbeidstimer ?? 0) > 18.75 && !state?.harAAP && (
                            <Alert className="mt-4" variant={"warning"}>
                                En arbeidsuke er 37,5 timer. Hvis du kan jobbe
                                mer en 18.75 timer i uka (50%), har du vanligvis
                                ikke rett til å få AAP.
                            </Alert>
                        )}
                        {(state?.arbeidstimer ?? 0) > 22.5 && state?.harAAP && (
                            <Alert className="mt-4" variant={"warning"}>
                                En arbeidsuke er 37,5 timer. Jobber du mer enn
                                22.5 timer i uka (60%), får du vanligvis ikke
                                utbetalt AAP. Det er likevel mulig å jobbe opp
                                til 80% i en periode. Dette må avtales med
                                veileder.
                            </Alert>
                        )}
                    </div>
                )}
            </FormWrapper>
        </>
    )
}

export default Arbeid
