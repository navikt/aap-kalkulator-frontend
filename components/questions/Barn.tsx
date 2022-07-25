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
            state.antallBarn === undefined ||
            isNaN(state.antallBarn) ||
            state.antallBarn < 0
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
                        <div className="flex flex-row items-center gap-2 mb-4">
                            <TextField
                                inputMode="numeric"
                                className="mb-4 w-16"
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
                                error={
                                    error && (
                                        <div className=" row-start-2 list-disc font-bold w-full text-red-500">
                                            {}
                                        </div>
                                    )
                                }
                            />
                            <BodyShort className={`${error && "-mt-8"}`}>
                                barn
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

export default Barn