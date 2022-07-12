import React, { useContext, useEffect } from "react"
import { ResultState } from "./_app"
import { useRouter } from "next/router"
import { NextPage } from "next"
import ResultContainer from "../components/container/ResultContainer"
import {Alert, BodyShort, Heading, Link, ReadMore} from "@navikt/ds-react"
import Image from "next/image";

const Resultat: NextPage = () => {
    const { resultat, setResultat } = useContext(ResultState)
    const router = useRouter()
    useEffect(() => {
        // nå er det mulig å få inn 0 i resultat grunnet arbeidsgradsberegning
        /*if (resultat.resultat == 0.0) {
            router.push("/")
        }*/
    }, [resultat])
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
                <div className="pb-4">
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
                </div>
                <div className="pb-4">
                <Heading
                    className="flex justify-center"
                    size="small"
                    spacing
                    aria-label="Din utbetaling hver 14. dag"
                >
                    Hver 14. dag
                </Heading>
                    <div className="flex justify-center text-xl">
                        {resultat.resultat} kr
                    </div>
                </div>
                <div className="pb-4">
                <Heading
                    className="flex justify-center"
                    size="small"
                    spacing
                    aria-label="Din utbetaling hver 14. dag"
                >
                    Dagsats
                </Heading>
                    <div className="flex justify-center text-xl">
                        {resultat.resultat} kr
                    </div>
            </div>



            </div>

            <ReadMore
                size="small"
                header="Hvorfor får jeg denne summen?"
            >
                {" "}
                Fordi vi lurer ;)
            </ReadMore>
            <div className="pt-4">
            <Alert variant="info" size="small">
                <p>Dette er en foreløpig beregning på hva du kan få før skatt. Når du har sendt søknaden og den er ferdigbehandlet, vil du få vite hva du får utbetalt.</p>

                <Link className="pt-4" href="https://www.nav.no/aap">Les mer om hva du kan få i AAP her.</Link>
            </Alert>
            </div>

        </>
    )
}

export default Resultat
