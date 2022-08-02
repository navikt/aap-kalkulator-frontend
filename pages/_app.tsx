import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import { BrowserInterface } from "../components/state/BrowserInterface"
import Head from "next/head"
import React from "react"

export const State = createContext({
    state: {} as StateInterface,
    setState: (value: any) => {},
})

export const BrowserState = createContext({
    browserState: {} as BrowserInterface,
    setBrowserState: (value: any) => {},
})

function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<StateInterface>({
        antallBarn: undefined,
        arbeidsgrad: undefined,
        inntekt1: undefined,
        inntekt2: undefined,
        inntekt3: undefined,
        sykmeldtAar: undefined,
        lengsteSteg: 1,
        harArbeid: undefined,
        arbeidstimer: undefined,
        harBarn: undefined,
        over25: undefined,
    })

    const [browserState, setBrowserState] = useState<BrowserInterface>({
        redirect: false,
    })

    return (
        <BrowserState.Provider value={{ browserState, setBrowserState }}>
            <State.Provider value={{ state, setState }}>
                <Head>
                    <title>AAP-kalkulator - www.nav.no</title>
                </Head>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </State.Provider>
        </BrowserState.Provider>
    )
}

export default MyApp
