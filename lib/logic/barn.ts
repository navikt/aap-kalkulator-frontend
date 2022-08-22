import { Result } from "../../components/result/Result";
import {ytelsesdager, ytelseTilGrunnlag} from "./ytelse";
import { toKr} from "./Inntekt";

const satsPerBarnPerDag: number = 27

const barnetillegg = (antallBarn: number) => (antallBarn * satsPerBarnPerDag * ytelsesdager)


export const leggTilBarnetillegg = (resultat: Result) => {
    if (resultat.personInfo!!.antallBarn == 0) {
        return
    }

    const maksBarnetillegg = ytelseTilGrunnlag(resultat.resultat) * 0.9
    const faktiskBarnetillegg = barnetillegg(resultat.personInfo!!.antallBarn!!)
    const muligBarnetillegg = faktiskBarnetillegg + resultat.resultat
    const maksBarnetilleggUtenGrunnlag = Math.ceil(maksBarnetillegg - resultat.resultat)

    resultat.resultat = Math.min(muligBarnetillegg, maksBarnetillegg)

    switch (resultat.resultat) {
        case muligBarnetillegg : {resultat.logs.push(
            `For hvert barn får du ${toKr(barnetillegg(1))} kr per år. Siden du har ${resultat.personInfo!!.antallBarn} barn, vil du få ${toKr(faktiskBarnetillegg)} kr i tillegg. Dette blir til sammen ${toKr(resultat.resultat)}.`
            )
            break}
        default:  {
            resultat.logs.push(
                `For hvert barn får du ${toKr(barnetillegg(1))} kr per år. Arbeidsavklaringspenger pluss barnetillegg kan ikke være mer enn 90 % av beregningsgrunnlaget. Derfor får du kun ${toKr(maksBarnetilleggUtenGrunnlag)} kr i tillegg. Dette blir til sammen ${toKr(resultat.resultat)}.`
            )
        }
    }
}