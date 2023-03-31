import { Back } from '@navikt/ds-icons';
import { Link } from '@navikt/ds-react';
import NextLink from 'next/link';

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
  return (
    <NextLink passHref href={target} legacyBehavior>
      <Link className="mt-4 ">
        <Back aria-hidden /> {tekst ? tekst : 'Tilbake'}
      </Link>
    </NextLink>
  );
};

export default BackLink;
