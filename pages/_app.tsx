import { initializeFaro } from '@grafana/faro-web-sdk';
import '@navikt/ds-css';
import { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';

import Container from '../components/container/Container';
import { Dekorator } from '../components/dekorator/Dekorator';
import { BrowserInterface } from '../components/state/BrowserInterface';
import { StateInterface } from '../components/state/State';
import '../styles/globals.css';
import { messages } from '../utils/message';

export const State = createContext({
  state: {} as StateInterface,
  setState: (value?: any) => {},
});

export const BrowserState = createContext({
  browserState: {} as BrowserInterface,
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

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_FARO_URL) {
      initializeFaro({
        url: process.env.NEXT_PUBLIC_FARO_URL,
        app: {
          name: 'aap-kalkulator',
          version: process.env.NEXT_PUBLIC_ENVIRONMENT ?? '',
        },
      });
    }
  }, []);

  return (
    <IntlProvider locale={locale} messages={messages[locale as DecoratorLocale]}>
      <Dekorator>
        <BrowserState.Provider value={{ browserState, setBrowserState }}>
          <State.Provider value={{ state, setState }}>
            <Head>
              {process.env.NEXT_PUBLIC_ENVIRONMENT != 'prod' ? <meta name="robots" content="noindex" /> : ''}
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
