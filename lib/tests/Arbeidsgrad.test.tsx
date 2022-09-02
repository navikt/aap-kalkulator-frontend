import { arbeidsgrad } from "../logic/Arbeidsgrad"
import { Result } from "../../components/result/Result"
import { toKr } from "../logic/Inntekt";

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
        expect(resultat.logs[0]).toEqual(<p>En arbeidsuke er 37,5 timer. Siden du jobber {15} timer i uka, som er {(40).toFixed(0)} % av en vanlig arbeidsuke, blir arbeidsavklaringspengene redusert med {(40).toFixed(0)} %, fra {toKr(100000)} kr til <strong>{toKr(60000)} kr</strong>.</p>)
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
        expect(resultat.logs[0]).toEqual(<p>Arbeidsgraden din er høyere enn 60 % og du kan derfor ikke få arbeidsavklaringspenger.</p>)
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
