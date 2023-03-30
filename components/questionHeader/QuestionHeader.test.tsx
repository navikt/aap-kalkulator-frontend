import { render, screen } from '@testing-library/react';
import React from 'react';

import { TeddyIcon } from '../icons/TeddyIcon';
import QuestionHeader from './QuestionHeader';

describe('QuestionHeader component', () => {
  it('should render', () => {
    render(<QuestionHeader image={<TeddyIcon />} tittel={'QuestionHeader'} />);
    expect(screen.getByText('QuestionHeader')).toBeDefined();
  });
});
