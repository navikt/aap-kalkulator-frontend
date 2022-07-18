import type { NextPage } from "next"
import { Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import { useRouter } from "next/router"
import Image from "next/image"
import React from "react"

const Home: NextPage = () => {
    const router = useRouter()
    const handleStart = async () => {
        await router.push("/steg/1")
    }
    return (
        <>
            <div className="flex flex-col items-center pt-4">
                <Image
                    src="/ikoner/calculator_circle.svg"
                    height="120"
                    width="120"
                    alt="kalkulator ikon"
                    className="flex items-center pb-4"
                ></Image>
                <Heading
                    level="2"
                    size="large"
                    spacing
                    aria-label="Hvor mye kan du få?"
                >
                    Hvor mye kan du få?
                </Heading>
                <Divider />
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
                <ul className="list-disc space-y-2 mb-8">
                    <li>
                        Regn ut hvor mye du kan få i arbeidsavklaringspenger.
                    </li>

                    <li>Kalkulatoren er ment som et hjelpeverktøy for deg.</li>
                    <li>Resultatet er kun et anslag.</li>
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
                    aria-label="Start"
                >
                    Start
                </Button>
            </div>
        </>
    )
}

export default Home
