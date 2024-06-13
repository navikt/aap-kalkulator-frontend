import { Radio as DSRadio, RadioGroup, ReadMore } from '@navikt/ds-react';
import React, { ReactNode } from 'react';

import { useTranslations } from 'next-intl';

const Radio = ({
  title,
  readMore,
  readMoreTitle,
  state,
  onChange,
  error,
}: {
  title: string;
  readMoreTitle?: string;
  readMore?: string | React.ReactElement;
  state?: boolean;
  onChange: (newState: string) => void;
  error: ReactNode;
}) => {
  const t = useTranslations();
  const description = (
    <ReadMore size="small" header={readMoreTitle}>
      {readMore}
    </ReadMore>
  );

  return (
    <RadioGroup
      legend={title}
      description={readMore !== undefined && description}
      onChange={onChange}
      value={state == undefined ? '' : state ? 'Ja' : 'Nei'}
      error={error}
    >
      <DSRadio value="Ja">{t('options.yes')}</DSRadio>
      <DSRadio value="Nei">{t('options.no')}</DSRadio>
    </RadioGroup>
  );
};

export default Radio;
