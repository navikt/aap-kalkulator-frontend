import React, { useContext, useEffect } from "react"
import { ResultState } from "./_app"
import { useRouter } from "next/router"
import { NextPage } from "next"
import ResultContainer from "../components/container/ResultContainer"
import { Heading } from "@navikt/ds-react"
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs"

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
            <Heading
                level="2"
                size="large"
                spacing
                aria-label="Hvor mye kan jeg få?"
                className="flex justify-center pt-4"
            >
                Resultat
            </Heading>
            <ResultContainer>
                <div>
                    <Heading
                        className="p-4 pl-9 pt-6"
                        size="small"
                        spacing
                        aria-label="Din utbetaling hver 14. dag"
                    >
                        Din utbetaling hver 14. dag
                    </Heading>
                    <div
                        className={`p-4 border-t-2 border-solid border-divider w-5/6 h-1 mb-2 mx-auto`}
                    />
                    <div className="flex justify-center text-3xl">
                        {resultat.resultat} kr
                    </div>
                </div>
            </ResultContainer>
        </>
    )
}

export default Resultat
