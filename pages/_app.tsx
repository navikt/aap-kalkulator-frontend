import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useEffect, useMemo, useState } from "react";
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import { BrowserInterface } from "../components/state/BrowserInterface"
import Head from "next/head"
import { initAmplitude } from "../lib/utils/amplitude"
import { IntlProvider } from "react-intl";
import { flattenMessages, messages } from "../utils/message";
import links from '../translations/links.json'

export const State = createContext({
    state: {} as StateInterface,
    setState: (value: any) => {},
})

export const BrowserState = createContext({
    browserState: {} as BrowserInterface,
    setBrowserState: (value: any) => {},
})
export const initialState = {
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
    harLoenn: undefined,
}
function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<StateInterface>(initialState)
    const locale = 'nb';
    const currentMessages = useMemo(
        () => ({ ...messages[locale], ...flattenMessages({ applinks: links }) }),
        [locale]
    );

    const [browserState, setBrowserState] = useState<BrowserInterface>({
        redirect: false,
    })

    useEffect(() => {
        initAmplitude()
    }, [])

    return (
        <IntlProvider locale={locale} messages={currentMessages}>
            <BrowserState.Provider value={{ browserState, setBrowserState }}>
                <State.Provider value={{ state, setState }}>
                    <Head>
                        <meta name="robots" content="noindex" />
                        <title>AAP-kalkulator - www.nav.no</title>
                    </Head>
                    <Container>
                        <Component {...pageProps} />
                    </Container>
                </State.Provider>
            </BrowserState.Provider>
        </IntlProvider>
    )
}

export default MyApp
