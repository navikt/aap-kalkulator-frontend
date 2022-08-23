// noinspection JSNonASCIINames

import { grunnbeloep, GrunnbeloepHistorikk } from "../utils/types"
import { StateInterface } from "../../components/state/State"
import { kalkuler } from "../logic/Kalkuler"
import { Simulate } from "react-dom/test-utils";
import touchEnd = Simulate.touchEnd;
import { toKr } from "../logic/Inntekt";

export const getG = () => {
    const dataG: grunnbeloep = JSON.parse(
        '{"dato":"2022-05-01","grunnbeloep":111477,"grunnbeloepPerMaaned":9290,"gjennomsnittPerAar":109784,"omregningsfaktor":1.047726,"virkningstidspunktForMinsteinntekt":"2022-05-23"}'
    )
    const dataHistorikk = JSON.parse(
        '[{"dato":"2022-05-01","grunnbeløp":111477,"grunnbeløpPerMåned":9290,"gjennomsnittPerÅr":109784,"omregningsfaktor":1.047726,"virkningstidspunktForMinsteinntekt":"2022-05-23"},{"dato":"2021-05-01","grunnbeløp":106399,"grunnbeløpPerMåned":8867,"gjennomsnittPerÅr":104716,"omregningsfaktor":1.049807,"virkningstidspunktForMinsteinntekt":"2021-05-24"},{"dato":"2020-05-01","grunnbeløp":101351,"grunnbeløpPerMåned":8446,"gjennomsnittPerÅr":100853,"omregningsfaktor":1.014951,"virkningstidspunktForMinsteinntekt":"2020-09-21"},{"dato":"2019-05-01","grunnbeløp":99858,"grunnbeløpPerMåned":8322,"gjennomsnittPerÅr":98866,"omregningsfaktor":1.030707,"virkningstidspunktForMinsteinntekt":"2019-05-27"},{"dato":"2018-05-01","grunnbeløp":96883,"grunnbeløpPerMåned":8074,"gjennomsnittPerÅr":95800,"omregningsfaktor":1.034699,"virkningstidspunktForMinsteinntekt":"2018-06-04"}]'
    )
    const resG = dataG
    // @ts-ignore
    const resHis: GrunnbeloepHistorikk[] = dataHistorikk.map((item) => {
        // noinspection NonAsciiCharacters
        return {
            grunnbeloep: item.grunnbeløp,
            dato: new Date(item.dato).getFullYear(),
            gjennomsnittPerAar: item.gjennomsnittPerÅr
                ? item.gjennomsnittPerÅr
                : null,
        }
    })
    return { props: { G: resG, Historikk: resHis } }
}

const aar = new Date().getFullYear()
const initialState = {
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
}

describe("integrasjon", () => {
    const res = getG()
    const g = res.props.G
    const historikk = res.props.Historikk
    const enMill = 1_000_000
    it("ytelse med grunnbeløp 6g, 0 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            harBarn: false,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(445908)
    })
    it("ytelse med grunnbeløp 2g, 7 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 7,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(274346)
    })
    it("ytelse med grunnbeløp 2g, 8 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 8,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(281366)
    })
    it("ytelse med grunnbeløp 6g, 22 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            antallBarn: 22,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(600348)
    })
    it("ytelse med grunnbeløp 6g, 23 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            antallBarn: 23,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(601976)
    })
    it("ytelse med grunnbeløp 6g, 24 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            antallBarn: 24,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(601976)
    })
    it("ytelse med grunnbeløp 2g, 0 barn og 40% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 0,
            harBarn: false,
            harArbeid: true,
            arbeidsgrad: 40,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(135124)
    })
    it("ytelse med grunnbeløp 2g, 15 barn og 50% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 15,
            harBarn: true,
            harArbeid: true,
            arbeidsgrad: 50,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(152014)
        expect(resultat.logs[0]).toEqual(<p>Siden inntekten din er lavere enn minstebeløpet på 2G (2 ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli oppjustert til <strong>{toKr(337809)} kr</strong>. Inntekten din er justert ut fra endring i grunnbeløpet.</p>)
        expect(resultat.logs[1]).toEqual(<p>Arbeidsavklaringspengene utgjør 66 % av beregningsgrunnlaget, og blir derfor <strong>{toKr(225206)} kr</strong>.</p>)
        expect(resultat.logs[2]).toEqual(<p>For hvert barn kan du få {toKr(7020)} kr per år. Arbeidsavklaringspenger pluss barnetillegg kan ikke være mer enn 90 % av beregningsgrunnlaget. Derfor får du {toKr(78823)} kr i tillegg. Dette blir til sammen <strong>{toKr(304028)} kr</strong>.</p>)
        expect(resultat.logs[3]).toEqual(<p>En arbeidsuke er 37,5 timer. Siden du jobber {18.75} timer i uka, som er {50} % av en vanlig arbeidsuke, blir arbeidsavklaringspengene redusert med {50} %, fra {toKr(304028)} kr til <strong>{toKr(152014)} kr</strong>.</p>)

    })
    it("ytelse med grunnbeløp 6g, 0 barn og 20% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            antallBarn: 0,
            harBarn: false,
            harArbeid: true,
            arbeidsgrad: 20,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(356726)
    })
    it("ytelse med grunnbeløp 6g, 5 barn og 61% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 5,
            harBarn: true,
            harArbeid: true,
            arbeidsgrad: 61,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(0)
    })
})
