import { Box, HStack } from '@navikt/ds-react';

export const Circle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box asChild width="88px" height="88px" borderRadius="full" background="surface-success-subtle">
      <HStack align="center" justify="center">
        {children}
      </HStack>
    </Box>
  );
};
