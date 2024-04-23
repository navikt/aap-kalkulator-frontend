// noinspection JSNonASCIINames
import { StateInterface } from '../../components/state/State';
import { kalkuler } from '../logic/Kalkuler';
import { GrunnbeloepHistorikk, grunnbeloep } from '../utils/types';

export const getG = () => {
  const dataG: grunnbeloep = { grunnbeloep: 111477 };

  const dataHistorikk = [
    {
      dato: '2024-05-01',
      grunnbeloep: 118620,
      gjennomsnittPerAar: 116239,
    },
    {
      dato: '2023-05-01',
      grunnbeloep: 118620,
      gjennomsnittPerAar: 116239,
    },
    {
      dato: '2022-05-01',
      grunnbeloep: 111477,
      gjennomsnittPerAar: 109784,
    },
    {
      dato: '2021-05-01',
      grunnbeloep: 106399,
      gjennomsnittPerAar: 104716,
    },
    {
      dato: '2020-05-01',
      grunnbeloep: 101351,
      gjennomsnittPerAar: 100853,
    },
    {
      dato: '2019-05-01',
      grunnbeloep: 99858,
      gjennomsnittPerAar: 98866,
    },
    {
      dato: '2018-05-01',
      grunnbeloep: 96883,
      gjennomsnittPerAar: 95800,
    },
  ];

  // @ts-ignore
  const resHis: GrunnbeloepHistorikk[] = dataHistorikk.map((item) => {
    // noinspection NonAsciiCharacters
    return {
      grunnbeloep: item.grunnbeloep,
      dato: new Date(item.dato).getFullYear(),
      gjennomsnittPerAar: item.gjennomsnittPerAar ? item.gjennomsnittPerAar : null,
    };
  });
  return { props: { G: dataG, Historikk: resHis } };
};

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
  harAAP: undefined,
};

