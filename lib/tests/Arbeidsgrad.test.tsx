import {
    arbeidsgrad,
    invertedPercent,
    jobberIkke,
    overArbeidsGrense,
} from "../logic/Arbeidsgrad"
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

describe("arbeidsgrad", () => {
    it("arbeidsgrad 40% med 100000 i grunnlag, har AAP", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 40,
            arbeidstimer: 15,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(60_000)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual({
            id: "logic.work.justEnough",
            values: {
                hoursWorked: "15",
                oldRes: "100 000",
                percentWorked: "40",
                percentWorked2: "40",
                res: "60 000",
            },
        })
    })
    it("arbeidsgrad 70% med 100000 i grunnlag, har AAP", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 80,
            arbeidstimer: 30,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(0)
        expect(resultat.logs.length).toBe(1)
        expect(resultat.logs[0]).toEqual({
            id: "logic.work.tooMuchWithAAP",
            values: {
                prosent: "80",
                timer: "30",
            },
        })
    })
    it("arbeidsgrad 49% med 100000 i grunnlag, uten AAP", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 49,
            arbeidstimer: 18.375,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(51_000)
        expect(resultat.logs.length).toBe(2)
        expect(resultat.logs[0]).toEqual({
            id: "logic.work.justEnough",
            values: {
                hoursWorked: "18.375",
                oldRes: "100 000",
                percentWorked: "49",
                percentWorked2: "49",
                res: "51 000",
            },
        })
    })
    it("arbeidsgrad 51% med 100000 i grunnlag, uten AAP", () => {
        const resultat = new Result({
            ...initialState,
            harAAP: false,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 51,
            arbeidstimer: 19.125,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(0)
        expect(resultat.logs.length).toBe(1)
        expect(resultat.logs[0]).toEqual({
            id: "logic.work.tooMuchWithoutAAP",
            values: {
                prosent: "51",
                timer: "19.125",
            },
        })
    })
    test("arbeidsgrad er -10%", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: -10,
        })
        resultat.resultat = 100_000
        expect(() => {
            arbeidsgrad(resultat)
        }).toThrow(new Error("Arbeidsgrad kan ikke være mindre enn 0"))
    })

    //Hjelpe funksjoner
    test("jobber 0 timer", () => {
        expect(jobberIkke(0, true)).toBe(true)
    })
    test("jobber ikke", () => {
        expect(jobberIkke(0, false)).toBe(true)
    })
    test("jobber 1 time", () => {
        expect(jobberIkke(1, true)).toBe(false)
    })
    test("jobber mer en 50% uten AAP", () => {
        expect(overArbeidsGrense(51, false)).toBe(true)
    })
    test("jobber mer en 60% med AAP", () => {
        expect(overArbeidsGrense(61, true)).toBe(true)
    })
    test("jobber mindre en 50% uten AAP", () => {
        expect(overArbeidsGrense(49, false)).toBe(false)
    })
    test("jobber mindre en 60% med AAP", () => {
        expect(overArbeidsGrense(59, true)).toBe(false)
    })
    test("invertedProsent 23%", () => {
        expect(invertedPercent(23)).toBe(0.77)
    })
    test("invertedProsent 0%", () => {
        expect(invertedPercent(0)).toBe(1)
    })
    test("invertedProsent 100%", () => {
        expect(invertedPercent(100)).toBe(0)
    })
})
