import React, { useContext, useEffect } from "react"
import { ResultState, State } from "./_app"
import { useRouter } from "next/router"
import { NextPage } from "next"
import ResultContainer from "../components/container/ResultContainer"
import { Alert, BodyShort, Heading, Link, ReadMore } from "@navikt/ds-react"
import Image from "next/image"

const Resultat: NextPage = () => {
    const { resultat, setResultat } = useContext(ResultState)
    const { state, setState } = useContext(State)
    const router = useRouter()

    const gjennomsnitt = (state.inntekt1 + state.inntekt2 + state.inntekt3) / 3

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
            <div className="grid md:grid-cols-3 md:grid-rows-1 gap-2 grid-cols-1 pb-4">
                <ResultContainer>
                    <Heading
                        className="flex justify-center"
                        size="small"
                        spacing
                        aria-label="Din utbetaling hver 14. dag"
                    >
                        Årlig
                    </Heading>
                    <div className="flex justify-center text-xl">
                        {resultat.resultat} kr
                    </div>
                </ResultContainer>
                <ResultContainer>
                    <Heading
                        className="flex justify-center"
                        size="small"
                        spacing
                        aria-label="Din utbetaling hver 14. dag"
                    >
                        Hver 14. dag
                    </Heading>
                    <div className="flex justify-center text-xl">
                        {perDag * 10} kr
                    </div>
                </ResultContainer>
                <ResultContainer>
                    <Heading
                        className="flex justify-center"
                        size="small"
                        spacing
                        aria-label="Din utbetaling hver 14. dag"
                    >
                        Daglig
                    </Heading>
                    <div className="flex justify-center text-xl">
                        {perDag} kr
                    </div>
                </ResultContainer>
            </div>

            <ReadMore size="small" header="Hvorfor får jeg denne summen?">
                {" "}
                Du har oppgitt at du har {gjennomsnitt} i gjennomsnittsinntekt
                de siste tre årene og {state.inntekt1} i inntekt siste året før
                du ble sykemeldt. Siden{" "}
                {Math.max(gjennomsnitt, state.inntekt1) == gjennomsnitt
                    ? "gjennomsnittsinntekten"
                    : "inntekten året før du ble sykemeldt"}{" "}
                er størst vil dette bli brukt i beregningen av din AAP. Ditt
                opprinnelige grunnlag før barn og arbeid er «dette» kr. Da er
                din ytelse (det du får utbetalt) x*66% kr Siden du jobber{" "}
                {state.arbeidsgrad} vil du bli trukket z% i utbetalt AAP Siden
                du har a barn under 18 år, vil du få et tillegg på 27*a kr. Din
                AAP vil være «penger» i året
            </ReadMore>
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
