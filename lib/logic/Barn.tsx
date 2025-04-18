import { Result } from '../../components/result/Result';
import { YTELSESDAGER, toKr, ytelseTilGrunnlag } from '../utils/HjelpeFunksjoner';
import {isBefore} from "date-fns";

const SATS_PER_BARN_PER_DAG: number = 36;

export function getBarnetilleggSats(todayDate: Date): number {
  // TODO: ny sats 37 NOK fra 1.1.2025, kan fjernes etter den datoen
  return isBefore(todayDate, new Date(2025, 0, 1))
    ? 36
    : 37;
}
export const barnetillegg = (antallBarn: number) => antallBarn * getBarnetilleggSats(new Date()) * YTELSESDAGER;

export const leggTilBarnetillegg = (resultat: Result) => {
  if (!resultat.personInfo!!.harBarn || resultat.personInfo!!.antallBarn == 0) {
    return;
  }

  const maksBarnetillegg = ytelseTilGrunnlag(resultat.resultat) * 0.9;
  const faktiskBarnetillegg = barnetillegg(resultat.personInfo!!.antallBarn!!);
  const muligBarnetillegg = faktiskBarnetillegg + resultat.resultat;
  const maksBarnetilleggUtenGrunnlag = Math.ceil(maksBarnetillegg - resultat.resultat);
  resultat.resultat = Math.min(muligBarnetillegg, maksBarnetillegg);

  switch (resultat.resultat) {
    case muligBarnetillegg: {
      resultat.logs.push(
        {
          id: 'logic.children.possibleChildsupport',
          values: {
            perChild: toKr(barnetillegg(1)),
            childAmount: resultat.personInfo!!.antallBarn!!.toString(),
            totChild: toKr(faktiskBarnetillegg),
            res: toKr(resultat.resultat),
          },
        },
        {
          id: 'logic.total.totalAmount',
          values: { res: toKr(resultat.resultat) },
        }
      );
      break;
    }
    default: {
      resultat.logs.push(
        {
          id: 'logic.children.maxChildren',
          values: {
            perChild: toKr(barnetillegg(1)),
            maksBarneTillegg: toKr(maksBarnetilleggUtenGrunnlag),
            res: toKr(resultat.resultat),
          },
        },
        {
          id: 'logic.total.totalAmount',
          values: { res: toKr(resultat.resultat) },
        }
      );
    }
  }
  resultat.resultat = Math.min(muligBarnetillegg, maksBarnetillegg);
};
