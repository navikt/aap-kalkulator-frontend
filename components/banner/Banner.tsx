import { BodyShort, Box, Detail, HStack, Heading, VStack } from '@navikt/ds-react';
import { format, parse } from 'date-fns';
import { nb } from 'date-fns/locale';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import { CalculatorSquareIcon } from '../icons/CalculatorSquareIcon';

const Banner = () => {
  const dato = parse(process.env.NEXT_PUBLIC_LAST_UPDATED ?? '', 'MM-dd-yyyy', new Date());
  const { formatMessage } = useFeatureToggleIntl();
  return (
    <Box
      as="section"
      background="bg-default"
      borderColor="border-action"
      borderWidth="0 0 4 0"
      paddingBlock="space-24"
      paddingInline={{ xs: 'space-16', md: 'space-48' }}
      aria-labelledby="kalkulatorheading"
    >
      <HStack maxWidth="1128px" marginInline="auto" gap="space-32" align="start">
        <CalculatorSquareIcon aria-hidden="true" />
        <VStack gap="space-12" align="center">
          <Heading size="large" level="1" aria-label={formatMessage('banner.title')} id="kalkulatorheading">
            {formatMessage('banner.title')}
          </Heading>
          <HStack gap="space-16" align="baseline" justify="center">
            <BodyShort size="small" align="center">
              {formatMessage('banner.description')}
            </BodyShort>
            <Detail aria-hidden="true" textColor="subtle">
              |
            </Detail>
            <Detail textColor="subtle">
              {formatMessage('banner.updated')}{' '}
              <time dateTime={format(dato, 'yyyy-MM-dd')}>{format(dato, 'd. MMMM yyyy', { locale: nb })}</time>
            </Detail>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Banner;
