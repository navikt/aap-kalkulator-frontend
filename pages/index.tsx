import { Alert, Button, Heading } from '@navikt/ds-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import Divider from '../components/divider/Divider';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { StateInterface } from '../components/state/State';
import { useFeatureToggleIntl } from '../hooks/useFeatureToggleIntl';
import { logAmplitudeEvent } from '../lib/utils/amplitude';
import { BrowserState, State } from './_app';

const Home: NextPage = () => {
  const router = useRouter();
  const { setState } = useContext(State);
  const { browserState } = useContext(BrowserState);

  useEffect(() => {
    setState({} as StateInterface);
  }, []);

  const { formatMessage } = useFeatureToggleIntl();
  const handleStart = () => {
    logAmplitudeEvent('skjema startet', {
      skjemanavn: 'aap-kalkulator',
      skjemaId: 'aap-kalkulator',
    });
    browserState.redirect = false;
    router.push('/steg/1');
  };
  return (
    <>
      <div className="flex flex-col items-center pt-4">
        {browserState.redirect && (
          <Alert variant="info" className="mb-8">
            {formatMessage('start.refreshed')}
          </Alert>
        )}
        <MagnifyingGlassIcon />
        <Heading level="2" size="large" spacing>
          {formatMessage('start.title')}
        </Heading>
        <Divider isTitle={true} />
      </div>
      <div className="flex flex-col items-center mt-4 gap-4 pl-4">
        <ul className="list-disc space-y-2 mb-8 md:w-5/6">
          <li>{formatMessage('start.firstPoint')}</li>
          <li>{formatMessage('start.secondPoint')}</li>
          <li>{formatMessage('start.thirdPoint')}</li>
        </ul>
      </div>
      <Button onClick={handleStart} className="w-20 ml-4" variant="primary" as={'button'}>
        {formatMessage('navigation.start')}
      </Button>
    </>
  );
};

export default Home;
