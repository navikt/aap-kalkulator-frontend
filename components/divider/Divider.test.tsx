import { render, screen } from '@testing-library/react';
import React from 'react';

import Divider from './Divider';

describe('Divider component', () => {
  it('should render', () => {
    const divider = render(<Divider isTitle={true} />);
    expect(divider).toMatchSnapshot();
  });
});
