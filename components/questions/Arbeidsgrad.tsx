import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { BodyShort, Button, Heading, TextField } from "@navikt/ds-react"
import Image from "next/image"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"
import { stat } from "fs"

interface ArbeidsgradInterface extends HTMLFormElement {
    arbeidsgrad: HTMLInputElement
}

interface Arbeidstimer {
    arbeidstimer: string
}

const Arbeidsgrad = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState(state.arbeidsgrad ? "Ja" : "Nei")
    const [arbeidstimerState, setArbeidstimerState] = useState<Arbeidstimer>({
        arbeidstimer: state.arbeidsgrad
            ? ((state.arbeidsgrad * 37.5) / 100).toString()
            : "",
    })
    const arbeidsuke = 37.5
    const onChange = (text: string) => {
        setArbeidstimerState({
            ...arbeidstimerState,
            // @ts-ignore
            arbeidstimer: text,
        })
    }
    const handleSubmit = async (
        event: React.FormEvent<ArbeidsgradInterface>
    ) => {
        event.preventDefault()
        let arbeidstimer = 0
        let arbeidsgrad = 0

        if (open != "Ja" && open != "Nei") {
            setOpen("not Open")
            return
        }

        if (open == "Ja") {
            arbeidstimer = parseFloat(
                event.currentTarget.arbeidstimer.value.replace(",", ".")
            )
            arbeidsgrad = (arbeidstimer / arbeidsuke) * 100
        }
        setError(isNaN(arbeidstimer) || arbeidstimer < 0 ? "Ugyldig verdi" : "")

        if (isNaN(arbeidstimer) || arbeidstimer < 0) {
            return
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad,
            antallBarn: state.antallBarn,
            sykmeldtAar: state.sykmeldtAar,
        })
        await router.push("/steg/4")
    }

    const readMoreText = (
        <ul>
            {" "}
            <li> Hvor mye du får utbetalt avhenger av hvor mye du jobber.</li>
            <li>Vi vurderer en arbeidsuke til å være 37,5 timer.</li>
            <li>
                Jobber du mer enn 22,5 timer i uken får du ikke
                arbeidsavklaringspenger.{" "}
            </li>
        </ul>
    )

    return (
        <>
            <Stepper />
            <BackLink target="/steg/2" />
            <div className="flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/briefcase_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className=" flex items-center"
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Jobb
            </Heading>
            <Radio
                title="Har du jobb?"
                state={open}
                setState={setOpen}
                readMoreTitle="Hvorfor spør vi om du har jobb?"
                readMore={readMoreText}
            />
            {open == "not Open" && (
                <ul className="list-disc">
                    <li className="ml-5 font-bold text-red-500 mb-4">
                        you shall not pass?
                    </li>
                </ul>
            )}
            <form onSubmit={handleSubmit}>
                {open == "Ja" && (
                    <div className="mb-4">
                        <Heading size="small">
                            Hvor mange timer i uken jobber du?
                        </Heading>
                        <BodyShort>
                            Varierer det, kan du oppgi gjennomsnittet
                        </BodyShort>
                        <div className="flex flex-row gap-2 mb-4 items-center">
                            <TextField
                                inputMode="numeric"
                                className="mb-4 md:w-16 col-start-1"
                                id="arbeidstimer"
                                label=""
                                size="medium"
                                value={
                                    arbeidstimerState.arbeidstimer == undefined
                                        ? ""
                                        : arbeidstimerState.arbeidstimer.toString()
                                }
                                onChange={(event) =>
                                    onChange(event.target.value)
                                }
                                error={
                                    error && (
                                        <div className=" row-start-2 list-disc font-bold w-full text-red-500">
                                            {}
                                        </div>
                                    )
                                }
                            />
                            <BodyShort className={`${error && "-mt-8"}`}>
                                timer per uke
                            </BodyShort>
                        </div>
                        {error && (
                            <div className="list-disc ml-5 font-bold text-red-500 mb-4 -mt-14">
                                {error}
                            </div>
                        )}
                    </div>
                )}
                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Arbeidsgrad
