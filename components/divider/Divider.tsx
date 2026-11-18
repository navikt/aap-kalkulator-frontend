import { Box } from '@navikt/ds-react';

const Divider = ({ isTitle }: { isTitle?: boolean }) => {
  return isTitle ? (
    <Box aria-hidden="true" borderWidth="2 0 0" borderColor="border-strong" width="4rem" />
  ) : (
    <Box aria-hidden="true" borderWidth="2 0 0" borderColor="border-strong" width={{ xs: '60%', md: '80%' }} />
  );
};
export default Divider;
