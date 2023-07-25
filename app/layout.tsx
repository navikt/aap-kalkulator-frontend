'use client';

import { DecoratorComponents, DecoratorEnvProps, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import 'node-fetch';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { StateInterface } from '../components/state/State';
import { useRouter } from 'next/router';
import { BrowserInterface } from '../components/state/BrowserInterface';
import { initializeFaro } from '@grafana/faro-web-sdk';
import { messages } from '../utils/message';
import { IntlProvider } from 'react-intl';
import { BrowserState, State } from '../pages/_app';
import { router } from 'next/client';

const decoratorEnv = (process.env.NEXT_PUBLIC_DEKORATOR_ENV ?? 'prod') as Exclude<
  DecoratorEnvProps['env'],
  'localhost'
>;

const metadata = {
  title: 'AAP-kalkulator - www.nav.no',
  description: 'kalkulator for AAP',
};

interface Props {
  Decorator: DecoratorComponents;
  language: string;
}

const getLocaleOrFallback = (locale?: string) => {
  if (locale && ['nb', 'nn'].includes(locale)) {
    return locale;
  }

  return 'nb';
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
  harLoenn: undefined,
  harAAP: undefined,
};

export async function generateStaticParams() {
  const Decorator = await fetchDecoratorReact({
    env: decoratorEnv,
    params: {
      simple: false,
      chatbot: false,
      feedback: false,
      urlLookupTable: false,
    },
  });

  const language = getLocaleOrFallback(router.locale);

  return {
    Decorator,
    language: language,
  };
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: any }) {
  const [state, setState] = useState<StateInterface>(initialState);
  const router = useRouter();
  const locale = getLocaleOrFallback(router.locale) ?? 'nb';
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

  const { Decorator, language } = params;
  const showDecorator = true;
  return (
    <html lang={language || 'no'}>
      <Head>
        {showDecorator && <Decorator.Styles />}
        {process.env.NEXT_PUBLIC_ENVIRONMENT != 'prod' ? <meta name="robots" content="noindex" /> : ''}
      </Head>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <BrowserState.Provider value={{ browserState, setBrowserState }}>
          <State.Provider value={{ state, setState }}>
            <body>
              {showDecorator && <Decorator.Header />}
              {children}
              {showDecorator && (
                <>
                  <Decorator.Footer />
                  <Decorator.Scripts />
                </>
              )}
            </body>
          </State.Provider>
        </BrowserState.Provider>
      </IntlProvider>
    </html>
  );
}
