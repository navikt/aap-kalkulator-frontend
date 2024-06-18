'use client';
import { Alert, TextField } from '@navikt/ds-react';
import { useState } from 'react';

import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { WalletIcon } from '../icons/WalletIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';
import styles from './Arbeid.module.css';
import { useRouter } from '../../navigation';
import { useTranslations } from 'next-intl';
import { useAppState } from '../state/StateContext';

const Arbeid = () => {
  const router = useRouter();
  const [state, setState] = useAppState();
  const [arbeidsTimerError, setArbeidsTimerError] = useState('');
  const [radioErrorArbeid, setRadioErrorArbeid] = useState('');
  const [radioErrorAAP, setRadioErrorAAP] = useState('');
  const [arbeidsTimer, setArbeidsTimer] = useState(
    state.arbeidstimer != undefined && !isNaN(state.arbeidstimer) ? state.arbeidstimer.toString() : ''
  );

  const t = useTranslations();

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
      setRadioErrorArbeid(t('work.gotWork.validation.required'));
    }

    if (state.harAAP === undefined) {
      errors.push('Errors harAAP');
      setRadioErrorAAP(t('work.gotAAP.required'));
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
    router.push('/');
  }

  return (
    <>
      <Stepper />
      <BackLink target="/steg/2" />
      <QuestionHeader image={<WalletIcon />} tittel={'Arbeid'} />
      <FormWrapper handleSubmit={handleSubmit}>
        <div className="flex flex-col">
          <Radio
            error={radioErrorAAP}
            title={t('work.gotAAP.title')}
            state={state.harAAP}
            onChange={onRadioAAPChange}
            readMoreTitle={t('work.gotAAP.readMoreTitle')}
            readMore={
              <div>
                {t('work.gotWork.readMore.start')}
                <div>
                  <ul className="list-disc ml-5">
                    <li>{t('work.gotWork.readMore.pointOne')}</li>
                    <li>{t('work.gotWork.readMore.pointTwo')}</li>
                  </ul>
                </div>
              </div>
            }
          />
        </div>
        <div className="flex flex-col">
          <Radio
            error={radioErrorArbeid}
            title={t('work.gotWork.title')}
            state={state.harArbeid}
            onChange={onRadioArbeidChange}
            readMoreTitle={t('work.gotWork.readMoreTitle')}
            readMore={t('work.gotAAP.readMore')}
          />
        </div>

        {state.harArbeid && (
          <div className="mb-4">
            <div className="flex flex-row items-center gap-2">
              <TextField
                label={t('work.howManyHours.title')}
                description={t('work.howManyHours.description')}
                className={styles.timer}
                inputMode="numeric"
                error={arbeidsTimerError}
                value={arbeidsTimer}
                onChange={(event) => onArbeidChange(event.target.value)}
              ></TextField>
            </div>
            {(state?.arbeidstimer ?? 0) > 18.75 && !state?.harAAP && (
              <Alert className="mt-4" variant={'warning'}>
                {t('work.howManyHours.warning.withoutAAP')}
              </Alert>
            )}
            {(state?.arbeidstimer ?? 0) > 22.5 && state?.harAAP && (
              <Alert className="mt-4" variant={'warning'}>
                {t('work.howManyHours.warning.withAAP')}
              </Alert>
            )}
          </div>
        )}
      </FormWrapper>
    </>
  );
};

export default Arbeid;
