import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import Head from "next/head"
import React from "react"

export const State = createContext({
    state: {
        inntekt1: 0.0,
        inntekt2: 0.0,
        inntekt3: 0.0,
        antallBarn: 0,
        arbeidsgrad: 0,
        sykmeldtAar: new Date().getFullYear(),
    },
    setState: (value: StateInterface) => {},
})

function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<StateInterface>({
        inntekt1: 0.0,
        inntekt2: 0.0,
        inntekt3: 0.0,
        antallBarn: 0,
        arbeidsgrad: 0,
        sykmeldtAar: new Date().getFullYear(),
    })
    return (
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
