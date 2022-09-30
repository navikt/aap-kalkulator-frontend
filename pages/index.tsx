import type { NextPage } from "next"
import { Alert, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import { useRouter } from "next/router"
import Image from "next/image"
import { useContext, useEffect } from "react"
import { BrowserState, State } from "./_app"
import { StateInterface } from "../components/state/State"
import { logAmplitudeEvent } from "../lib/utils/amplitude"
import { useFeatureToggleIntl } from "../hooks/useFeatureToggleIntl"

const Home: NextPage = () => {
    const router = useRouter()
    const { setState } = useContext(State)
    const { browserState } = useContext(BrowserState)
    useEffect(() => {
        setState({} as StateInterface)
    }, [])
    const { formatMessage } = useFeatureToggleIntl()
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
                        {formatMessage("start.refreshed")}
                    </Alert>
                )}
                <Image
                    src="/aap/kalkulator/ikoner/calculator_circle.svg"
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
                    {formatMessage("start.title")}
                </Heading>
                <Divider isTitle={true} />
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
                <ul className="list-disc space-y-2 mb-8 pl-4 md:w-5/6">
                    <li>{formatMessage("start.firstPoint")}</li>
                    <li>{formatMessage("start.secondPoint")}</li>
                    <li>{formatMessage("start.thirdPoint")}</li>
                    <li>{formatMessage("start.fourthPoint")}</li>
                </ul>

                <Button
                    onClick={handleStart}
                    className="w-20"
                    variant="primary"
                    as={"button"}
                >
                    {formatMessage("navigation.start")}
                </Button>
            </div>
        </>
    )
}

export default Home
