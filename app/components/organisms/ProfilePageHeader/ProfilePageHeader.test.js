import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePageHeader from '../ProfilePageHeader';

describe('User Profile Header', () => {
  test('should render the components', () => {
    render(<ProfilePageHeader />);

    const textElement = screen.getByText(/Name/i);
    expect(textElement).toBeInTheDocument();

    const textElement1 = screen.getByText(/Email/i);
    expect(textElement1).toBeInTheDocument();

  });
 
});
