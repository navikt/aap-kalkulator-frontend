'use client';
import { Select } from '@navikt/ds-react';
import { useState } from 'react';

import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { HeartIcon } from '../icons/HeartIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';
import styles from './Helse.module.css';
import { useRouter } from '../../navigation';
import { useTranslations } from 'next-intl';
import { useAppState } from '../state/StateContext';

interface InntektsForm extends HTMLFormElement {
  readonly inntekt1: HTMLInputElement;
  readonly inntekt2: HTMLInputElement;
  readonly inntekt3: HTMLInputElement;
}

const Helse = () => {
  const router = useRouter();
  const [state, setState] = useAppState();
  const [error, setError] = useState('');
  const [radioError, setRadioError] = useState('');
  const t = useTranslations();
  const aapGrense = 11;
  let [aar, setAar] = useState(
    state.sykmeldtAar != undefined && !isNaN(state.sykmeldtAar) ? state.sykmeldtAar.toString() : '2023'
  );

  const onChange = (text: string) => {
    setAar(text);
    if (aar.match(/^[0-9]{4}$/)) {
      const parsed = parseInt(aar);
      setState({
        ...state,
        // @ts-ignore
        sykmeldtAar: isNaN(parsed) ? undefined : parsed,
      });
      if (!erFeil(parsed) && error != '') {
        setError('');
      }
    }
  };
  const erFeil = (sykmeldtAar: number) => {
    const detteAaret = new Date().getFullYear();
    return isNaN(sykmeldtAar) || sykmeldtAar > detteAaret || sykmeldtAar < detteAaret - aapGrense;
  };

  const handleSubmit = async (event: React.FormEvent<InntektsForm>) => {
    event.preventDefault();
    const detteAaret = new Date().getFullYear();
    const sykmeldtAar = parseInt(event.currentTarget.sykmelding.value);

    const errors = isNaN(sykmeldtAar)
      ? t('helse.nedsattArbeidsevne.validation.required')
      : sykmeldtAar > detteAaret
        ? t('helse.nedsattArbeidsevne.validation.max', {
            Aar: detteAaret.toString(),
          })
        : sykmeldtAar < detteAaret - aapGrense
          ? t('helse.nedsattArbeidsevne.validation.min', {
              Aar: aapGrense.toString(),
            })
          : '';

    if (state.over25 == undefined) {
      setRadioError(t('helse.over25.validation.required'));
    }

    setError(errors);

    if (erFeil(sykmeldtAar) || state.over25 == undefined || aar.match(/^([0-9]+)$/) == null) {
      return;
    }

    setState({
      ...state,
      sykmeldtAar,
    });

    router.push('/steg/2');
  };

  const handleChange = (val: string) => {
    setState({ ...state, over25: val == 'Ja' });
    setRadioError('');
  };

  return (
    <>
      <Stepper />
      <BackLink target="/" />
      <QuestionHeader image={<HeartIcon />} tittel={t('helse.title')} />
      <FormWrapper handleSubmit={handleSubmit}>
        <Radio
          error={radioError}
          title={t('helse.over25.title')}
          state={state.over25}
          onChange={(val: any) => handleChange(val)}
          readMoreTitle={t('helse.over25.readMoreTitle')}
          readMore={t('helse.over25.readMore')}
        />
        <div className="mb-4">
          <div>
            <Select
              className={styles.select}
              id="sykmelding"
              label={t('helse.nedsattArbeidsevne.title')}
              onChange={(event) => onChange(event.target.value)}
              defaultValue={aar}
            >
              {Array.from(Array(aapGrense).keys()).map((i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </Select>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default Helse;
