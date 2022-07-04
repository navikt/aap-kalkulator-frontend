import "../styles/globals.css"
import "@navikt/ds-css"
import type { AppProps } from "next/app"
import { createContext, useState } from "react"
import { ResultInterface } from "../components/result/Result"
import Container from "../components/container/Container"

export const ResultState = createContext({
    resultat: { resultat: 0.0 },
    setResultat: (value: ResultInterface) => {},
})

function MyApp({ Component, pageProps }: AppProps) {
    const [resultat, setResultat] = useState<ResultInterface>({ resultat: 0.0 })
    return (
        <ResultState.Provider value={{ resultat, setResultat }}>
            <Container>
                <Component {...pageProps} />
            </Container>
        </ResultState.Provider>
    )
}

export default MyApp
