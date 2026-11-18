import { Alert, BodyShort, List, TextField, VStack } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';



import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import { BrowserState, State } from '../../pages/_app';
import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { WalletIcon } from '../icons/WalletIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';




















const Arbeid = () => {
  const router = useRouter();
  const { state, setState } = useContext(State);
  const [arbeidsTimerError, setArbeidsTimerError] = useState('');
  const [radioErrorArbeid, setRadioErrorArbeid] = useState('');
  const [radioErrorAAP, setRadioErrorAAP] = useState('');
  const [arbeidsTimer, setArbeidsTimer] = useState(
    state.arbeidstimer != undefined && !isNaN(state.arbeidstimer) ? state.arbeidstimer.toString() : ''
  );
  const { browserState } = useContext(BrowserState);
  const { formatMessage } = useFeatureToggleIntl();

  const onArbeidChange = (text: string) => {
    const parsed = parseFloat(text.replace(',', '.'));
    setArbeidsTimer(text);
    if (!isNaN(parsed)) {
      setState({
        ...state,
        arbeidstimer: parsed,
      });
    }
    if (!isNaN(parsed) || text == '') {
      setArbeidsTimerError('');
    }
    if (text.match(/^([0-9]+)([,.][0-9]*)?$/g) == null) {
      setArbeidsTimerError('Du må skrive et tall. Tallet kan inneholde desimaler.');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errors = [];

    let arbeidsgrad = 0;
    let arbeidsT = 0;

    arbeidsT = state.arbeidstimer == undefined ? NaN : parseFloat(arbeidsTimer.replace(',', '.'));
    arbeidsgrad = (arbeidsT / 37.5) * 100;

    if (state.harArbeid === undefined) {
      errors.push('Errors harArbeid');
      setRadioErrorArbeid(formatMessage('work.gotWork.validation.required'));
    }

    if (state.harAAP === undefined) {
      errors.push('Errors harAAP');
      setRadioErrorAAP(formatMessage('work.gotAAP.required'));
    }

    if ((state.arbeidstimer === undefined || state.arbeidstimer < 0) && state.harArbeid) {
      errors.push('Errors Arbeid timer');
      setArbeidsTimerError('Du må skrive et postitivt tall. Tallet kan inneholde desimaler.');
    }

    if (errors.length > 0) {
      return;
    }

    setState({
      ...state,
      arbeidsgrad,
    });
    await router.push('/steg/4');
  };

  const onRadioAAPChange = (value: string) => {
    setState({
      ...state,
      harAAP: value == 'Ja',
    });
    setRadioErrorAAP('');
  };

  const onRadioArbeidChange = (value: string) => {
    setState({
      ...state,
      harArbeid: value == 'Ja',
      arbeidstimer: value == 'Nei' ? undefined : state.arbeidstimer,
    });
    setRadioErrorArbeid('');
  };

  if (state.sykmeldtAar === undefined) {
    browserState.redirect = true;
    router.push('/');
    return <></>;
  }

  return (
    <>
      <Stepper />
      <BackLink target="/steg/2" />
      <QuestionHeader image={<WalletIcon />} tittel={'Arbeid'} />
      <FormWrapper handleSubmit={handleSubmit}>
        <VStack gap="4">
          <Radio
            error={radioErrorAAP}
            title={formatMessage('work.gotAAP.title')}
            state={state.harAAP}
            onChange={onRadioAAPChange}
            readMoreTitle={formatMessage('work.gotAAP.readMoreTitle')}
            readMore={
              <BodyShort size="small">
                {formatMessage('work.gotWork.readMore.start')}
                <List as="ul" size="small">
                  <List.Item>{formatMessage('work.gotWork.readMore.pointOne')}</List.Item>
                  <List.Item>{formatMessage('work.gotWork.readMore.pointTwo')}</List.Item>
                </List>
              </BodyShort>
            }
          />
          <Radio
            error={radioErrorArbeid}
            title={formatMessage('work.gotWork.title')}
            state={state.harArbeid}
            onChange={onRadioArbeidChange}
            readMoreTitle={formatMessage('work.gotWork.readMoreTitle')}
            readMore={formatMessage('work.gotAAP.readMore')}
          />

          {state.harArbeid && (
            <VStack gap="4">
              <TextField
                label={formatMessage('work.howManyHours.title')}
                description={formatMessage('work.howManyHours.description')}
                htmlSize={4}
                inputMode="numeric"
                error={arbeidsTimerError}
                value={arbeidsTimer}
                onChange={(event) => onArbeidChange(event.target.value)}
                autoComplete="off"
              />
              {(state?.arbeidstimer ?? 0) > 18.75 && !state?.harAAP && (
                <Alert variant={'warning'}>{formatMessage('work.howManyHours.warning.withoutAAP')}</Alert>
              )}
              {(state?.arbeidstimer ?? 0) > 22.5 && state?.harAAP && (
                <Alert variant={'warning'}>{formatMessage('work.howManyHours.warning.withAAP')}</Alert>
              )}
            </VStack>
          )}
        </VStack>
      </FormWrapper>
    </>
  );
};

export default Arbeid;
