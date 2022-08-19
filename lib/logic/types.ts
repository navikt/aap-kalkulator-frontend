import {Locale} from "@navikt/nav-dekoratoren-moduler";
import {StateInterface} from "../../components/state/State";

export type grunnbeloep = {
    grunnbeloep: number,
}

export type GrunnbeloepHistorikk = {
    grunnbeløp: number,
    dato: string,
    gjennomsnittPerÅr: number | undefined,
}
