import { Select } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import { State } from '../../pages/_app';
import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { HeartIcon } from '../icons/HeartIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';
import styles from './Helse.module.css';

interface InntektsForm extends HTMLFormElement {
  readonly inntekt1: HTMLInputElement;
  readonly inntekt2: HTMLInputElement;
  readonly inntekt3: HTMLInputElement;
}

const Helse = () => {
  const router = useRouter();
  const { state, setState } = useContext(State);
  const [error, setError] = useState('');
  const [radioError, setRadioError] = useState('');
  const { formatMessage } = useFeatureToggleIntl();
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
      ? formatMessage('helse.nedsattArbeidsevne.validation.required')
      : sykmeldtAar > detteAaret
        ? formatMessage('helse.nedsattArbeidsevne.validation.max', {
            Aar: detteAaret.toString(),
          })
        : sykmeldtAar < detteAaret - aapGrense
          ? formatMessage('helse.nedsattArbeidsevne.validation.min', {
              Aar: aapGrense.toString(),
            })
          : '';

    if (state.over25 == undefined) {
      setRadioError(formatMessage('helse.over25.validation.required'));
    }

    setError(errors);

    if (erFeil(sykmeldtAar) || state.over25 == undefined || aar.match(/^([0-9]+)$/) == null) {
      return;
    }

    setState({
      ...state,
      sykmeldtAar,
    });

    await router.push('/steg/2');
  };

  const handleChange = (val: string) => {
    setState({ ...state, over25: val == 'Ja' });
    setRadioError('');
  };

  return (
    <>
      <Stepper />
      <BackLink target="/" />
      <QuestionHeader image={<HeartIcon />} tittel={formatMessage('helse.title')} />
      <FormWrapper handleSubmit={handleSubmit}>
        <Radio
          error={radioError}
          title={formatMessage('helse.over25.title')}
          state={state.over25}
          onChange={(val: any) => handleChange(val)}
          readMoreTitle={formatMessage('helse.over25.readMoreTitle')}
          readMore={formatMessage('helse.over25.readMore')}
        />
        <div className="mb-4">
          <div>
            <Select
              className={styles.select}
              id="sykmelding"
              label={formatMessage('helse.nedsattArbeidsevne.title')}
              onChange={(event) => onChange(event.target.value)}
              defaultValue={aar}
              autoComplete="off"
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
