import '@navikt/ds-css';
import { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';

import Container from '../components/container/Container';
import { Dekorator } from '../components/dekorator/Dekorator';
import { BrowserInterface } from '../components/state/BrowserInterface';
import { StateInterface } from '../components/state/State';
import '../styles/globals.css';
import { messages } from '../utils/message';

export const State = createContext({
  state: {} as StateInterface,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (value?: any) => {},
});

export const BrowserState = createContext({
  browserState: {} as BrowserInterface,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setBrowserState: (value: any) => {},
});
export const initialState = {
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

const getLocaleOrFallback = (locale?: string) => {
  if (locale && ['nb', 'nn'].includes(locale)) {
    return locale;
  }

  return 'nb';
};

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = useState<StateInterface>(initialState);
  const router = useRouter();
  const locale = getLocaleOrFallback(router.locale);

  const [browserState, setBrowserState] = useState<BrowserInterface>({
    redirect: false,
  });

  return (
    <IntlProvider locale={locale} messages={messages[locale as DecoratorLocale]}>
      <Dekorator>
        <BrowserState.Provider value={{ browserState, setBrowserState }}>
          <State.Provider value={{ state, setState }}>
            <Head>
              <meta name="robots" content="noindex" />
              <title>AAP-kalkulator - www.nav.no</title>
            </Head>
            <Container>
              <Component {...pageProps} />
            </Container>
          </State.Provider>
        </BrowserState.Provider>
      </Dekorator>
    </IntlProvider>
  );
}

export default MyApp;
