import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import NextLink from 'next/link';

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
  return (
    <Link className="mt-4 " href={target} as={NextLink}>
      <Back aria-hidden /> {tekst ? tekst : 'Tilbake'}
    </Link>
  );
};

export default BackLink;
