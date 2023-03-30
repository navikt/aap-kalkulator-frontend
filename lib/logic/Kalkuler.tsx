import { Result } from '../../components/result/Result';
import { StateInterface } from '../../components/state/State';
import { toKr } from '../utils/HjelpeFunksjoner';
import { GrunnbeloepHistorikk, grunnbeloep } from '../utils/types';
import { arbeidsgrad } from './Arbeidsgrad';
import { leggTilBarnetillegg } from './Barn';
import inntektsgrunnlag from './Inntekt';

export const kalkuler = (state: StateInterface, grunnbeloep: grunnbeloep, historikk: GrunnbeloepHistorikk[]) => {
  const g = grunnbeloep.grunnbeloep;
  let resultat = wrapWithRespons(state);
  inntektsgrunnlag(g, historikk, resultat);
  leggTilBarnetillegg(resultat);
  arbeidsgrad(resultat);
  resultat.resultat = Math.round(resultat.resultat);
  return resultat;
};

const wrapWithRespons = (person: StateInterface) => {
  return new Result(person);
};
