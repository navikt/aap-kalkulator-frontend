import { barnetillegg, leggTilBarnetillegg } from "../logic/Barn";
import { Result } from "../../components/result/Result";
import { render, screen } from "@testing-library/react";

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
        const barn = new Result({...(initialState), antallBarn: 0})
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(0)
    })
    it("Med 1 barn", () => {
        const barn = new Result({...(initialState), antallBarn: 1})
        barn.resultat = 100_000
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(107_020)
    })
    it("Med maks barn", () => {
        const barn = new Result({...(initialState), antallBarn: 12})
        barn.resultat = 222954.0 * (2.0 / 3.0)
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(200_659)

    })
})