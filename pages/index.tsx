import type { NextPage } from "next"
import { BodyLong, Button, Heading } from "@navikt/ds-react"
import Divider from "../components/divider/Divider"
import Container from "../components/container/Container"
import { useRouter } from "next/router"
import { BreadcrumbsInterface } from "../components/breadcrumbs/breadcrumbsInterface"
import Breadcrumbs from "../components/breadcrumbs/Breadcrumbs"
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
                    aria-label="Hvor mye kan jeg få?"
                >
                    Hvor mye kan jeg få?
                </Heading>
                <Divider />
            </div>
            <div className="flex flex-col items-center mt-4 gap-4">
                <ul className="list-disc space-y-2 mb-8">
                    <li>Kalkulatoren regner ut hvor mye du får i AAP ut i fra svarene du gir. </li>
                    <li>Resultatet bestemmes av svarene du gir. </li>
                    <li>Kalkulatoren er ment som et hjelpeverktøy for deg.</li>
                    <li>Dette er ikke et vedtak fra NAV og du må søke for å få penger. Det kan du gjøre på nav.no et sted</li>
                    <li>Denne kalkulatoren er anonym, og vi lagrer ingenting!!!!(; NAV backer</li>
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
