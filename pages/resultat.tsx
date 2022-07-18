import React, { useContext, useEffect, useState } from "react"
import { ResultState, State } from "./_app"
import { useRouter } from "next/router"
import { NextPage } from "next"
import ResultContainer from "../components/container/ResultContainer"
import {
    Alert,
    BodyShort,
    Heading,
    Link,
    ReadMore,
    ToggleGroup,
} from "@navikt/ds-react"
import Image from "next/image"

const Resultat: NextPage = () => {
    const { resultat, setResultat } = useContext(ResultState)
    const { state, setState } = useContext(State)
    const router = useRouter()
    const [value, setValue] = useState("14dag")

    const gjennomsnitt = (state.inntekt1 + state.inntekt2 + state.inntekt3) / 3
    const pengeStyling = "flex justify-center"

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
        <>
            <div className="flex flex-col pt-4 mb-4">
                <Image
                    src="/ikoner/money_circle.svg"
                    height="100"
                    width="100"
                    alt="penger ikon"
                    className={" flex items-center"}
                ></Image>
            </div>
            <Heading
                level="2"
                size="large"
                spacing
                aria-label="Hvor mye kan jeg få?"
                className="pb-4"
            >
                Dette kan du få:
            </Heading>
            <div className="grid md:grid-cols-2 grid-cols-1 mb-4 gap-4">
                <ToggleGroup
                    onChange={(x) => setValue(x)}
                    value={value}
                    size="medium"
                    className="justify-center w-full"
                >
                    <ToggleGroup.Item value="14dag">
                        Hver 14. dag
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="arlig">Årlig</ToggleGroup.Item>
                </ToggleGroup>
                {value == "14dag" && (
                    <p className="flex text-5xl justify-center items-center">
                        {(perDag * 10).toLocaleString("nb-NO")} kr
                    </p>
                )}
                {value == "arlig" && (
                    <p className="flex text-5xl justify-center items-center">
                        {Math.ceil(resultat.resultat).toLocaleString("nb-NO")}{" "}
                        kr
                    </p>
                )}
            </div>
            <div className="pb-4">
                <ReadMore size="small" header="Hvorfor får jeg denne summen?">
                    {" "}
                    <ul className=" space-y-4">
                        {resultat.logs.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </ReadMore>
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
        </>
    )
}

export default Resultat
