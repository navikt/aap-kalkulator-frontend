import "../styles/globals.css"
import "@navikt/ds-css"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="min-h-container bg-canvas-background">
            <Component {...pageProps} />
        </div>
    )
}

export default MyApp
