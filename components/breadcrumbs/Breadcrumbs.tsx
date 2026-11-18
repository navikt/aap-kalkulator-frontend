import { Next } from '@navikt/ds-icons';
import { BodyShort, HStack, Link } from '@navikt/ds-react';
import { useRef } from 'react';

import { useFeatureToggleIntl } from '../../hooks/useFeatureToggleIntl';

interface CrumbInterface {
  path: string;
  title: string;
  isClickable: boolean;
}

const Crumb = ({ path, title, isClickable }: CrumbInterface) => {
  if (!isClickable) {
    return (
      <HStack as="li" align="center" gap="space-4" aria-current="page">
        <Next aria-hidden="true" />
        <BodyShort as="span" size="small">
          {title}
        </BodyShort>
      </HStack>
    );
  }
  return (
    <HStack as="li" align="center">
      <BodyShort as="span" size="small">
        <Link href={path}>{title}</Link>
      </BodyShort>
    </HStack>
  );
};

const Breadcrumbs = () => {
  const breadcrumbRef = useRef<HTMLElement>(null);
  const { formatMessage } = useFeatureToggleIntl();

  return (
    <nav ref={breadcrumbRef} aria-label="Du er her: ">
      <HStack as="ol" gap="space-4" align="center" paddingInline="0" marginBlock="space-16" marginInline="space-8">
        <Crumb path="https://www.nav.no/aap" title={formatMessage('location')} isClickable={true} />
        <Crumb
          path="https://aap-kalkulator-frontend.dev.nav.no"
          title={formatMessage('banner.title')}
          isClickable={false}
        />
      </HStack>
    </nav>
  );
};

export default Breadcrumbs;
