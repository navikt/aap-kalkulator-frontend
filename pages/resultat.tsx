import React, { useContext, useEffect, useState } from "react"
import { ResultState, State } from "./_app"
import { NextPage } from "next"
import {
    Accordion,
    Alert,
    Heading,
    Label,
    Link,
    ReadMore,
    ToggleGroup,
} from "@navikt/ds-react"
import Image from "next/image"

const Resultat: NextPage = () => {
    const { resultat, setResultat } = useContext(ResultState)
    const { state, setState } = useContext(State)
    const [value, setValue] = useState("14dag")

    useEffect(() => {
        //event.preventDefault()

        const endpoint =
            process.env.NODE_ENV == "production"
                ? "https://aap-kalkulator-api.ekstern.dev.nav.no/beregning"
                : "http://localhost:8080/beregning"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
        }

        fetch(endpoint, options)
            .then((response) => response.json())
            .then((data) => setResultat(data))
    }, [])
    const perDag = Math.ceil(resultat.resultat / 260)
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/money_circle.svg"
                    height="100"
                    width="100"
                    alt="penger ikon"
                    className={" flex items-center"}
                ></Image>
            </div>
            <div className="rounded-2xl bg-feedback-success-background p-6 w-full md:w-5/6">
                <Heading
                    level="2"
                    size="large"
                    spacing
                    aria-label="Hvor mye kan jeg få?"
                    className="pb-4"
                >
                    Dette kan du få
                </Heading>
                <div className="grid grid-cols-2 md:grid-cols-3 mb-4 gap-4 justify-center items-baseline">
                    <span className="text-4xl md:text-5xl  md:col-start-2 justify-self-end">
                        {(perDag * 10).toLocaleString("nb-NO")}&nbsp;kr
                    </span>
                    <Label>hver&nbsp;14.&nbsp;dag</Label>

                    <span className="text-2xl md:text-3xl md:col-start-2 justify-self-end">
                        {Math.ceil(resultat.resultat).toLocaleString("nb-NO")}&nbsp;kr
                    </span>
                    <Label>årlig</Label>
                </div>
            </div>
            <div className="py-4 md:w-5/6">
                <Accordion>
                    <Accordion.Item>
                        <Accordion.Header>
                            Hvorfor får jeg denne summen?
                        </Accordion.Header>
                        <Accordion.Content>
                            <ul className=" space-y-4 list-disc">
                                {resultat.logs.map((text, index) => (
                                    <li key={index}>{text}</li>
                                ))}
                            </ul>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className="pt-4">
                <Alert variant="info" size="small">
                    <p>
                        Dette er en foreløpig beregning på hva du kan få før
                        skatt. Når du har sendt søknaden og den er
                        ferdigbehandlet, vil du få vite hva du får utbetalt.
                    </p>

                    <Link className="pt-4" href="https://www.nav.no/aap">
                        Les mer om hva du kan få i AAP her.
                    </Link>
                </Alert>
            </div>
        </div>
    )
}

export default Resultat
