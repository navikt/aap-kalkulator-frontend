import { Heading, VStack } from '@navikt/ds-react';
import React from 'react';

import { Circle } from '../circle/Circle';

const QuestionHeader = ({ image, tittel }: { image: React.ReactElement; tittel: string }) => {
  return (
    <>
      <VStack aria-hidden="true" align="center" paddingBlock="4 0" marginBlock="0 4">
        <Circle>{image}</Circle>
      </VStack>
      <Heading size="large" level="2" spacing>
        {tittel}
      </Heading>
    </>
  );
};

export default QuestionHeader;
