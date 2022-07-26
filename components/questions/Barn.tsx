import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import { BodyShort, Button, Heading, Label, TextField } from "@navikt/ds-react"
import Image from "next/image"
import Radio from "../radio/Radio"
import Stepper from "../stepper/Stepper"
import BackLink from "../backlink/BackLink"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [radioError, setRadioError] = useState<string | undefined>(undefined)

    const onRadioChange = (value: string) => {
        setState({
            ...state,
            harBarn: value == "Ja",
            antallBarn: value == "Nei" ? undefined : state.antallBarn,
        })
    }

    const onChange = (text: string) => {
        const parsed = parseInt(text)
        setError("")

        setState({
            ...state,
            antallBarn: isNaN(parsed) ? undefined : parsed,
        })

    }
    const handleSubmit = async (event: React.FormEvent<BarnInterface>) => {
        event.preventDefault()

        if (state.harBarn == undefined) {
            setRadioError("You shall not pass:)")
            return
        }

        if (
            (state.antallBarn === undefined && state.harBarn)||
            (state.antallBarn !== undefined && (isNaN(state.antallBarn) ||
            state.antallBarn < 0))
        ) {
            setError("Ugyldig verdi")
            return
        }

        await router.push("/resultat")
    }
    const readmoreTekst =
        "Dersom du har barn kan du få et tillegg på din utbetaling."

    return (
        <>
            <Stepper />
            <BackLink target="/steg/3" />
            <div aria-hidden="true" className=" flex flex-col pt-4">
                <Image
                    src="/ikoner/teddy_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
            </div>
            <Heading size="large" level="2" spacing>
                Barn
            </Heading>
            <form onSubmit={handleSubmit}>
                <Radio
                    title="Har du barn?"
                    readMoreTitle="Hvorfor spør vi om du har barn?"
                    readMore={readmoreTekst}
                    state={state.harBarn}
                    onChange={onRadioChange}
                />
                {radioError != undefined && (
                    <ul className="list-disc">
                        <li className="ml-5 font-bold text-red-500 mb-4">
                            {radioError}
                        </li>
                    </ul>
                )}
                {state.harBarn && (
                    <div>
                        <Label className="text-xl">
                            Hvor mange barn har du?
                        </Label>
                        <BodyShort>
                            Barnet må være under 18 år og bo hos deg.
                        </BodyShort>
                        <div className="flex flex-col h-24 my-2">
                        <div className="flex flex-row items-center gap-2">
                            <TextField
                                inputMode="numeric"
                                className="mb-2 md:w-1/5 w-1/4"
                                id="antallBarn"
                                label=""
                                size="medium"
                                value={
                                    state.antallBarn == undefined
                                        ? ""
                                        : state.antallBarn.toString()
                                }
                                onChange={(event) =>
                                    onChange(event.target.value)
                                }
                                error = {error && <div className="hidden"></div>}
                            />
                            <BodyShort>
                                barn
                            </BodyShort>
                        </div>
                        {error && (
                            <ul className="list-disc ml-5 font-bold text-red-500">
                                <li>{error}</li>
                            </ul>
                        )}
                        </div>
                    </div>
                )}

                <Button variant="primary">Gå videre</Button>
            </form>
        </>
    )
}

export default Barn
