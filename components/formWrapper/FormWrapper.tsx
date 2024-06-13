import { Button } from '@navikt/ds-react';

import { useTranslations } from 'next-intl';

interface Props {
  handleSubmit: (event: React.FormEvent<any>) => void;
  children: React.ReactNode;
}
export const FormWrapper = ({ handleSubmit, children }: Props) => {
  const t = useTranslations();

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 justify-items-start">
      {children}

      <Button variant="primary">{t('navigation.next')}</Button>
    </form>
  );
};
