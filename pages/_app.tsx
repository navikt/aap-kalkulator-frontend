import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import Head from "next/head"
import React from "react"

export const State = createContext(null)

function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<StateInterface>({
        antallBarn: undefined,
        arbeidsgrad: undefined,
        inntekt1: undefined,
        inntekt2: undefined,
        inntekt3: undefined,
        sykmeldtAar: undefined
    })

    return (
       // @ts-ignore
        <State.Provider value={{ state, setState }}>
            <Head>
                <title>Aap-kalkulator</title>
            </Head>
            <Container>
                <Component {...pageProps} />
            </Container>
        </State.Provider>
    )
}

export default MyApp
