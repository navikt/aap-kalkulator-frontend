import '@navikt/ds-css';
import '../../styles/globals.css';

import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import Banner from '../../components/banner/Banner';
import { StateProvider } from '../../components/state/StateContext';

const RootLayout = async ({ params, children }: { params: { locale: string }; children: React.ReactNode }) => {
  console.log('RootLayout', params);
  const Decorator = await fetchDecoratorReact({
    env: 'devNext',
    params: {
      simple: false,
      chatbot: false,
      feedback: false,
      urlLookupTable: false,
      language: (params.locale as 'nb' | 'nn') ?? 'nb',
      availableLanguages: [
        {
          locale: 'nb',
          url: 'https://www.nav.no/aap/kalkulator/nb',
        },
        {
          locale: 'nn',
          url: 'https://www.nav.no/aap/kalkulator/nn',
        },
      ],
      breadcrumbs: [
        {
          title: 'Arbeidsavklaringspenger',
          url: 'https://www.nav.no/aap',
        },
        {
          title: 'AAP-kalkulator',
          url: 'https://www.nav.no/aap/kalkulator',
        },
      ],
    },
  });

  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <head>
        <Decorator.Styles />
        {process.env.NEXT_PUBLIC_ENVIRONMENT != 'prod' ? <meta name="robots" content="noindex" /> : ''}
        <title>AAP-kalkulator - www.nav.no</title>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Decorator.Header />
          <StateProvider>
            <div className="min-h-container bg-bg-subtle">
              <Banner />
              <div className="px-4 md:px-12">
                <main className="max-w-[900px] mx-auto pb-8">
                  <div className="max-w-[600px]">
                    <Breadcrumbs />
                    <div className="bg-surface-default p-6 md:p-10 " id="maincontent" tabIndex={-1}>
                      {children}
                    </div>
                  </div>
                </main>
              </div>
            </div>
          </StateProvider>
          <Decorator.Footer />
        </NextIntlClientProvider>
        <Decorator.Scripts />
      </body>
    </html>
  );
};

export default RootLayout;
