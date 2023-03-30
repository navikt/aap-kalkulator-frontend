import { Heading } from '@navikt/ds-react';
import React from 'react';

import { Circle } from '../circle/Circle';

const QuestionHeader = ({ image, tittel }: { image: React.ReactElement; tittel: string }) => {
  return (
    <>
      <div aria-hidden="true" className="flex flex-col items-center pt-4 mb-4">
        <Circle>{image}</Circle>
      </div>
      <Heading size="large" level="2" spacing>
        {tittel}
      </Heading>
    </>
  );
};

export default QuestionHeader;
