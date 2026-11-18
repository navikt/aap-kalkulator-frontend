// noinspection JSNonASCIINames
import { Alert, BodyShort, Box, Button, HGrid, Heading, Link, List, VStack } from '@navikt/ds-react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useMemo, useState } from 'react';

import BackLink from '../components/backlink/BackLink';
import { Circle } from '../components/circle/Circle';
import { CoinIcon } from '../components/icons/CoinIcon';
import { Result, ResultInterface } from '../components/result/Result';
import Stepper from '../components/stepper/Stepper';
import { useFeatureToggleIntl } from '../hooks/useFeatureToggleIntl';
import { kalkuler } from '../lib/logic/Kalkuler';
import { GrunnbeloepHistorikk, grunnbeloep } from '../lib/utils/types';
import { State } from './_app';

export const getServerSideProps = async () => {
  const res = await fetch('https://g.nav.no/api/v1/grunnbeloep');
  const resHistorikk = await fetch('https://g.nav.no/api/v1/historikk/grunnbeløp');
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
  return { props: { G: data, Historikk: dataHistorikk } };
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

    const res: Result = kalkuler(state, G, Historikk);
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
      <VStack gap="8">
        <VStack align="center" paddingBlock="4" aria-hidden="true">
          <Circle>
            <CoinIcon />
          </Circle>
        </VStack>
        <Heading level="2" size="large">
          {formatMessage('result.title')}
        </Heading>
        <VStack gap="4">
          <HGrid columns={{ xs: 1, md: 2 }} gap="4">
            <Box background="surface-success-subtle" padding="4" borderRadius="small" margin="0">
              <Heading size="large">
                {(dagsats * 10).toLocaleString('nb-NO')}&nbsp;kr
              </Heading>
              <BodyShort>
                {formatMessage('result.per14', {
                  wbr: () => <>&nbsp;</>,
                  shy: () => <>&shy;</>,
                })}
              </BodyShort>
            </Box>
            <Box background="surface-success-subtle" padding="4" borderRadius="small" margin="0">
              <Heading size="large">
                {Math.ceil(result == null ? 0 : resultat).toLocaleString('nb-NO')}
                &nbsp;kr
              </Heading>
              <BodyShort>
                {formatMessage('result.perAar', {
                  shy: () => <>&shy;</>,
                })}
              </BodyShort>
            </Box>
          </HGrid>
          <VStack gap="7">
            <BodyShort>{formatMessage('result.preDisclaimer')}</BodyShort>
            {result != null && (
              <VStack gap="4">
                <Heading size="medium" level="2">
                  {formatMessage('result.description')}
                </Heading>

                <List>
                  {result?.logs.map((text) => (
                    <List.Item key={text.id}>
                      {formatMessage(text.id, {
                        ...text.values,
                        strong: (...chunks: any) => <strong>{chunks}</strong>,
                      })}
                    </List.Item>
                  ))}
                </List>
              </VStack>
            )}
          </VStack>
          {state.harAAP && (
            <VStack align="start" gap="4">
              <Alert variant="info">
                <BodyShort>{state.harAAP && formatMessage('result.disclamerMedAAP')}</BodyShort>
              </Alert>
              <Button as="a" href="https://www.nav.no/aap/mine-aap" variant="primary">
                {formatMessage('result.buttonMedAAP')}
              </Button>
            </VStack>
          )}
          {!state.harAAP && (
            <VStack align="start" gap="4">
              <Alert variant="info">
                <BodyShort>{formatMessage('result.disclamerUtenAAP')}</BodyShort>
              </Alert>
              <Button as="a" href="https://www.nav.no/aap/soknad" variant="primary">
                {formatMessage('result.buttonUtenAAP')}
              </Button>
            </VStack>
          )}
          <Link href={'https://www.nav.no/aap'}>{formatMessage('result.link2')}</Link>
        </VStack>
      </VStack>
    </>
  );
};

export default Resultat;
