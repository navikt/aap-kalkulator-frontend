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
import { WalletIcon } from "../icons/WalletIcon"

const Arbeid = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [arbeidsTimerError, setArbeidsTimerError] = useState("")
    const [radioErrorArbeid, setRadioErrorArbeid] = useState("")
    const [radioErrorAAP, setRadioErrorAAP] = useState("")
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
        if (!isNaN(parsed)) {
            setState({
                ...state,
                arbeidstimer: parsed,
            })
        }
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

        const errors = []

        let arbeidsgrad = 0
        let arbeidsT = 0

        arbeidsT =
            state.arbeidstimer == undefined
                ? undefined
                : parseFloat(arbeidsTimer.replace(",", "."))
        arbeidsgrad = (arbeidsT / 37.5) * 100

        if (!state.harArbeid) {
            errors.push("Errors Arbeid")
            setRadioErrorArbeid("Error Arbeid")
        }

        if (state.harArbeid === true && state.harAAP === undefined) {
            errors.push("Errors Arbeid")
            setRadioErrorAAP("Error AAP")
        }

        if (state.arbeidstimer === undefined && state.harArbeid) {
            errors.push("Errors Arbeid")
            setArbeidsTimerError(
                "Du må skrive et tall. Tallet kan inneholde desimaler."
            )
        }

        if (errors.length > 0) {
            return
        }

        /*if (state.harArbeid == undefined) {
            setRadioErrorArbeid([
                "Du må svare på om du er i arbeid nå",
                state.harAAP == undefined
                    ? formatMessage("work.gotAAP.required")
                    : "",
            ])
            return
        }
        if (state.harArbeid && isNaN(arbeidsT)) {
            setArbeidsTimerError(
                "Du må skrive et tall. Tallet kan inneholde desimaler."
            )
            return
        }*/

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
        setRadioErrorAAP("")
    }

    const onRadioArbeidChange = (value: string) => {
        setState({
            ...state,
            harArbeid: value == "Ja",
            harAAP: value == "Nei" ? undefined : state.harAAP,
            arbeidstimer: value == "Nei" ? undefined : state.arbeidstimer,
        })
        setRadioErrorArbeid("")
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
            <QuestionHeader image={<WalletIcon />} tittel={"Arbeid"} />
            <FormWrapper handleSubmit={handleSubmit}>
                <div className="flex flex-col">
                    <Radio
                        isError={radioErrorArbeid != ""}
                        errorId="error1"
                        title={formatMessage("work.gotWork.title")}
                        state={state.harArbeid}
                        onChange={onRadioArbeidChange}
                        readMoreTitle={formatMessage(
                            "work.gotWork.readMoreTitle"
                        )}
                        readMore={formatMessage("work.gotWork.readMore")}
                    />
                    {radioErrorArbeid != "" && (
                        <ul
                            id="error1"
                            aria-live="assertive"
                            className="list-disc"
                        >
                            <li className="ml-5 font-bold text-red-500 mb-4">
                                {radioErrorArbeid}
                            </li>
                        </ul>
                    )}
                </div>
                {state.harArbeid && (
                    <div className="flex flex-col">
                        <Radio
                            isError={radioErrorAAP != ""}
                            errorId="error2"
                            title={formatMessage("work.gotAAP.title")}
                            state={state.harAAP}
                            onChange={onRadioAAPChange}
                            readMoreTitle={formatMessage(
                                "work.gotAAP.readMoreTitle"
                            )}
                            readMore={formatMessage("work.gotAAP.readMore")}
                        />
                        {radioErrorAAP != "" && (
                            <ul
                                id="error2"
                                aria-live="assertive"
                                className="list-disc"
                            >
                                <li className="ml-5 font-bold text-red-500 mb-4">
                                    {radioErrorAAP}
                                </li>
                            </ul>
                        )}
                    </div>
                )}

                {state.harArbeid && (
                    <div className="mb-4">
                        <Label as={"label"} id="l1" className="text-xl">
                            {formatMessage("work.howManyHours.title")}
                        </Label>
                        <BodyShort id="d1">
                            {formatMessage("work.howManyHours.description")}
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
                                {formatMessage(
                                    "work.howManyHours.warning.withoutAAP"
                                )}
                            </Alert>
                        )}
                        {(state?.arbeidstimer ?? 0) > 22.5 && state?.harAAP && (
                            <Alert className="mt-4" variant={"warning"}>
                                {formatMessage(
                                    "work.howManyHours.warning.withAAP"
                                )}
                            </Alert>
                        )}
                    </div>
                )}
            </FormWrapper>
        </>
    )
}

export default Arbeid
