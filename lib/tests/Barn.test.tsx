import { barnetillegg, leggTilBarnetillegg } from "../logic/Barn"
import { Result } from "../../components/result/Result"
import { render, screen } from "@testing-library/react"
import resultat from "../../pages/resultat";
import {toKr} from "../logic/Inntekt";
import {ytelseTilGrunnlag} from "../utils/ytelse";

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

describe("Barnetilegg", () => {
    it("med 0 barn", () => {
        const barn = barnetillegg(0)
        expect(barn).toBe(0)
    })
    it("med 1 barn", () => {
        const barn = barnetillegg(1)
        expect(barn).toBe(7020)
    })
    it("med mangen barn", () => {
        const barn = barnetillegg(8)
        expect(barn).toBe(56160)
    })
})

describe("Barnetillegg med wrapped funksjon", () => {
    it("Med 0 barn", () => {
        const barn = new Result({
            ...initialState,
            harBarn: false,
            antallBarn: 0,
        })
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(0)
    })
    it("Med 1 barn", () => {
        const barn = new Result({
            ...initialState,
            harBarn: true,
            antallBarn: 1,
        })
        barn.resultat = 100_000
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(107_020)
        expect(barn.logs[0]).toEqual(<p>
            For hvert barn får du {toKr(barnetillegg(1))} kr per år.
            Siden du har {barn.personInfo!!.antallBarn} barn, kan du
            få {toKr(barnetillegg(barn.personInfo!!.antallBarn!!))} kr i tillegg. Dette blir til
            sammen <strong>{toKr(107_020)} kr</strong>.
        </p>)
    })
    it("Med maks barn", () => {
        const barn = new Result({
            ...initialState,
            harBarn: true,
            antallBarn: 12,
        })
        barn.resultat = 222954.0 * (2.0 / 3.0)
        leggTilBarnetillegg(barn)
        expect(Math.ceil(barn.resultat)).toBe(202_686)
        expect(barn.logs[0]).toEqual(<p>
            For hvert barn kan du få {toKr(barnetillegg(1))} kr per år.
            Arbeidsavklaringspenger pluss barnetillegg kan ikke være mer
            enn 90 % av beregningsgrunnlaget. Derfor får du {toKr(54_050
        )} kr i tillegg. Dette
            blir til sammen <strong>{toKr(202_685)} kr</strong>.
        </p>)
    })
})
