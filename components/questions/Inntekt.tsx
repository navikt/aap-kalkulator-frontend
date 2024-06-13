'use client';
import { BodyShort, Label, TextField } from '@navikt/ds-react';
import { ChangeEvent, useContext, useState } from 'react';

import { BrowserState } from '../../_pages/_app';
import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { CoinIcon } from '../icons/CoinIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';
import { useRouter } from '../../navigation';
import { useTranslations } from 'next-intl';
import { useAppState } from '../state/StateContext';

interface InntektInterface {
  inntekt1: string;
  inntekt2: string;
  inntekt3: string;
}

const Inntekt = () => {
  const router = useRouter();
  const t = useTranslations();
  const [state, setState] = useAppState();
  const [error, setError] = useState<string[]>(['', '', '']);
  const { browserState } = useContext(BrowserState);
  const [radioError, setRadioError] = useState<string>('');
  const [inntekt, setInntekt] = useState<InntektInterface>({
    inntekt1: state.inntekt1 != undefined && !isNaN(state.inntekt1) ? state.inntekt1.toLocaleString('nb-NO') : '',
    inntekt2: state.inntekt2 != undefined && !isNaN(state.inntekt2) ? state.inntekt2.toLocaleString('nb-NO') : '',
    inntekt3: state.inntekt3 != undefined && !isNaN(state.inntekt3) ? state.inntekt3.toLocaleString('nb-NO') : '',
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInntekt({
      ...inntekt,
      [event.target.name]: event.target.value,
    });
    if (event.target.value.match(/^([0-9\s]+)([,.][0-9]*)?$/g) != null) {
      const tekst = event.target.value.replace(/[.,\s]/g, '');
      const verdi = parseFloat(tekst);
      const index = parseInt(event.target.name[event.target.name.length - 1]) - 1;
      let newErrors = error;
      newErrors[index] = '';
      setError(newErrors);
      setInntekt({
        ...inntekt,
        [event.target.name]: !isNaN(verdi) ? verdi.toLocaleString('nb-NO') : event.target.value,
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const errorMessage = 'Fyll inn inntekt.';
    const inntekt1 = parseFloat(inntekt.inntekt1.replace(/\s/g, ''));
    const inntekt2 = parseFloat(inntekt.inntekt2.replace(/\s/g, ''));

    const inntekt3 = parseFloat(inntekt.inntekt3.replace(/\s/g, ''));
    const errors = [
      !isNaN(inntekt1) ? '' : errorMessage,
      !isNaN(inntekt2) ? '' : errorMessage,
      !isNaN(inntekt3) ? '' : errorMessage,
    ];
    setError(errors);
    if (state.harLoenn == undefined) {
      setRadioError(t('income.gotIncome.validation.required'));
    }
    if ((errors.some((v) => v.length > 0) && state.harLoenn == true) || state.harLoenn == undefined) {
      return;
    }

    setState({
      ...state,
      inntekt1,
      inntekt2,
      inntekt3,
    });

    await router.push('/steg/3');
  };

  if (state.sykmeldtAar === undefined) {
    browserState.redirect = true;
    router.push('/');
    return <></>;
  }

  const inntektsAar = [state.sykmeldtAar - 1, state.sykmeldtAar - 2, state.sykmeldtAar - 3];

  const idKorreksjon = (index: number) => {
    return 3 - index;
  };
  const indexKorreksjon = (index: number) => {
    return 2 - index;
  };

  const onRadioChange = (value: string) => {
    setState({
      ...state,
      harLoenn: value == 'Ja',
      inntekt1: state.inntekt1 !== undefined && !isNaN(state.inntekt1) ? state.inntekt1.toLocaleString('nb-NO') : '',
      inntekt2: state.inntekt2 !== undefined && !isNaN(state.inntekt2) ? state.inntekt2.toLocaleString('nb-NO') : '',
      inntekt3: state.inntekt3 !== undefined && !isNaN(state.inntekt3) ? state.inntekt3.toLocaleString('nb-NO') : '',
    });
    setError(['', '', '']);
    setRadioError('');
  };

  const readMoreText = (
    <div>
      <BodyShort spacing>{t('income.gotIncome.readMore1')}</BodyShort>
    </div>
  );
  return (
    <>
      <Stepper />
      <BackLink target="/steg/1" />
      <QuestionHeader image={<CoinIcon />} tittel={t('income.title')} />
      <FormWrapper handleSubmit={handleSubmit}>
        <Radio
          error={radioError}
          title={t('income.gotIncome.title', {
            inntektsAar2: inntektsAar[2].toString(),
            inntektsAar0: inntektsAar[0].toString(),
          })}
          state={state.harLoenn}
          onChange={onRadioChange}
          readMoreTitle={t('income.gotIncome.readMoreTitle')}
          readMore={readMoreText}
        />

        {state.harLoenn && (
          <fieldset>
            <Label>{t('income.howMuch.title')}</Label>
            <BodyShort spacing>{t('income.howMuch.description')}</BodyShort>
            <div className="flex md:flex-row flex-col gap-4">
              {inntektsAar.reverse().map((aar, index) => (
                <div key={index} className="flex flex-col">
                  <TextField
                    inputMode="numeric"
                    className={`max-w-[160px]`}
                    key={index}
                    id={`inntekt${idKorreksjon(index)}`}
                    name={`inntekt${idKorreksjon(index)}`}
                    label={`Inntekt ${aar}`}
                    size="medium"
                    error={error[indexKorreksjon(index)]}
                    value={Object.values(inntekt)[indexKorreksjon(index)]}
                    onChange={onChange}
                  />
                </div>
              ))}
            </div>
          </fieldset>
        )}
      </FormWrapper>
    </>
  );
};

export default Inntekt;
