import { Locale } from "@navikt/nav-dekoratoren-moduler"
import { StateInterface } from "../../components/state/State"

export type grunnbeloep = {
    grunnbeloep: number
}

export type GrunnbeloepHistorikk = {
    grunnbeloep: number
    dato: Date
    gjennomsnittPerAar: number | null
}
