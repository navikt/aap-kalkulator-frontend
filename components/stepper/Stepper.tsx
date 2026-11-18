import { Stepper as AkselStepper } from '@navikt/ds-react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';

const Stepper = () => {
  const router = useRouter();
  const path = router.asPath.split('/');
  const activeStep = path[path.length - 1] == 'resultat' ? 5 : parseInt(path[path.length - 1]);
  const { formatMessage } = useFeatureToggleIntl();
  const steps = [
    formatMessage('helse.title'),
    formatMessage('income.title'),
    formatMessage('work.title'),
    formatMessage('children.title'),
    formatMessage('result.stepTitle'),
  ];

  return (
    <nav aria-label="Steg i skjema">
      <AkselStepper activeStep={activeStep} orientation="horizontal">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < activeStep;

          if (isCompleted) {
            return (
              <AkselStepper.Step key={index} completed interactive as={NextLink} href={`/steg/${stepNumber}`}>
                {step}
              </AkselStepper.Step>
            );
          }

          return (
            <AkselStepper.Step key={index} completed={false} interactive={false}>
              {step}
            </AkselStepper.Step>
          );
        })}
      </AkselStepper>
    </nav>
  );
};

export default Stepper;
