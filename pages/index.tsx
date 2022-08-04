import type { NextPage } from "next"
import { Alert, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import { useRouter } from "next/router"
import Image from "next/image"
import React, { useContext, useEffect } from "react"
import { BrowserState, State } from "./_app"
import { StateInterface } from "../components/state/State"

const Home: NextPage = () => {
    const router = useRouter()
    const { setState } = useContext(State)
    const { browserState } = useContext(BrowserState)
    useEffect(() => {
        setState({} as StateInterface)
    }, [])
    const handleStart = async () => {
        browserState.redirect = false
        await router.push("/steg/1")
    }
    return (
        <>
            <div className="flex flex-col items-center pt-4">
                {browserState.redirect && (
                    <Alert variant="info" className="mb-8">
                        Du har oppdatert siden og har derfor blitt sendt til
                        startsiden.
                    </Alert>
                )}
                <Image
                    src="/ikoner/calculator_circle.svg"
                    height="120"
                    width="120"
                    alt="kalkulator ikon"
                    className="flex items-center pb-4"
                    aria-hidden="true"
                ></Image>
                <Heading
                    level="2"
                    size="large"
                    spacing
                    aria-label="Hvor mye kan du få?"
                >
                    Hvor mye kan du få?
                </Heading>
                <Divider isTitle={true} />
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
                <ul className="list-disc space-y-2 mb-8 pl-4">
                    <li>
                        Regn ut hvor mye du kan få i arbeidsavklaringspenger.
                    </li>

                    <li>Kalkulatoren er ment som et hjelpeverktøy som viser omtrent hvor mye du kan få.</li>
                    <li>
                        Du kan få støtte selv om du svarer &quot;Nei&quot; på
                        noen av spørsmålene.
                    </li>
                    <li>
                        NAV vurderer situasjonen din nærmere hvis du sender en
                        søknad.
                    </li>
                    <li>NAV lagrer ikke informasjonen du oppgir.</li>
                </ul>

                <Button
                    onClick={handleStart}
                    className="w-20"
                    variant="primary"
                >
                    Start
                </Button>
            </div>
        </>
    )
}

export default Home
