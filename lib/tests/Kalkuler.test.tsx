// noinspection JSNonASCIINames

import { grunnbeloep, GrunnbeloepHistorikk } from "../utils/types"
import { StateInterface } from "../../components/state/State"
import { kalkuler } from "../logic/Kalkuler"
import { toKr } from "../utils/HjelpeFunksjoner"

export const getG = () => {
    const dataG: grunnbeloep = { grunnbeloep:111477}

    const dataHistorikk = [{
            dato:"2022-05-01",
            grunnbeloep:111477,
            gjennomsnittPerAar:109784
        }, {
            dato:"2021-05-01",
            grunnbeloep:106399,
            gjennomsnittPerAar:104716,
        }, {
            dato:"2020-05-01",
            grunnbeloep:101351,
            gjennomsnittPerAar:100853,
        }, {
            dato:"2019-05-01",
            grunnbeloep:99858,
            gjennomsnittPerAar:98866,
        }, {
            dato:"2018-05-01",
            grunnbeloep:96883,
            gjennomsnittPerAar:95800,
        }]


    // @ts-ignore
    const resHis: GrunnbeloepHistorikk[] = dataHistorikk.map((item) => {
        // noinspection NonAsciiCharacters
        return {
            grunnbeloep: item.grunnbeloep,
            dato: new Date(item.dato).getFullYear(),
            gjennomsnittPerAar: item.gjennomsnittPerAar
                ? item.gjennomsnittPerAar
                : null,
        }
    })
    return { props: { G: dataG, Historikk: resHis } }
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
            harLoenn: true,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            harBarn: false,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(441449)
        expect(resultat.logs.length).toBe(2)
    })
    it("ytelse med grunnbeløp 2g, 7 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: false,
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
        expect(resultat.resultat).toBe(272094)
        expect(resultat.logs.length).toBe(3)
        expect(resultat.logs[0]).toEqual(<p>Siden inntekten din er lavere enn minstebeløpet på 2G (2 ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli oppjustert til <strong>{toKr(337809)} kr</strong>. Inntekten din er justert ut fra endring i grunnbeløpet.</p>)
        expect(resultat.logs[1]).toEqual(<p>Arbeidsavklaringspengene utgjør 66 % av beregningsgrunnlaget, og blir derfor <strong>{toKr(222954)} kr</strong>.</p>)
        expect(resultat.logs[2]).toEqual(<p>For hvert barn får du {toKr(7020)} kr per år. Siden du har {7} barn, kan du få {toKr(49140)} kr i tillegg. Dette blir til sammen <strong>{toKr(272094)} kr</strong>.</p>)
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
            harLoenn: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(279114)
        expect(resultat.logs.length).toBe(3)
    })
    it("ytelse med grunnbeløp 6g, 22 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
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
        expect(resultat.resultat).toBe(595889)
        expect(resultat.logs.length).toBe(3)
    })
    it("ytelse med grunnbeløp 6g, 23 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            harLoenn: true,
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
        expect(resultat.logs.length).toBe(3)
    })
    it("ytelse med grunnbeløp 6g, 24 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
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
        expect(resultat.logs.length).toBe(3)
    })
    it("ytelse med grunnbeløp 2g, 0 barn og 40% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: false,
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
        expect(resultat.resultat).toBe(133772)
        expect(resultat.logs.length).toBe(3)
    })
    it("ytelse med grunnbeløp 2g, 15 barn og 50% arbeidsgrad", () => {
        const state: StateInterface = {
            harLoenn: false,
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
        expect(resultat.logs.length).toBe(4)
        expect(resultat.logs[0]).toEqual(<p>Siden inntekten din er lavere enn minstebeløpet på 2G (2 ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli oppjustert til <strong>{toKr(337809)} kr</strong>. Inntekten din er justert ut fra endring i grunnbeløpet.</p>)
        expect(resultat.logs[1]).toEqual(<p>Arbeidsavklaringspengene utgjør 66 % av beregningsgrunnlaget, og blir derfor <strong>{toKr(222954)} kr</strong>.</p>)
        expect(resultat.logs[2]).toEqual(<p>For hvert barn kan du få {toKr(7020)} kr per år. Arbeidsavklaringspenger pluss barnetillegg kan ikke være mer enn 90 % av beregningsgrunnlaget. Derfor får du {toKr(81075)} kr i tillegg. Dette blir til sammen <strong>{toKr(304028)} kr</strong>.</p>)
        expect(resultat.logs[3]).toEqual(<p>En arbeidsuke er 37,5 timer. Siden du jobber {18.75} timer i uka, som er {(50).toFixed(0)} % av en vanlig arbeidsuke, blir arbeidsavklaringspengene redusert med {(50).toFixed(0)} %, fra {toKr(304028)} kr til <strong>{toKr(152014)} kr</strong>.</p>)

    })
    it("ytelse med grunnbeløp 6g, 0 barn og 20% arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
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
        expect(resultat.resultat).toBe(353159)
        expect(resultat.logs.length).toBe(3)
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
            harLoenn: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(0)
        expect(resultat.logs.length).toBe(1)
    })
    it("over 6g siste år, 2 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
            inntekt1: 700_000,
            inntekt2: 26_880,
            inntekt3: 219_799,
            antallBarn: 2,
            harBarn: true,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        //expect(resultat.resultat).toBe(455520)
        expect(resultat.resultat).toBe(455489)

    })
    it("400k avg, 2 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
            inntekt1: 400_000,
            inntekt2: 400_000,
            inntekt3: 400_000,
            antallBarn: 0,
            harBarn: false,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(290_177)
    })
    it("400k siste år, 0 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: true,
            inntekt1: 400_000,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 0,
            harBarn: false,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: true,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(281_045)
    })
    it("400k siste år, 0 barn og 0 arbeidsgrad", () => {
        const state: StateInterface = {
            ...initialState,
            harLoenn: false,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            antallBarn: 0,
            harBarn: false,
            harArbeid: false,
            sykmeldtAar: aar,
            over25: false,
        }
        const resultat = kalkuler(state, g, historikk)
        expect(resultat.resultat).toBe(148_636)
    })
})
