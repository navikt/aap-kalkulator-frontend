import { Button } from '@navikt/ds-react';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';

interface Props {
  handleSubmit: (event: React.FormEvent<any>) => void;
  children: React.ReactNode;
}
export const FormWrapper = ({ handleSubmit, children }: Props) => {
  const { formatMessage } = useFeatureToggleIntl();

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 justify-items-start">
      {children}

      <Button variant="primary">{formatMessage('navigation.next')}</Button>
    </form>
  );
};
