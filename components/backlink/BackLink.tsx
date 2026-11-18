import { Back } from '@navikt/ds-icons';
import { Box, Link } from '@navikt/ds-react';
import NextLink from 'next/link';

const BackLink = ({ target, tekst }: { target: string; tekst?: string }) => {
  return (
    <Box asChild marginBlock="4 0">
      <Link href={target} as={NextLink}>
        <Back aria-hidden /> {tekst ? tekst : 'Tilbake'}
      </Link>
    </Box>
  );
};

export default BackLink;
