import { Alert, Button, Heading, List, VStack } from '@navikt/ds-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import Divider from '../components/divider/Divider';
import { MagnifyingGlassIcon } from '../components/icons/MagnifyingGlassIcon';
import { StateInterface } from '../components/state/State';
import { useFeatureToggleIntl } from '../hooks/useFeatureToggleIntl';
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
    browserState.redirect = false;
    router.push('/steg/1');
  };
  return (
    <VStack gap="4">
      <VStack align="center" gap="4" paddingBlock="4">
        {browserState.redirect && <Alert variant="info">{formatMessage('start.refreshed')}</Alert>}
        <MagnifyingGlassIcon aria-hidden="true" />
        <Heading level="2" size="large">
          {formatMessage('start.title')}
        </Heading>
        <Divider isTitle={true} />
      </VStack>
      <VStack align="start" gap="4" paddingInline="4">
        <List>
          <List.Item>{formatMessage('start.firstPoint')}</List.Item>
          <List.Item>{formatMessage('start.secondPoint')}</List.Item>
          <List.Item>{formatMessage('start.thirdPoint')}</List.Item>
        </List>
        <Button onClick={handleStart} variant="primary">
          {formatMessage('navigation.start')}
        </Button>
      </VStack>
    </VStack>
  );
};

export default Home;
