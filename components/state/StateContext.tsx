'use client';

import React, { createContext, useContext } from 'react';
import { StateInterface } from './State';

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
  harLoenn: undefined,
  harAAP: undefined,
};

const StateContext = createContext<[StateInterface, React.Dispatch<React.SetStateAction<StateInterface>>] | undefined>(
  undefined
);

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = React.useState<StateInterface>(initialState);

  return <StateContext.Provider value={[state, setState]}>{children}</StateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }

  return context;
};
