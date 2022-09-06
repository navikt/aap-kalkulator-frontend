// noinspection JSNonASCIINames

import { Result } from "../../components/result/Result"
import inntektsgrunnlag from "../logic/useInntekt";
import { grunnbeloep, GrunnbeloepHistorikk } from "../utils/types"
import {ytelseTilGrunnlag, toKr} from "../utils/HjelpeFunksjoner";

export const getG = () => {
    const dataG: grunnbeloep = JSON.parse(
        '{"dato":"2022-05-01","grunnbeloep":111477,"grunnbeloepPerMaaned":9290,"gjennomsnittPerAar":109784,"omregningsfaktor":1.047726,"virkningstidspunktForMinsteinntekt":"2022-05-23"}'
    )
    const dataHistorikk = JSON.parse(
        '[{"dato":"2022-05-01","grunnbeløp":111477,"grunnbeløpPerMåned":9290,"gjennomsnittPerÅr":109784,"omregningsfaktor":1.047726,"virkningstidspunktForMinsteinntekt":"2022-05-23"},{"dato":"2021-05-01","grunnbeløp":106399,"grunnbeløpPerMåned":8867,"gjennomsnittPerÅr":104716,"omregningsfaktor":1.049807,"virkningstidspunktForMinsteinntekt":"2021-05-24"},{"dato":"2020-05-01","grunnbeløp":101351,"grunnbeløpPerMåned":8446,"gjennomsnittPerÅr":100853,"omregningsfaktor":1.014951,"virkningstidspunktForMinsteinntekt":"2020-09-21"},{"dato":"2019-05-01","grunnbeløp":99858,"grunnbeløpPerMåned":8322,"gjennomsnittPerÅr":98866,"omregningsfaktor":1.030707,"virkningstidspunktForMinsteinntekt":"2019-05-27"},{"dato":"2018-05-01","grunnbeløp":96883,"grunnbeløpPerMåned":8074,"gjennomsnittPerÅr":95800,"omregningsfaktor":1.034699,"virkningstidspunktForMinsteinntekt":"2018-06-04"}]'
    )
    const resG = dataG.grunnbeloep
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

describe("kalkulere inntektsgrunnlag", () => {
    const res = getG()
    const g = res.props.G
    const historikk = res.props.Historikk
    it("inntektsgrunnlag med 0 i inntekt", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            sykmeldtAar: aar,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(222954)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual(
            <p>
            Siden inntekten din er lavere enn minstebeløpet på 2G (2
            ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli
                oppjustert til <strong>{toKr(337809)} kr</strong>
            . Inntekten din er justert ut fra endring i grunnbeløpet.
            </p>
        )
        expect(resultat.logs[1]).toEqual(
            <p>
                Arbeidsavklaringspengene utgjør 66 % av beregningsgrunnlaget, og
                blir derfor <strong>{toKr(222954)} kr</strong>.
            </p>
        )
    })
    it("inntektsgrunnlag med en mill i inntekt", () => {
        const enMill = 1_000_000.0
        const resultat = new Result({
            ...initialState,
            harLoenn: true,
            inntekt1: enMill,
            inntekt2: enMill,
            inntekt3: enMill,
            sykmeldtAar: aar,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(441449)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual(
            <p>
                Siden inntekten din er høyere enn maksbeløpet på 6G (6
                ganger grunnbeløpet), vil beregningsgrunnlaget ditt bli
                nedjustert til <strong>{toKr(ytelseTilGrunnlag(resultat.resultat))} kr</strong>
                . Inntekten din er justert ut fra endring i grunnbeløpet.
            </p>
        )
    })
    it("inntektsgrunnlag med variert inntekt", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: true,
            inntekt1: 350000,
            inntekt2: 450000,
            inntekt3: 550000,
            sykmeldtAar: aar,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(327835)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual(
            <p>
                Grunnlaget er gjennomsnittet av de tre siste inntektsårene
                dine: <strong>{toKr(496719.0)} kr</strong> .
                Inntekten din er justert ut fra endring i grunnbeløpet.
            </p>
        )
    })
    it("inntektsgrunnlag med mest lønn siste år", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: true,
            inntekt1: 600000,
            inntekt2: 100000,
            inntekt3: 200000,
            sykmeldtAar: aar,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(421568)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual(
            <p>
                beregningsgrunnlaget er basert på det siste inntektsåret
                ditt: <strong>{toKr(638739.0)} kr</strong>.
                Inntekten din er justert ut fra endring i grunnbeløpet.
            </p>
        )
        expect(resultat.logs[1]).toEqual(
            <p>
                Arbeidsavklaringspengene utgjør 66 % av beregningsgrunnlaget, og
                blir derfor <strong>{toKr((421568))} kr</strong>.
            </p>
        )
    })
    it("inntektsgrunnlag med minstelønn under 25", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            inntekt1: 0,
            inntekt2: 0,
            inntekt3: 0,
            sykmeldtAar: aar,
            over25: false,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(148636)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual(
            <p>
                Siden inntekten din er lavere enn grensen for minste
                utbetaling for de under 25 år blir beregningsgrunnlaget ditt
                oppjustert til <strong>{toKr(225206)} kr</strong>
                . Inntekten din er justert ut fra endring i grunnbeløpet.
            </p>
        )
    })
    it("Inntektsgrunnlag med oppjustering fra 2018", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: true,
            inntekt1: 400000,
            inntekt2: 400000,
            inntekt3: 400000,
            sykmeldtAar: 2021,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(298896)
        expect(resultat.logs.length).toBe(2)
    })
})
