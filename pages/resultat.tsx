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
        const endpoint = "http://0.0.0.0:8080/beregning"
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
            <div className="grid grid-cols-2 mb-4">
                <ToggleGroup
                    onChange={(x) => setValue(x)}
                    value={value}
                    size="medium"
                >
                    <ToggleGroup.Item value="14dag">
                        Hver 14. dag
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value="arlig">Årlig</ToggleGroup.Item>
                </ToggleGroup>
                {value == "14dag" && (
                    <p className="flex text-5xl justify-center">
                        {(perDag * 10).toLocaleString().replace(",", " ")} kr
                    </p>
                )}
                {value == "arlig" && (
                    <p className="flex text-5xl justify-center">
                        {resultat.resultat.toLocaleString().replace(",", " ")}{" "}
                        kr
                    </p>
                )}
            </div>
            <div className="pb-4">
                <ReadMore size="small" header="Hvorfor får jeg denne summen?">
                    {" "}
                    <ul className=" space-y-4">
                        <li>
                            Du har oppgitt at du har {gjennomsnitt} i
                            gjennomsnittsinntekt de siste tre årene og{" "}
                            {state.inntekt1} i inntekt siste året før du ble
                            sykemeldt. Siden{" "}
                            {Math.max(gjennomsnitt, state.inntekt1) ==
                            gjennomsnitt
                                ? "gjennomsnittsinntekten"
                                : "inntekten året før du ble sykemeldt"}{" "}
                            er størst vil dette bli brukt i beregningen av din
                            AAP.{" "}
                        </li>
                        <li>
                            {" "}
                            Ditt opprinnelige grunnlag før barn og arbeid er
                            «dette» kr. Da er din ytelse (det du får utbetalt)
                            x*66% kr{" "}
                        </li>
                        <li>
                            {" "}
                            Siden du jobber {state.arbeidsgrad} vil du bli
                            trukket z% i utbetalt AAP{" "}
                        </li>
                        <li>
                            {" "}
                            Siden du har a barn under 18 år, vil du få et
                            tillegg på 27*a kr.{" "}
                        </li>
                        <li> Din AAP vil være «penger» i året</li>
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
