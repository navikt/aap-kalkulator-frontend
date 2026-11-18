import { Alert, Box } from '@navikt/ds-react';

const WarningBanner = (text: { text: string }) => {
  return (
    <Box paddingInline={{ xs: 'space-16', md: 'space-48' }}>
      <Box maxWidth="900px" marginInline="auto">
        <Box paddingBlock="space-12 space-0" maxWidth="600px">
          <Alert variant="info">{text.text}</Alert>
        </Box>
      </Box>
    </Box>
  );
};

export default WarningBanner;
