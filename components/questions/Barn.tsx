import { BodyShort, Link, TextField } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';
import { BrowserState, State } from '../../pages/_app';
import BackLink from '../backlink/BackLink';
import { FormWrapper } from '../formWrapper/FormWrapper';
import { TeddyIcon } from '../icons/TeddyIcon';
import QuestionHeader from '../questionHeader/QuestionHeader';
import Radio from '../radio/Radio';
import Stepper from '../stepper/Stepper';
import styles from './Barn.module.css';

const Barn = () => {
  const router = useRouter();
  const { state, setState } = useContext(State);
  const [error, setError] = useState('');
  const [radioError, setRadioError] = useState<string | undefined>(undefined);
  const { browserState } = useContext(BrowserState);
  const { formatMessage } = useFeatureToggleIntl();
  const [antallBarn, setAntallBarn] = useState(
    state.antallBarn != undefined && !isNaN(state.antallBarn) ? state.antallBarn.toString() : ''
  );
  const onRadioChange = (value: string) => {
    setState({
      ...state,
      harBarn: value == 'Ja',
      antallBarn: value == 'Nei' ? undefined : state.antallBarn,
    });
    setRadioError(undefined);
  };

  const onChange = (text: string) => {
    setAntallBarn(text);
    if (text.match(/^([0-9]+)/) != null) {
      const parsed = parseInt(text);
      setError('');

      setState({
        ...state,
        antallBarn: isNaN(parsed) ? undefined : parsed,
      });
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (state.harBarn == undefined) {
      setRadioError('Du må velge enten ja eller nei for å gå videre.');
      return;
    }

    if (
      (state.antallBarn === undefined && state.harBarn) ||
      (state.antallBarn !== undefined && (isNaN(state.antallBarn) || state.antallBarn < 0)) ||
      (antallBarn.match(/^([0-9]+)$/) == null && state.harBarn)
    ) {
      setError('Antall barn må være et tall.');
      return;
    }

    await router.push('/resultat');
  };
  if (state.sykmeldtAar === undefined) {
    browserState.redirect = true;
    router.push('/');
    return <></>;
  }

  return (
    <>
      <Stepper />
      <BackLink target="/steg/3" />
      <QuestionHeader image={<TeddyIcon />} tittel={formatMessage('children.title')} />
      <FormWrapper handleSubmit={handleSubmit}>
        <Radio
          error={radioError}
          title={formatMessage('children.gotChildren.title')}
          readMoreTitle={formatMessage('children.gotChildren.readMoreTitle')}
          readMore={
            <>
              <BodyShort>
                {formatMessage('children.gotChildren.readMore')}
                <Link href="https://www.nav.no/aap#hvormye-forsorgerbarn" target="_blank" rel="noreferrer" as={'a'}>
                  {formatMessage('children.gotChildren.lesMer')}
                </Link>
              </BodyShort>
            </>
          }
          state={state.harBarn}
          onChange={onRadioChange}
        />
        {state.harBarn && (
          <div className="mb-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2">
                <TextField
                  inputMode="numeric"
                  className={styles.textfield}
                  id="antallBarn"
                  label={formatMessage('children.howMany.title')}
                  description={formatMessage('children.howMany.description')}
                  value={antallBarn}
                  onChange={(event) => onChange(event.target.value)}
                  error={error}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        )}
      </FormWrapper>
    </>
  );
};

export default Barn;
