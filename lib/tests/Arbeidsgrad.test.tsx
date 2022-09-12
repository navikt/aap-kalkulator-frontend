import { arbeidsgrad } from "../logic/Arbeidsgrad";
import { Result } from "../../components/result/Result"
import { toKr } from "../utils/HjelpeFunksjoner"

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

describe("arbeidsgrad", () => {
    it("arbeidsgrad 40% med 100000 i grunnlag", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 40,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(60_000)
        expect(resultat.logs.length).toBe(1)
        expect(resultat.logs[0]).toEqual({id:"logic.work.justEnough", values:{hoursWorked:"15", oldRes:"100 000",percentWorked:"40",percentWorked2:"40",res:"60 000"}})
    })
    it("arbeidsgrad 70% med 100000 i grunnlag", () => {
        const resultat = new Result({
            ...initialState,
            harLoenn: false,
            harArbeid: true,
            arbeidsgrad: 70,
        })
        resultat.resultat = 100_000
        arbeidsgrad(resultat)
        expect(resultat.resultat).toBe(0)
        expect(resultat.logs.length).toBe(1)
        expect(resultat.logs[0]).toEqual({
            id: "logic.work.tooMuch",
            values: {},
        }
    )
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
})
