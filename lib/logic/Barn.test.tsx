import {getBarnetilleggSats} from "./Barn";

describe('Barn', () => {
  test('sats før 1.1.2025 er 36', () => {
    const gammelSats = getBarnetilleggSats(new Date(2024, 1, 1));
    expect(gammelSats).toBe(36);
  })
  test('sats den 31.12.2024 er 36', () => {
    const gammelSats = getBarnetilleggSats(new Date(2024, 11, 31));
    expect(gammelSats).toBe(36);
  })
  test('sats den 1.1.2025 er 37', () => {
    const gammelSats = getBarnetilleggSats(new Date(2025, 0, 1));
    expect(gammelSats).toBe(37);
  })
  test('sats etter 1.1.2025 er 37', () => {
    const gammelSats = getBarnetilleggSats(new Date(2025, 5, 5));
    expect(gammelSats).toBe(37);
  })
})