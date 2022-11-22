import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('some tests in the NotFound component', () => {
  it('contains a h2 with this text: "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const headerNotFoundEl = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const imgNotFound = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(headerNotFoundEl).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
