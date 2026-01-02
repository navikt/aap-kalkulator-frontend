import { Result } from '../../components/result/Result';
import { barnetillegg, getBarnetilleggSatsPerBarnPerDag, leggTilBarnetillegg } from '../logic/Barn';
import { toKr, YTELSESDAGER } from '../utils/HjelpeFunksjoner';

const FORVENTET_BARNETILLEGG_PR_BARN = 9880; // barnetilleggsats * ytelsesdager

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
};

describe('Barnetilegg', () => {
  it('med 0 barn', () => {
    const barn = barnetillegg(0);
    expect(barn).toBe(0);
  });
  it('med 1 barn', () => {
    const barn = barnetillegg(1);
    expect(barn).toBe(FORVENTET_BARNETILLEGG_PR_BARN);
  });
  it('med mangen barn', () => {
    const barn = barnetillegg(8);
    expect(barn).toBe(FORVENTET_BARNETILLEGG_PR_BARN * 8);
  });
});

describe('Barnetillegg med wrapped funksjon', () => {
  const grunnlag_uten_barnetillegg = 100_000;
  it('Med 0 barn', () => {
    const barn = new Result({
      ...initialState,
      harLoenn: false,
      harBarn: false,
      antallBarn: 0,
    });
    leggTilBarnetillegg(barn);
    expect(barn.resultat).toBe(0);
  });
  it('Med 1 barn', () => {
    const barn = new Result({
      ...initialState,
      harLoenn: false,
      harBarn: true,
      antallBarn: 1,
    });
    barn.resultat = grunnlag_uten_barnetillegg;
    leggTilBarnetillegg(barn);
    expect(barn.resultat).toBe(grunnlag_uten_barnetillegg + FORVENTET_BARNETILLEGG_PR_BARN);
    expect(barn.logs[0]).toEqual({
      id: 'logic.children.possibleChildsupport',
      values: {
        childAmount: '1',
        perChild: toKr(FORVENTET_BARNETILLEGG_PR_BARN),
        res: toKr(grunnlag_uten_barnetillegg + FORVENTET_BARNETILLEGG_PR_BARN),
        totChild: toKr(FORVENTET_BARNETILLEGG_PR_BARN),
      },
    });
  });
  it('Med maks barn', () => {
    const barn = new Result({
      ...initialState,
      harLoenn: false,
      harBarn: true,
      antallBarn: 12,
    });
    barn.resultat = 222954.0 * (2.0 / 3.0);
    leggTilBarnetillegg(barn);
    expect(Math.ceil(barn.resultat)).toBe(202_686);
    expect(barn.logs[0]).toEqual({
      id: 'logic.children.maxChildren',
      values: {
        maksBarneTillegg: '54 050',
        perChild: toKr(FORVENTET_BARNETILLEGG_PR_BARN),
        res: '202 685',
      },
    });
  });
});
