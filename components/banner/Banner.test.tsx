import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';

import { messages } from '../../utils/message';
import Banner from './Banner';

describe('Banner', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_LAST_UPDATED = '11-07-2024';
  });
  it('oppdatert dato vises som forventet', () => {
    render(
      <IntlProvider locale={'nb'} messages={messages['nb']}>
        <Banner />
      </IntlProvider>
    );
    const datoString = screen.getByText('7. november 2024', { selector: 'time' });
    expect(datoString.getAttribute('datetime')).toBe('2024-11-07');
    expect(datoString.parentElement?.textContent).toBe('Oppdatert 7. november 2024');
  });
});
