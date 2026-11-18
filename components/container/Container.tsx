import { Box } from '@navikt/ds-react';
import { ReactNode } from 'react';

import Banner from '../banner/Banner';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <Box minHeight="80vh" background="bg-subtle">
      <Banner />
      <Box paddingInline={{ xs: 'space-16', md: 'space-48' }}>
        <Box as="main" maxWidth="900px" marginInline="auto" paddingBlock="0 space-32">
          <Box maxWidth="600px">
            <Breadcrumbs />
            <Box
              background="surface-default"
              padding={{ xs: 'space-24', md: 'space-40' }}
              id="maincontent"
              tabIndex={-1}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Container;
