import { Button, VStack } from '@navikt/ds-react';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';

interface Props {
  handleSubmit: (event: React.FormEvent<any>) => void;
  children: React.ReactNode;
}
export const FormWrapper = ({ handleSubmit, children }: Props) => {
  const { formatMessage } = useFeatureToggleIntl();

  return (
    <VStack as="form" onSubmit={handleSubmit} gap="8" align="start">
      {children}

      <Button type="submit" variant="primary">
        {formatMessage('navigation.next')}
      </Button>
    </VStack>
  );
};