describe('integrasjon', () => {
  const res = getG();
  const g = res.props.G;
  const historikk = res.props.Historikk;
  const enMill = 1_000_000;
  it('ytelse med grunnbeløp 6g, 0 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: enMill,
      inntekt2: enMill,
      inntekt3: enMill,
      harBarn: false,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(441449);
    expect(resultat.logs).toHaveLength(4);
  });
  it('ytelse med grunnbeløp 2g, 7 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: false,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 7,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(288474);
    expect(resultat.logs).toHaveLength(6);
    expect(resultat.logs[0]).toEqual({
      id: 'logic.salery.minsteGrunnlag',
      values: { res: '337 809' },
    });
    expect(resultat.logs[1]).toEqual({
      id: 'logic.salery.reductionMin',
      values: { res: '222 954' },
    });
    expect(resultat.logs[2]).toEqual({
      id: 'logic.children.possibleChildsupport',
      values: {
        childAmount: '7',
        perChild: '9 360',
        res: '288 474',
        totChild: '65 520',
      },
    });
  });
  it('ytelse med grunnbeløp 2g, 8 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 8,
      harBarn: true,
      harArbeid: false,
      harLoenn: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(297_834);
    expect(resultat.logs).toHaveLength(6);
  });
  it('ytelse med grunnbeløp 6g, 22 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: enMill,
      inntekt2: enMill,
      inntekt3: enMill,
      antallBarn: 22,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(601_976);
    expect(resultat.logs).toHaveLength(6);
  });
  it('ytelse med grunnbeløp 6g, 23 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      harLoenn: true,
      ...initialState,
      inntekt1: enMill,
      inntekt2: enMill,
      inntekt3: enMill,
      antallBarn: 23,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(601976);
    expect(resultat.logs).toHaveLength(6);
  });
  it('ytelse med grunnbeløp 6g, sykemeldt 2021', () => {
    const state: StateInterface = {
      harLoenn: true,
      ...initialState,
      inntekt1: 250000,
      inntekt2: 300000,
      inntekt3: 350000,
      antallBarn: 0,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2021,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(224813);
    expect(resultat.logs).toHaveLength(4);
  });
  it('ytelse med grunnbeløp 6g, 24 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: enMill,
      inntekt2: enMill,
      inntekt3: enMill,
      antallBarn: 24,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(601976);
    expect(resultat.logs).toHaveLength(6);
  });
  it('ytelse med grunnbeløp 2g, 0 barn og 40% arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: false,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 0,
      harBarn: false,
      harArbeid: true,
      arbeidsgrad: 40,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(133772);
    expect(resultat.logs).toHaveLength(4);
  });
  it('ytelse med grunnbeløp 2g, 15 barn og 50% arbeidsgrad', () => {
    const state: StateInterface = {
      harLoenn: false,
      ...initialState,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 15,
      arbeidstimer: 18.75,
      harBarn: true,
      harArbeid: true,
      arbeidsgrad: 50,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(152014);
    expect(resultat.logs).toHaveLength(6);
    expect(resultat.logs[0]).toEqual({
      id: 'logic.salery.minsteGrunnlag',
      values: { res: '337 809' },
    });
    expect(resultat.logs[1]).toEqual({
      id: 'logic.salery.reductionMin',
      values: { res: '222 954' },
    });
    expect(resultat.logs[2]).toEqual({
      id: 'logic.children.maxChildren',
      values: {
        maksBarneTillegg: '81 075',
        perChild: '9 360',
        res: '304 028',
      },
    });
    expect(resultat.logs[4]).toEqual({
      id: 'logic.work.justEnough',
      values: {
        hoursWorked: '18.75',
        oldRes: '304 028',
        percentWorked: '50',
        percentWorked2: '50',
        res: '152 014',
      },
    });
  });
  it('ytelse med grunnbeløp 6g, 0 barn og 20% arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harAAP: false,
      harLoenn: true,
      inntekt1: enMill,
      inntekt2: enMill,
      inntekt3: enMill,
      antallBarn: 0,
      harBarn: false,
      harArbeid: true,
      arbeidsgrad: 20,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(353159);
    expect(resultat.logs).toHaveLength(4);
  });
  it('ytelse med grunnbeløp 6g, 5 barn og 61% arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harAAP: true,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 5,
      harBarn: true,
      harArbeid: true,
      arbeidsgrad: 61,
      harLoenn: false,
      sykmeldtAar: 2023,
      arbeidstimer: 22.875,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(0);
    expect(resultat.logs).toHaveLength(1);
  });
  it('ytelse med grunnbeløp 6g, 5 barn og 51% arbeidsgrad, uten AAP', () => {
    const state: StateInterface = {
      ...initialState,
      harAAP: false,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 5,
      harBarn: true,
      harArbeid: true,
      arbeidsgrad: 51,
      arbeidstimer: 19.125,
      harLoenn: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(0);
    expect(resultat.logs).toHaveLength(1);
  });
  it('over 6g siste år, 2 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: 700_000,
      inntekt2: 26_880,
      inntekt3: 219_799,
      antallBarn: 2,
      harBarn: true,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    //expect(resultat.resultat).toBe(455520)
    expect(resultat.resultat).toBe(460_169);
  });
  it('400k avg, 2 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: 400_000,
      inntekt2: 400_000,
      inntekt3: 400_000,
      antallBarn: 0,
      harBarn: false,
      harArbeid: false,
      sykmeldtAar: 2022,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(290_177);
  });
  it('400k siste år, 0 barn og 0 arbeidsgrad', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: true,
      inntekt1: 400_000,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 0,
      harBarn: false,
      harArbeid: false,
      sykmeldtAar: 2022,
      over25: true,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(281_045);
  });
  it('0 alle år, 0 barn og 0 arbeidsgrad uten AAP', () => {
    const state: StateInterface = {
      ...initialState,
      harLoenn: false,
      harAAP: false,
      inntekt1: 0,
      inntekt2: 0,
      inntekt3: 0,
      antallBarn: 0,
      harBarn: false,
      harArbeid: false,
      sykmeldtAar: 2023,
      over25: false,
    };
    const resultat = kalkuler(state, g, historikk);
    expect(resultat.resultat).toBe(148_636);
  });
});
