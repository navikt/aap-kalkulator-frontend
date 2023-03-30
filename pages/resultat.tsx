// noinspection JSNonASCIINames
import { Alert, BodyShort, Button, Heading, Label, Link } from '@navikt/ds-react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';

import BackLink from '../components/backlink/BackLink';
import { Circle } from '../components/circle/Circle';
import { CoinIcon } from '../components/icons/CoinIcon';
import { Result, ResultInterface } from '../components/result/Result';
import Stepper from '../components/stepper/Stepper';
import { useFeatureToggleIntl } from '../hooks/useFeatureToggleIntl';
import { kalkuler } from '../lib/logic/Kalkuler';
import { logAmplitudeEvent } from '../lib/utils/amplitude';
import { GrunnbeloepHistorikk, grunnbeloep } from '../lib/utils/types';
import { State } from './_app';

export const getStaticProps = async () => {
  const res = await fetch('https://g.nav.no/api/v1/grunnbeloep');
  const resHistorikk = await fetch('https://g.nav.no/api/v1/historikk');
  const data = await res.json();
  // @ts-ignore
  const dataHistorikk: GrunnbeloepHistorikk[] = await resHistorikk.json().then((res) =>
    res.map((item: { grunnbeløp: any; dato: string | number | Date; gjennomsnittPerÅr: any }) => {
      // noinspection NonAsciiCharacters
      return {
        grunnbeloep: item.grunnbeløp,
        dato: new Date(item.dato).getFullYear(),
        gjennomsnittPerAar: item.gjennomsnittPerÅr ? item.gjennomsnittPerÅr : null,
      };
    })
  );
  return { props: { G: data, Historikk: dataHistorikk }, revalidate: 7200 };
};

// @ts-ignore
const Resultat: NextPage = ({ G, Historikk }: { G: grunnbeloep; Historikk: GrunnbeloepHistorikk[] }) => {
  const { formatMessage } = useFeatureToggleIntl();
  const [result, setResult] = useState<ResultInterface | null>(null);
  const { state } = useContext(State);
  const router = useRouter();

  useEffect(() => {
    if (state.sykmeldtAar === undefined) {
      state.lengsteSteg = 1;
      router.push('/');
      return;
    }

    logAmplitudeEvent('skjema fullført', {
      skjemanavn: 'aap-kalkulator',
      skjemaId: 'aap-kalkulator',
    });
    const res: Result = kalkuler(state, G, Historikk);
    setResult({
      resultat: res.resultat,
      personInfo: res.personInfo!!,
      logs: res.logs,
    });
  }, []);

  const resultat = useMemo(() => {
    if (result == null) return 0;
    return result?.resultat;
  }, [result]);

  const dagsats = Math.ceil(result == null ? 0 : resultat / 260);
  return (
    <>
      <Stepper />
      <BackLink target="/steg/4" tekst="Endre svar" />
      <div className="grid gap-8">
        <div className="flex flex-col items-center pt-4 mb-4" aria-hidden="true">
          <Circle>
            <CoinIcon />
          </Circle>
        </div>
        <div className="text-left -mb-5">
          <Heading level="2" size="large">
            {formatMessage('result.title')}
          </Heading>
        </div>
        <div className="grid gap-4">
          <div className="grid sm:grid-rows-2 sm:w-[100%] md:grid-rows-1 md:grid-cols-2 my-4 gap-4 justify-self-center">
            <div className="bg-green-100 p-4 rounded flex-col flex">
              <span className="text-3xl md:text-3xl text-green-900">
                {(dagsats * 10).toLocaleString('nb-NO')}&nbsp;kr
              </span>
              <Label className="text-green-800">
                {' '}
                {formatMessage('result.per14', {
                  wbr: () => <>&nbsp;</>,
                  shy: () => <>&shy;</>,
                })}
              </Label>
            </div>
            <div className="bg-green-100 p-4 rounded flex-col flex">
              <span className="text-3xl md:text-3xl text-green-900">
                {Math.ceil(result == null ? 0 : resultat).toLocaleString('nb-NO')}
                &nbsp;kr
              </span>{' '}
              <Label className="text-green-800">
                {formatMessage('result.perAar', {
                  shy: () => <>&shy;</>,
                })}
              </Label>
            </div>
          </div>
          <div className="space-y-7">
            <BodyShort>{formatMessage('result.preDisclaimer')}</BodyShort>
            {result != null && (
              <div>
                <Heading size="medium" level="2" spacing>
                  {formatMessage('result.description')}
                </Heading>

                <ul className=" space-y-4 px-5 list-disc">
                  {result?.logs.map((text, index) => (
                    <li key={text.id}>
                      <div>
                        {formatMessage(text.id, {
                          ...text.values,
                          strong: (...chunks: any) => <strong>{chunks}</strong>,
                        })}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {state.harAAP && (
          <>
            <Alert variant="info">
              <div>
                <BodyShort>{state.harAAP && formatMessage('result.disclamerMedAAP')}</BodyShort>
              </div>
            </Alert>
            <Button
              className={'w-fit'}
              variant={'primary'}
              onClick={() => {
                window.location.href = 'https://www.nav.no/aap/mine-aap';
              }}
            >
              {formatMessage('result.buttonMedAAP')}
            </Button>
          </>
        )}
        {!state.harAAP && (
          <>
            <Alert variant="info">
              <div>
                <BodyShort>{formatMessage('result.disclamerUtenAAP')}</BodyShort>
              </div>
            </Alert>
            <Button
              className={'w-fit'}
              variant={'primary'}
              onClick={() => {
                window.location.href = 'https://www.nav.no/aap/soknad';
              }}
            >
              {formatMessage('result.buttonUtenAAP')}
            </Button>
          </>
        )}
        <Link href={'https://www.nav.no/aap'}>{formatMessage('result.link2')}</Link>
      </div>
    </>
  );
};

export default Resultat;
