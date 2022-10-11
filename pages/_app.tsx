import "@navikt/ds-css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { createContext, useEffect, useMemo, useState } from "react"
import Container from "../components/container/Container"
import { StateInterface } from "../components/state/State"
import { BrowserInterface } from "../components/state/BrowserInterface"
import Head from "next/head"
import { initAmplitude } from "../lib/utils/amplitude"
import { IntlProvider } from "react-intl"
import { messages } from "../utils/message"
import { useRouter } from "next/router"
import { Dekorator } from "../components/dekorator/Dekorator"

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

const getLocaleOrFallback = (locale?: string) => {
    if (locale && ["nb", "nn", "en"].includes(locale)) {
        return locale
    }

    return "nb"
}

function MyApp({ Component, pageProps }: AppProps) {
    const [state, setState] = useState<StateInterface>(initialState)
    const router = useRouter()
    const locale = getLocaleOrFallback(router.locale)

    const [browserState, setBrowserState] = useState<BrowserInterface>({
        redirect: false,
    })

    useEffect(() => {
        initAmplitude()
    }, [])

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <Dekorator>
                <BrowserState.Provider
                    value={{ browserState, setBrowserState }}
                >
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
            </Dekorator>
        </IntlProvider>
    )
}

export default MyApp
