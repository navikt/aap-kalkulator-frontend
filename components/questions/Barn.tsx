import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { BrowserState, State } from "../../pages/_app"
import { BodyShort, Label, Link, TextField } from "@navikt/ds-react"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import QuestionHeader from "../questionHeader/QuestionHeader"
import { FormWrapper } from "../formWrapper/FormWrapper"
import { useFeatureToggleIntl } from "../../hooks/useFeatureToggleIntl"
import { TeddyIcon } from "../icons/TeddyIcon"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState<string | undefined>(undefined)
    const { browserState } = useContext(BrowserState)
    const { formatMessage } = useFeatureToggleIntl()
    const [antallBarn, setAntallBarn] = useState(
        state.antallBarn != undefined && !isNaN(state.antallBarn)
            ? state.antallBarn.toString()
            : ""
    )
    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harBarn: value == "Ja",
            antallBarn: value == "Nei" ? undefined : state.antallBarn,
        })
        setRadioError(undefined)
    }

    const onChange = (text: string) => {
        setAntallBarn(text)
        if (text.match(/^([0-9]+)/) != null) {
            const parsed = parseInt(text)
            setError("")

            setState({
                ...state,
                antallBarn: isNaN(parsed) ? undefined : parsed,
            })
        }
    }
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (state.harBarn == undefined) {
            setRadioError("Du må velge enten ja eller nei for å gå videre.")
            return
        }

        if (
            (state.antallBarn === undefined && state.harBarn) ||
            (state.antallBarn !== undefined &&
                (isNaN(state.antallBarn) || state.antallBarn < 0)) ||
            (antallBarn.match(/^([0-9]+)$/) == null && state.harBarn)
        ) {
            setError("Antall barn må være et tall.")
            return
        }

        await router.push("/resultat")
    }
    if (state.sykmeldtAar === undefined) {
        browserState.redirect = true
        router.push("/")
        return <></>
    }

    const readmoreTekst = (
        <BodyShort>
            {formatMessage("children.gotChildren.readMore")}
            <Link
                href="https://www.nav.no/aap#hvormye-forsorgerbarn"
                target="_blank"
                rel="noreferrer"
                as={"a"}
            >
                {formatMessage("children.gotChildren.lesMer")}
            </Link>
        </BodyShort>
    )

    return (
        <>
            <Stepper />
            <BackLink target="/steg/3" />
            <QuestionHeader
                image={<TeddyIcon />}
                tittel={formatMessage("children.title")}
            />
            <FormWrapper handleSubmit={handleSubmit}>
                <Radio
                    isError={radioError != undefined}
                    errorId="error1"
                    title={formatMessage("children.gotChildren.title")}
                    readMoreTitle={formatMessage(
                        "children.gotChildren.readMoreTitle"
                    )}
                    readMore={
                        <>
                            <BodyShort>
                                {formatMessage("children.gotChildren.readMore")}
                                <Link
                                    href="https://www.nav.no/aap#hvormye-forsorgerbarn"
                                    target="_blank"
                                    rel="noreferrer"
                                    as={"a"}
                                >
                                    {formatMessage(
                                        "children.gotChildren.lesMer"
                                    )}
                                </Link>
                            </BodyShort>
                        </>
                    }
                    state={state.harBarn}
                    onChange={onRadioChange}
                />
                {radioError != undefined && (
                    <ul id="error1" aria-live="assertive" className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}
                {state.harBarn && (
                    <div className="mb-4">
                        <Label as={"label"} id="l1" className="text-xl">
                            {formatMessage("children.howMany.title")}
                        </Label>
                        <BodyShort as={"p"} id="bs1">
                            {formatMessage("children.howMany.description")}
                        </BodyShort>
                        <div className="flex flex-col my-2">
                            <div className="flex flex-row items-center gap-2">
                                <TextField
                                    aria-errormessage="e2"
                                    aria-labelledby="l1"
                                    aria-describedby="bs1"
                                    inputMode="numeric"
                                    className="mb-2 md:w-1/5 w-1/4"
                                    id="antallBarn"
                                    label=""
                                    size="medium"
                                    value={antallBarn}
                                    onChange={(event) =>
                                        onChange(event.target.value)
                                    }
                                    error={
                                        error && <div className="hidden"></div>
                                    }
                                />
                                <BodyShort as={"p"} id="d1">
                                    {formatMessage("children.howMany.unit")}
                                </BodyShort>
                            </div>
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
                )}
            </FormWrapper>
        </>
    )
}

export default Barn
