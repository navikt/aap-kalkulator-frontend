import type { NextPage } from "next"
import { Alert, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import { useRouter } from "next/router"
import Image from "next/image"
import { useContext, useEffect } from "react"
import { BrowserState, State } from "./_app"
import { StateInterface } from "../components/state/State"
import { logAmplitudeEvent } from "../lib/utils/amplitude"

const Home: NextPage = () => {
    const router = useRouter()
    const { setState } = useContext(State)
    const { browserState } = useContext(BrowserState)
    useEffect(() => {
        setState({} as StateInterface)
    }, [])
    const handleStart = () => {
        logAmplitudeEvent("skjema startet", {
            skjemanavn: "aap-kalkulator",
            skjemaId: "aap-kalkulator",
        })
        browserState.redirect = false
        router.push("/steg/1")
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
                <ul className="list-disc space-y-2 mb-8 pl-4 md:w-5/6">
                    <li>
                        Kalkulatoren er ment som et hjelpeverktøy for deg, du
                        får vite hva du får utbetalt hvis du søker og får
                        innvilget arbeidsavklaringspenger (AAP).
                    </li>
                    <li>
                        Dette er ikke en søknad om AAP. Det er alltid vedtaket
                        du får som er korrekt, denne kalkulatoren gir kun et
                        estimat.
                    </li>
                    <li>
                        Du får et resultat selv om du svarer &quot;Nei&quot; på
                        noen av spørsmålene.
                    </li>
                    <li>NAV lagrer ikke informasjonen du oppgir.</li>
                    <li>
                        Kalkulatoren tar ikke høyde for reduksjon av AAP hvis du
                        mottar andre ytelser.
                    </li>
                </ul>

                <Button
                    onClick={handleStart}
                    className="w-20"
                    variant="primary"
                    as={"button"}
                >
                    Start
                </Button>
            </div>
        </>
    )
}

export default Home
