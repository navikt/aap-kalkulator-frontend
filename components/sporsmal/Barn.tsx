import { useRouter } from "next/router"
import React, { useContext, useState } from "react"
import { State } from "../../pages/_app"
import {
    BodyShort,
    Button,
    Heading,
    TextField,
} from "@navikt/ds-react"
import Image from "next/image"
import JaNeiRadio from "../jaNeiRadio/JaNeiRadio"
import Sti from "../steg/Steg"
import Tilbakeknapp from "../tilbakeknapp/Tilbakeknapp"

interface BarnInterface extends HTMLFormElement {
    antallBarn: HTMLInputElement
}

const Barn = () => {
    const router = useRouter()
    const { state, setState } = useContext(State)
    const [error, setError] = useState("")
    const [open, setOpen] = useState("")
    const handleSubmit = async (event: React.FormEvent<BarnInterface>) => {
        event.preventDefault()
        let antallBarn = 0
        if (open == "Ja") {
            antallBarn = parseInt(event.currentTarget.antallBarn.value)
        }
        setError(isNaN(antallBarn) || antallBarn < 0 ? "Ugyldig verdi" : "")

        if (isNaN(antallBarn) || antallBarn < 0) {
            return
        }

        setState({
            inntekt1: state.inntekt1,
            inntekt2: state.inntekt2,
            inntekt3: state.inntekt3,
            arbeidsgrad: state.arbeidsgrad,
            antallBarn,
            sykmeldtAar: state.sykmeldtAar,
        })
        await router.push("/resultat")
    }
    const readmoreTekst =
        "Dersom du har barn kan du få et tillegg på din utbetaling."

    return (
        <>
            <Sti />
            <Tilbakeknapp til="/steg/3" />
            <div className=" flex flex-col pt-4">
                <Image
                    src="/ikoner/teddy_circle.svg"
                    height="100"
                    width="100"
                    alt="lommebok ikon"
                    className={" flex items-center"}
                ></Image>
                <Heading size="large" level="2" spacing>
                    Barn
                </Heading>
            </div>
            <form onSubmit={handleSubmit}>
                <JaNeiRadio
                    tittel="Har du barn?"
                    readMoreTittel="Hvorfor spør vi om du har barn?"
                    readMore={readmoreTekst}
                    state={open}
                    setState={setOpen}
                />
                {open == "Ja" && (
                    <div>
                        <Heading size="small">
                            Hvor mange barn under 18 år har du?
                        </Heading>
                        <div className="flex flex-row items-center gap-2 mb-4">
                            <TextField
                                className="mb-4 w-20"
                                id="antallBarn"
                                label=""
                                size="medium"
                                error={error}
                            />
                            <BodyShort>barn</BodyShort>
                        </div>
                    </div>
                )}

                <Button variant="primary">Neste</Button>
            </form>
        </>
    )
}

export default Barn
