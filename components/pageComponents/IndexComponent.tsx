'use client';

import { useRouter } from '../../navigation';
import { logAmplitudeEvent } from '../../lib/utils/amplitude';
import { Button, Heading } from '@navikt/ds-react';
import { MagnifyingGlassIcon } from '../icons/MagnifyingGlassIcon';
import Divider from '../divider/Divider';
import { useTranslations } from 'next-intl';

export const IndexComponent = () => {
  const router = useRouter();

  const t = useTranslations();

  const handleStart = () => {
    logAmplitudeEvent('skjema startet', {
      skjemanavn: 'aap-kalkulator',
      skjemaId: 'aap-kalkulator',
    });
    router.push('/steg/1');
  };
  return (
    <>
      <div className="flex flex-col items-center pt-4">
        <MagnifyingGlassIcon />
        <Heading level="2" size="large" spacing>
          {t('start.title')}
        </Heading>
        <Divider isTitle={true} />
      </div>
      <div className="flex flex-col items-center mt-4 gap-4 pl-4">
        <ul className="list-disc space-y-2 mb-8 md:w-5/6">
          <li>{t('start.firstPoint')}</li>
          <li>{t('start.secondPoint')}</li>
          <li>{t('start.thirdPoint')}</li>
        </ul>
      </div>
      <Button onClick={() => handleStart()} className="w-20 ml-4" variant="primary" as={'button'}>
        {t('navigation.start')}
      </Button>
    </>
  );
};
