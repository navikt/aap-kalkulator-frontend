import { barnetillegg, leggTilBarnetillegg } from "../logic/Barn"
import { Result } from "../../components/result/Result"

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
    harAAP: true,
}

describe("Barnetilegg", () => {
    it("med 0 barn", () => {
        const barn = barnetillegg(0)
        expect(barn).toBe(0)
    })
    it("med 1 barn", () => {
        const barn = barnetillegg(1)
        expect(barn).toBe(9100)
    })
    it("med mangen barn", () => {
        const barn = barnetillegg(8)
        expect(barn).toBe(72800)
    })
})

describe("Barnetillegg med wrapped funksjon", () => {
    it("Med 0 barn", () => {
        const barn = new Result({
            ...initialState,
            harLoenn: false,
            harBarn: false,
            antallBarn: 0,
        })
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(0)
    })
    it("Med 1 barn", () => {
        const barn = new Result({
            ...initialState,
            harLoenn: false,
            harBarn: true,
            antallBarn: 1,
        })
        barn.resultat = 100_000
        leggTilBarnetillegg(barn)
        expect(barn.resultat).toBe(109_100)
        expect(barn.logs[0]).toEqual({
            id: "logic.children.possibleChildsupport",
            values: {
                childAmount: "1",
                perChild: "9 100",
                res: "109 100",
                totChild: "9 100",
            },
        })
    })
    it("Med maks barn", () => {
        const barn = new Result({
            ...initialState,
            harLoenn: false,
            harBarn: true,
            antallBarn: 12,
        })
        barn.resultat = 222954.0 * (2.0 / 3.0)
        leggTilBarnetillegg(barn)
        expect(Math.ceil(barn.resultat)).toBe(202_686)
        expect(barn.logs[0]).toEqual({
            id: "logic.children.maxChildren",
            values: {
                maksBarneTillegg: "54 050",
                perChild: "9 100",
                res: "202 685",
            },
        })
    })
})
