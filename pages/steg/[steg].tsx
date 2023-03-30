import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import Arbeid from '../../components/questions/Arbeid';
import Barn from '../../components/questions/Barn';
import Helse from '../../components/questions/Helse';
import Inntekt from '../../components/questions/Inntekt';
import { State } from '../_app';

const Steg = () => {
  const { state, setState } = useContext(State);
  const router = useRouter();
  const { steg } = router.query;
  const step = typeof steg === 'string' ? parseInt(steg) : 1;

  useEffect(() => {
    if (state.lengsteSteg <= step) {
      setState({
        ...state,
        lengsteSteg: step,
      });
    }
  }, [step]);

  const questions = [<Helse key={0} />, <Inntekt key={1} />, <Arbeid key={2} />, <Barn key={3} />];

  return questions[step - 1];
};

export default Steg;
