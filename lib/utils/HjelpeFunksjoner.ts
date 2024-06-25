export const YTELSESDAGER = 260;

const MINSTE_ÅRLIG_YTELSE = 2.041;
const BROEK = 0.66;

export const ytelseTilGrunnlag = (ytelse: number) => {
  return ytelse / BROEK;
};
export const minsteGrunnlagFraG = (g: number) => {
  return (MINSTE_ÅRLIG_YTELSE * g) / BROEK;
};

export const minsteGrunnlagUnder25FraG = (g: number) => {
  return (MINSTE_ÅRLIG_YTELSE * g * (2.0 / 3.0)) / BROEK;
};

export const maksGrunnlagFraG = (g: number) => {
  return 6 * g;
};

export const prosentReduksjon = (res: number) => {
  return res * BROEK;
};

export const toKr = (resultat: number) => {
  return new Intl.NumberFormat('no-NO', { style: 'decimal' }).format(Math.round(resultat));
};
