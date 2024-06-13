import Arbeid from '../../../../components/questions/Arbeid';
import Barn from '../../../../components/questions/Barn';
import Helse from '../../../../components/questions/Helse';
import Inntekt from '../../../../components/questions/Inntekt';
import { redirect } from '../../../../navigation';

const StegPage = ({ params }: { params: { steg: string } }) => {
  const { steg } = params;

  switch (steg) {
    case '1':
      return <Helse />;
    case '2':
      return <Inntekt />;
    case '3':
      return <Arbeid />;
    case '4':
      return <Barn />;
    default:
      redirect('/');
  }
};

export default StegPage;
