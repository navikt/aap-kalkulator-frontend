'use client';

import { useTranslations } from 'next-intl';
import { GrunnbeloepHistorikk, grunnbeloep } from '../../lib/utils/types';
import { useEffect, useMemo, useState } from 'react';
import { useAppState } from '../state/StateContext';
import { ResultInterface } from '../result/Result';
import { useRouter } from '../../navigation';
import { logAmplitudeEvent } from '../../lib/utils/amplitude';
import { kalkuler } from '../../lib/logic/Kalkuler';
import Stepper from '../stepper/Stepper';
import BackLink from '../backlink/BackLink';
import { Circle } from '../circle/Circle';
import { CoinIcon } from '../icons/CoinIcon';
import { Alert, BodyShort, Button, Heading, Label, Link } from '@navikt/ds-react';

export const ResultatComponent = ({ G, Historikk }: { G: grunnbeloep; Historikk: GrunnbeloepHistorikk[] }) => {
  const t = useTranslations();
  const [result, setResult] = useState<ResultInterface | null>(null);
  const [state] = useAppState();
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
    const res = kalkuler(state, G, Historikk);
    setResult({
      resultat: res.resultat,
      personInfo: res.personInfo!!,
      logs: res.logs,
    });
  }, [state, G, Historikk, router]);

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
            {t('result.title')}
          </Heading>
        </div>
        <div className="grid gap-4">
          <div className="grid sm:grid-rows-2 sm:w-[100%] md:grid-rows-1 md:grid-cols-2 my-4 gap-4 justify-self-center">
            <div className="bg-green-100 p-4 rounded flex-col flex">
              <span className="text-3xl md:text-3xl text-green-900">
                {(dagsats * 10).toLocaleString('nb-NO')}&nbsp;kr
              </span>
              <Label className="text-green-800">
                {t.rich('result.per14', {
                  wbr: () => <wbr />,
                })}
              </Label>
            </div>
            <div className="bg-green-100 p-4 rounded flex-col flex">
              <span className="text-3xl md:text-3xl text-green-900">
                {Math.ceil(result == null ? 0 : resultat).toLocaleString('nb-NO')}
                &nbsp;kr
              </span>{' '}
              <Label className="text-green-800">{t('result.perAar')}</Label>
            </div>
          </div>
          <div className="space-y-7">
            <BodyShort>{t('result.preDisclaimer')}</BodyShort>
            {result != null && (
              <div>
                <Heading size="medium" level="2" spacing>
                  {t('result.description')}
                </Heading>

                <ul className=" space-y-4 px-5 list-disc">
                  {result?.logs.map((text) => (
                    <li key={text.id}>
                      <div>
                        {t.rich(text.id, {
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
                <BodyShort>{state.harAAP && t('result.disclamerMedAAP')}</BodyShort>
              </div>
            </Alert>
            <Button
              className={'w-fit'}
              variant={'primary'}
              onClick={() => {
                window.location.href = 'https://www.nav.no/aap/mine-aap';
              }}
            >
              {t('result.buttonMedAAP')}
            </Button>
          </>
        )}
        {!state.harAAP && (
          <>
            <Alert variant="info">
              <div>
                <BodyShort>{t('result.disclamerUtenAAP')}</BodyShort>
              </div>
            </Alert>
            <Button
              className={'w-fit'}
              variant={'primary'}
              onClick={() => {
                window.location.href = 'https://www.nav.no/aap/soknad';
              }}
            >
              {t('result.buttonUtenAAP')}
            </Button>
          </>
        )}
        <Link href={'https://www.nav.no/aap'}>{t('result.link2')}</Link>
      </div>
    </>
  );
};
