import {getBarnetilleggSatsPerBarnPerDag} from "./Barn";

describe('Barn', () => {
  test('sats for barnetillegg før 1.1.2026 er 37', () => {
    const gammelSats = getBarnetilleggSatsPerBarnPerDag(new Date(2025, 1, 1));
    expect(gammelSats).toBe(37);
  })

  test('sats for barnetillegg den 31.12.2025 er 37', () => {
    const gammelSats = getBarnetilleggSatsPerBarnPerDag(new Date(2025, 11, 31));
    expect(gammelSats).toBe(37);
  })

  test('sats for barnetillegg den 1.1.2026 er 38', () => {
    const gammelSats = getBarnetilleggSatsPerBarnPerDag(new Date(2026, 0, 1));
    expect(gammelSats).toBe(38);
  })

  test('sats for barnetillegg etter 1.1.2026 er 38', () => {
    const gammelSats = getBarnetilleggSatsPerBarnPerDag(new Date(2026, 5, 5));
    expect(gammelSats).toBe(38);
  })
})