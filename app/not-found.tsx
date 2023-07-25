'use client';

import { Heading } from '@navikt/ds-react';

//404 Page
const notFound = () => {
  return (
    <Heading level="2" size="medium" spacing>
      Denne siden finnes ikke.
    </Heading>
  );
};

export default notFound;
