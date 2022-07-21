import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import { ResultInterface } from "../components/result/Result"
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import Head from "next/head"

export const ResultState = createContext({
    resultat: {
        resultat: 0.0,
        logs: Array<string>(),
        personInfo: {
            inntekt1: 0.0,
            inntekt2: 0.0,
            inntekt3: 0.0,
            antallBarn: 0,
            arbeidsgrad: 0,
        },
    },
    setResultat: (value: ResultInterface) => {},
})

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
    const [resultat, setResultat] = useState<ResultInterface>({
        resultat: 0.0,
        logs: [],
        personInfo: {
            inntekt1: 0.0,
            inntekt2: 0.0,
            inntekt3: 0.0,
            antallBarn: 0,
            arbeidsgrad: 0,
            sykmeldtAar: new Date().getFullYear(),
        },
    })
    const [state, setState] = useState<StateInterface>({
        inntekt1: 0.0,
        inntekt2: 0.0,
        inntekt3: 0.0,
        antallBarn: 0,
        arbeidsgrad: 0,
        sykmeldtAar: new Date().getFullYear(),
    })
    return (
        <ResultState.Provider value={{ resultat, setResultat }}>
            <State.Provider value={{ state, setState }}>
                <Head>
                    <title>Aap-kalkulator</title>
                </Head>
                <Container>
                    <Component {...pageProps} />
                </Container>
            </State.Provider>
        </ResultState.Provider>
    )
}

export default MyApp
