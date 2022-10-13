// noinspection JSNonASCIINames

import { Result } from "../../components/result/Result"
import inntektsgrunnlag from "../logic/Inntekt";
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
        expect(resultat.logs[0]).toEqual({id:"logic.salery.minsteGrunnlag",values:{res: "337 809",}})
        expect(resultat.logs[1]).toEqual({id:"logic.salery.reduction",values:{res: "222 954",}})
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
        expect(resultat.logs[0]).toEqual({id:"logic.salery.maksGrunnlag",values:{res:"668 862"}})
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
        expect(resultat.logs[0]).toEqual({id:"logic.salery.gjennomsnittInntekt", values:{res:"496 719"}})
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
        expect(resultat.logs[0]).toEqual({id:"logic.salery.lastYear", values:{res:"638 739"}})
        expect(resultat.logs[1]).toEqual({id:"logic.salery.reduction", values:{res:"421 568"}})
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
        expect(resultat.logs[0]).toEqual({id:"logic.salery.minsteGrunnlagUnder25", values:{res:"225 206"}})
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
    it("fra brukertest", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: true,
            inntekt1: 200000,
            inntekt2: 200000,
            inntekt3: 300000,
            sykmeldtAar: 2021,
            over25: true,
        })
        resultat.resultat = 0
        inntektsgrunnlag(g, historikk, resultat)
        expect(Math.round(resultat.resultat)).toBe(222954)
    })
})
